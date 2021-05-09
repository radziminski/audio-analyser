import { useStoreActions, useStoreState } from 'global-state/hooks';
import React from 'react';
import ConfirmActionModal from './ConfirmActionModal';
import CreateProjectModal from './CreateProjectModal';
import { ModalType } from './types';

export const ModalsContainer: React.FC = () => {
  const { openedModal, modalArgs } = useStoreState((state) => state.ui);
  const { closeModal } = useStoreActions((state) => state.ui);

  const getCurrModal = () => {
    switch (openedModal) {
      case ModalType.createProject:
        return <CreateProjectModal onClose={() => closeModal()} />;
      case ModalType.confirmAction:
        return (
          <ConfirmActionModal
            title={modalArgs.title ?? 'Are you sure?'}
            isActionLoading={modalArgs.isActionLoading}
            message={modalArgs.message}
            onDismiss={() => closeModal()}
            onConfirm={() => modalArgs.onConfirm && modalArgs.onConfirm()}
          />
        );
      default:
        return null;
    }
  };

  if (openedModal === null) return null;

  return getCurrModal();
};

export default ModalsContainer;
