/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ASSETS_BASE_URL_CONFIG_VAR,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} from './../constants';
import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { Repository } from 'typeorm/repository/Repository';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { UpdateFileDto } from './dto/update-file.dto';
import { v4 as uuidv4 } from 'uuid';

import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

console.log({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});
const s3 = new AWS.S3();

@Injectable()
export class FileService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  findAll() {
    return this.fileRepository.find();
  }

  findOne(id: number) {
    return this.fileRepository.findOne(id);
  }

  async saveFileData(file: Express.Multer.File): Promise<File> {
    const fileData = {
      url: `${this.configService.get<string>(ASSETS_BASE_URL_CONFIG_VAR)}/${
        file.filename
      }`,
      name: file.originalname,
      size: file.size,
      encoding: file.encoding,
      mimeType: file.mimetype,
    };

    return this.fileRepository.save({
      ...fileData,
      createdAt: new Date().toISOString(),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }

  static getMulterFilename(
    req,
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

  static multerFileStorage = diskStorage({
    destination: function (_, __, cb) {
      cb(null, 'files/audio');
    },
  });

  static multerS3Storage = multerS3({
    s3: s3,
    bucket: 'audio-analyser-radziminski',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    // eslint-disable-next-line @typescript-eslint/unbound-method
    key: FileService.getMulterFilename,
  });

  static audioFileInterceptorOptions = {
    // storage: diskStorage({
    //   destination: function (_, __, cb) {
    //     cb(null, 'files/audio');
    //   },
    //   // eslint-disable-next-line @typescript-eslint/unbound-method
    //   filename: FileService.getMulterFilename,
    // }),
    storage: FileService.multerS3Storage,
  };
}
