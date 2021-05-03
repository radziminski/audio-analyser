export interface FileDto {
  id: number;
  url: string;
  key: string;
  acl: string;
  name: string;
  originalName: string | null;
  createdAt: string | null;
  length: number | null;
  size: number;
  mimeType: string;
}
