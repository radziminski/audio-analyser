import { Repository } from 'typeorm/repository/Repository';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async saveFileData(data: {
    encoding?: string;
    length?: number;
    mimeType?: string;
    name: string;
    size?: number;
    url: string;
  }): Promise<File> {
    return this.fileRepository.create(data);
  }

  findAll() {
    return this.fileRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
