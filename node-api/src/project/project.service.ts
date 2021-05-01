import { UserService } from './../user/user.service';
import { Repository } from 'typeorm/repository/Repository';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectUser } from './entities/project-user.entity';
import { ProjectFile } from './entities/project-file.entity';

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
      .where('user.email = :email', { email })
      .getMany();

    return allProjects;
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

  async addProjectUser(projectId: number, userEmail: string) {
    const user = await this.userService.findOne(userEmail);

    if (!user)
      throw new BadRequestException({
        message: 'User with such email does not exist.',
      });

    const project = await this.findOne(projectId);

    return this.projectUserRepository.save(project, {});
  }

  // deleteProjectUser(projectUser: { project: number; user: number }) {
  //   return this.projectUserRepository.delete(projectUser);
  // }

  // deleteAllProjectUsers(project: number) {
  //   return this.projectUserRepository.delete({ project });
  // }

  findAllProjectUsers() {
    return this.projectUserRepository.find({
      relations: ['project', 'user'],
    });
  }

  /// PROJECT FILES

  // addProjectFile(projectFile: { file: number; project: number }) {
  //   return this.projectFileRepository.save(projectFile);
  // }

  // deleteProjectFile(projectFile: { file: number; project: number }) {
  //   return this.projectFileRepository.delete(projectFile);
  // }

  // deleteAllProjectFiles(project: number) {
  //   return this.projectFileRepository.delete({ project });
  // }
}
