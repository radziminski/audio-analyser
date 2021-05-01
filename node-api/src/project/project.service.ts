import { FileService } from './../file/file.service';
import { UserService } from './../user/user.service';
import { Repository } from 'typeorm/repository/Repository';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectUser } from './entities/project-user.entity';
import { ProjectFile } from './entities/project-file.entity';
import { File } from '../file/entities/file.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectUser)
    private readonly projectUserRepository: Repository<ProjectUser>,
    @InjectRepository(ProjectFile)
    private readonly projectFileRepository: Repository<ProjectFile>,
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  /// PROJECTS

  async create(project: {
    description: string;
    ownerEmail: string;
    title: string;
  }) {
    const owner = await this.userService.findOne(project.ownerEmail);

    const createdProject = await this.projectRepository.save({
      title: project.title,
      description: project.description,
      createdAt: new Date().toISOString(),
      editedAt: new Date().toISOString(),
      users: [{ user: owner }],
    });

    return {
      project: createdProject,
    };
  }

  findAll() {
    return this.projectRepository.find({
      relations: ['users', 'files', 'users.user', 'files.file'],
    });
  }

  async findAllForUser(email: string) {
    const allProjects = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.users', 'projectUser')
      .leftJoinAndSelect('projectUser.user', 'user')
      .leftJoinAndSelect('project.files', 'file')
      .getMany();

    return allProjects.filter((project) =>
      project.users.find((user) => user.user.email === email),
    );
  }

  findOne(id: number) {
    return this.projectRepository.findOne(id, {
      relations: ['users', 'files'],
    });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(id, { ...updateProjectDto });
  }

  remove(id: number) {
    return this.projectRepository.delete(id);
  }

  /// PROJECT USERS

  async addProjectUser(
    projectId: number,
    currUserEmail: string,
    newUserEmail: string,
  ) {
    const user = await this.userService.findOne(newUserEmail);

    if (!user)
      throw new BadRequestException({
        message: 'User with such email does not exist.',
      });

    const project = await this.findOne(projectId);

    const newProjectUser = new ProjectUser();
    newProjectUser.user = user;

    return this.projectRepository.save({
      ...project,
      users: [...project.users, newProjectUser],
    });
  }

  deleteProjectUser(projectId: number, userEmail: string) {
    // TODO
    return this.projectUserRepository.delete({});
  }

  // deleteAllProjectUsers(project: number) {
  //   return this.projectUserRepository.delete({ project });
  // }

  findAllProjectUsers() {
    return this.projectUserRepository.find({
      relations: ['project', 'user'],
    });
  }

  /// PROJECT FILES

  async addProjectFile(projectId: number, file: File) {
    if (!file)
      throw new BadRequestException({
        message: 'Such File does not exist',
      });

    const project = await this.findOne(projectId);

    const newProjectFile = new ProjectFile();
    newProjectFile.file = file;

    return this.projectRepository.save({
      ...project,
      files: [...project.files, newProjectFile],
    });
  }

  async saveFileData(file: Express.Multer.File) {
    return this.fileService.saveFileData(file);
  }

  // deleteProjectFile(projectFile: { file: number; project: number }) {
  //   return this.projectFileRepository.delete(projectFile);
  // }

  // deleteAllProjectFiles(project: number) {
  //   return this.projectFileRepository.delete({ project });
  // }
}
