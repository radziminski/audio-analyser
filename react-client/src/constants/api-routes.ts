export const API_ROUTES = {
  ROOT: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  CHANGE_PASSWORD: '/auth/change-password',
  USER: '/user',
  USER_ALL: '/user/all',
  USER_SINGLE: '/user/:id',
  PROJECT: '/project',
  PROJECT_ALL: '/project/all',
  PROJECT_SINGLE: '/project/:id',
  PROJECT_USER: '/project/:id/user',
  PROJECT_USER_SINGLE: '/project/:id/user/:userId',
  PROJECT_FILE: '/project/:id/file',
  PROJECT_FILE_SINGLE: '/project/:id/files/:fileId',
  PROJECT_UPLOAD_FILE: '/project/:id/files/upload'
};
