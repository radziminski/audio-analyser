import { supportedMimes } from './../constants';
import { RequestWithUser } from './../auth/strategies/local.strategy';

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { FileService } from './file.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('audio', {
      storage: diskStorage({
        destination: function (_, __, cb) {
          cb(null, 'files/audio');
        },
        filename: function (_, file, cb) {
          const id = uuidv4();

          if (file.mimetype === 'audio/mpeg') return cb(null, id + '.mp3');
          if (file.mimetype === 'audio/wave') return cb(null, id + '.wav');

          cb(
            new BadRequestException({
              message: 'File format not supported.',
            }),
            null,
          );
        },
      }),
    }),
  )
  async uploadFile(
    @Request() req: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException({
        message: 'You need to provide a valid file.',
      });
    }

    const fileData = {
      url: `${file.destination}/${file.filename}`,
      name: file.originalname,
      size: file.size,
      encoding: file.encoding,
      mimeType: file.mimetype,
    };

    const savedFileData = await this.fileService.saveFileData(fileData);

    return {
      ...savedFileData,
      // TODO: Append app url here
      url: savedFileData.url,
    };
  }
}
