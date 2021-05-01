import { FileService } from './../file/file.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestWithUser } from './../auth/types/index';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddProjectUserDto } from './dto/add-project-user.dto';
import { AddProjectFileDto } from './dto/add-project-file.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  /// PROJECTS

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.create({
      ...createProjectDto,
      ownerEmail: req.user.email,
    });
  }

  @Get('all')
  findAll() {
    return this.projectService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllForUser(@Req() req: RequestWithUser) {
    return this.projectService.findAllForUser(req.user.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }

  /// PROJECT USERS

  @Get('users')
  findAllProjectUsers() {
    return this.projectService.findAllProjectUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Post('users/:id')
  addProjectUser(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() addProjectUserDto: AddProjectUserDto,
  ) {
    return this.projectService.addProjectUser(
      +id,
      req.user.email,
      addProjectUserDto.email,
    );
  }

  /// PROJECT FILES

  @UseGuards(JwtAuthGuard)
  @Post('files/upload')
  @UseInterceptors(
    FileInterceptor('audio', {
      storage: diskStorage({
        destination: function (_, __, cb) {
          cb(null, 'files/audio');
        },
        // eslint-disable-next-line @typescript-eslint/unbound-method
        filename: FileService.saveFile,
      }),
    }),
  )
  async uploadFile(
    @Req() req: RequestWithUser,
    @Body() addProjectFileDto: AddProjectFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException({
        message: 'You need to provide a valid file.',
      });
    }

    const savedFileData = await this.projectService.saveFileData(file);

    return this.projectService.addProjectFile(
      addProjectFileDto.projectId,
      savedFileData,
    );
  }
}
