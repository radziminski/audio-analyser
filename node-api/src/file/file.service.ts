import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME,
  MAX_FILE_SIZE,
  MAX_TOTAL_FILES_SIZE,
} from './../constants';
import { Repository } from 'typeorm/repository/Repository';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  BadRequestException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateFileDto } from './dto/update-file.dto';
import { v4 as uuidv4 } from 'uuid';

import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { getRepository } from 'typeorm';

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  findAll() {
    return this.fileRepository.find();
  }

  findOne(id: number) {
    return this.fileRepository.findOne(id);
  }

  async saveFileData(file: Express.MulterS3.File): Promise<File> {
    const fileData = {
      url: file.location,
      key: file.key,
      acl: file.acl,
      originalName: file.originalname,
      name: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
    };

    const savedFile = await this.fileRepository.save({
      ...fileData,
      createdAt: new Date().toISOString(),
    });

    const totalFileSize = await this.getTotalFilesSize();

    if (totalFileSize > MAX_TOTAL_FILES_SIZE) {
      await this.remove(savedFile.id);
      throw new ServiceUnavailableException({
        message: 'Server storage is fully used.',
      });
    }

    return savedFile;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  async remove(id: number) {
    const file = await this.findOne(id);

    if (!file)
      throw new BadRequestException({ message: 'Given file does not exist.' });

    // TODO: error handling?
    if (file.key)
      s3.deleteObject(
        { Bucket: 'audio-analyser-radziminski', Key: file.key },
        (err) => {
          if (err) console.log(err);
        },
      );

    await this.fileRepository.delete(file);

    return;
  }

  async getTotalFilesSize() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const totalSize = +(
        await getRepository(File)
          .createQueryBuilder('file')
          .select('SUM(file.size)', 'total_size')
          .getRawOne()
      )['total_size'];
      return totalSize;
    } catch (e) {
      throw new ServiceUnavailableException();
    }
  }

  static getMulterFilename(
    _: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error, filename: string) => void,
  ) {
    const id = uuidv4();

    if (file.mimetype === 'audio/mpeg') return cb(null, id + '.mp3');
    if (file.mimetype === 'audio/wave') return cb(null, id + '.wav');

    cb(
      new BadRequestException({
        message: 'File format not supported.',
      }),
      null,
    );
  }

  static multerS3Storage = multerS3({
    s3: s3,
    bucket: AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (_, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    // eslint-disable-next-line @typescript-eslint/unbound-method
    key: FileService.getMulterFilename,
  });

  static audioFileInterceptorOptions: MulterOptions = {
    limits: {
      files: 1,
      fileSize: MAX_FILE_SIZE,
    },
    storage: FileService.multerS3Storage,
  };
}
