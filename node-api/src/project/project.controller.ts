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
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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

  /// PROJECT FILES
}
