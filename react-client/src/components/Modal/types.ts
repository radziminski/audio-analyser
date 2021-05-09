export enum ModalType {
  createProject,
  confirmAction
}

export interface IModalArgs {
  title?: string;
  message?: string;
  isActionLoading?: boolean;

  onConfirm?: () => void;
  onDismiss?: () => void;
}
