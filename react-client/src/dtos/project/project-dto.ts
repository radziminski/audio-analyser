import { ProjectUserDto } from './project-user-dto';
import { ProjectFileDto } from './project-file-dto';

export interface ProjectDto {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  editedAt: string;
}

export interface ProjectWithUsersAndFilesDto extends ProjectDto {
  users: ProjectUserDto[];
  files: ProjectFileDto[];
}

// "id": 3,
// "title": "Brand New",
// "description": "Description",
// "createdAt": "2021-05-03T20:30:55.079Z",
// "editedAt": null,
// "users": [
//     {
//         "id": 3,
//         "userId": 2,
//         "projectId": 3,
//         "user": {
//             "id": 2,
//             "email": "janek2@test.com",
//             "roles": [
//                 "user"
//             ]
//         }
//     }
// ],
// "files": []
