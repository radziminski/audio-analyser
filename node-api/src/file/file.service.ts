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

  create() {
    // return this.fileRepository.create({
    //   url: createFileDto.url,
    //   length: createFileDto.length,
    //   size: createFileDto.size,
    // });
  }

  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
