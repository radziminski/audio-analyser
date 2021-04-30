import { Repository } from 'typeorm/repository/Repository';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectUser } from './entities/project-user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(ProjectUser)
    private projectUserRepository: Repository<ProjectUser>,
  ) {}

  async create(project: {
    description: string;
    ownerId: number;
    title: string;
  }) {
    const createdProject = await this.projectRepository.save({
      title: project.title,
      description: project.description,
      createdAt: new Date().toISOString(),
      editedAt: new Date().toISOString(),
    });

    const projectUser = await this.projectUserRepository.save({
      userProfileId: project.ownerId,
      projectId: createdProject.id,
    });

    return {
      project: createdProject,
      owner: projectUser,
    };
  }

  findAll() {
    return this.projectRepository.find({
      relations: ['users', 'files'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
