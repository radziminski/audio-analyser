import { FileService } from './../file/file.service';
import { UserService } from './../user/user.service';
import { Repository } from 'typeorm/repository/Repository';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectUser } from './entities/project-user.entity';
import { ProjectFile } from './entities/project-file.entity';
import { File } from '../file/entities/file.entity';
import { isNumber } from 'lodash';

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

  //////////////////////////////////////
  ////////////// PROJECTS //////////////
  //////////////////////////////////////

  findAll() {
    return this.projectRepository.find({
      relations: ['users', 'files', 'users.user', 'files.file'],
    });
  }

  async findAllForUser(email: string) {
    const allProjects = await this.findAll();

    return allProjects.filter((project) =>
      this.checkIfProjectUser(project, email),
    );
  }

  findOne(id: number) {
    return this.projectRepository.findOne(id, {
      relations: ['users', 'files', 'users.user', 'files.file'],
    });
  }

  async findOneIfProjectUser(id: number, email: string) {
    const project = await this.findOne(id);

    if (!project)
      throw new BadRequestException({ message: 'Project does not exist.' });

    if (!this.checkIfProjectUser(project, email))
      throw new UnauthorizedException({
        message: "You don't have rights to this project",
      });

    return project;
  }

  async create(project: { description: string; title: string }) {
    const createdProject = await this.projectRepository.save({
      title: project.title,
      description: project.description,
      createdAt: new Date().toISOString(),
    });

    return {
      project: createdProject,
    };
  }

  async createWithProjectUser(project: {
    description: string;
    email: string;
    title: string;
  }) {
    const user = await this.userService.findOneByEmail(project.email);

    const createdProject = await this.projectRepository.save({
      title: project.title,
      description: project.description,
      createdAt: new Date().toISOString(),
      users: [{ user }],
    });

    return {
      project: createdProject,
    };
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(id, {
      ...updateProjectDto,
      editedAt: new Date().toISOString(),
    });
  }

  async remove(id: number) {
    const project = await this.findOne(id);

    for (const file of project.files) {
      await this.deleteProjectFile(id, file?.file?.id);
    }

    return this.projectRepository.delete(id);
  }

  checkIfProjectUser(project: Project, email: string) {
    return !!project.users.find((user) => user?.user?.email === email);
  }

  //////////////////////////////////////
  /////////// PROJECT USERS ////////////
  //////////////////////////////////////

  async addProjectUser(id: number, newUserEmail: string) {
    const project = await this.findOne(id);
    const user = await this.userService.findOneByEmail(newUserEmail);

    if (!user)
      throw new BadRequestException({
        message: 'User with such email does not exist.',
      });

    if (project.users.find((projectUser) => projectUser.userId === user.id))
      throw new BadRequestException({
        message: 'User is already in the project.',
      });

    const newProjectUser = new ProjectUser();
    newProjectUser.user = user;

    return this.projectRepository.save({
      ...project,
      users: [...project.users, newProjectUser],
    });
  }

  async deleteProjectUser(
    id: number,
    currUserEmail: string,
    toBeRemovedUserId: number,
  ) {
    const project = await this.findOne(id);

    const user = await this.userService.findOneByEmail(currUserEmail);

    if (project.users.length < 2 && user.id === toBeRemovedUserId)
      throw new BadRequestException({
        message: "You can't leave since you are the only user in this project.",
      });

    return this.projectUserRepository.delete({
      projectId: id,
      userId: toBeRemovedUserId,
    });
  }

  findAllProjectUsers() {
    return this.projectUserRepository.find();
  }

  //////////////////////////////////////
  /////////// PROJECT FILES ////////////
  //////////////////////////////////////

  async addProjectFile(id: number, file: File | number) {
    if (!file)
      throw new BadRequestException({
        message: 'Such File does not exist',
      });

    const project = await this.findOne(id);

    const newProjectFile = new ProjectFile();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (isNumber(file)) {
      const savedFile = await this.fileService.findOne(file);

      if (!savedFile)
        throw new BadRequestException({
          message: 'File with given id does not exist',
        });

      if (project.files.find((projectFile) => projectFile.fileId === file))
        throw new BadRequestException({
          message: 'File is already in the project.',
        });

      newProjectFile.file = savedFile;
    } else {
      newProjectFile.file = file;
    }

    return this.projectRepository.save({
      ...project,
      files: [...project.files, newProjectFile],
    });
  }

  async deleteProjectFile(id: number, fileId: number) {
    if (!(await this.checkIfFileExistsInOtherProjects(fileId, id))) {
      await this.fileService.remove(fileId);
    }

    await this.projectFileRepository.delete({ projectId: id, fileId });
  }

  async saveFileData(file: Express.MulterS3.File) {
    return this.fileService.saveFileData(file);
  }

  findAllProjectFiles() {
    return this.projectFileRepository.find();
  }

  async checkIfFileExistsInOtherProjects(fileId: number, projectId: number) {
    const projects = await this.findAll();

    return !!projects.find(
      (project) =>
        !!project.files.find((projectFile) => projectFile.fileId === fileId) &&
        project.id !== projectId,
    );
  }
}
