import { Repository } from 'typeorm/repository/Repository';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { UpdateFileDto } from './dto/update-file.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async saveFileData(file: Express.Multer.File): Promise<File> {
    const fileData = {
      url: `${file.destination}/${file.filename}`,
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

  findAll() {
    return this.fileRepository.find();
  }

  findOne(id: number) {
    return this.fileRepository.findOne(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }

  static saveFile(
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
}
