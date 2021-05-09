export enum ModalType {
  createProject,
  confirmAction,
  addNewFile
}

export interface IModalArgs {
  title?: string;
  message?: string;
  isActionLoading?: boolean;
  customArg?: string | number;

  onConfirm?: () => void;
  onDismiss?: () => void;
}
