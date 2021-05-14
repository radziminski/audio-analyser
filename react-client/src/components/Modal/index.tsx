import { useStoreActions, useStoreState } from '~/global-state/hooks';
import React from 'react';
import AddFileModal from './AddFileModal';
import ConfirmActionModal from './ConfirmActionModal';
import CreateProjectModal from './CreateProjectModal';
import { ModalType } from './types';

export const ModalsContainer: React.FC = () => {
  const { openedModal, modalArgs } = useStoreState((state) => state.ui);
  const { closeModal } = useStoreActions((state) => state.ui);

  const getCurrModal = () => {
    if (!openedModal && openedModal !== 0) return null;

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
            error={modalArgs.error}
          />
        );
      case ModalType.addNewFile:
        return (
          <AddFileModal
            projectId={+(modalArgs.customArg ?? -1)}
            onClose={() => closeModal()}
          />
        );
      default:
        // eslint-disable-next-line no-throw-literal
        throw 'No such modal!';
    }
  };

  if (openedModal === null) return null;

  return getCurrModal();
};

export default ModalsContainer;
