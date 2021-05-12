import { IUIState } from './types';
import { action } from 'easy-peasy';

const uiState: IUIState = {
  openedModal: null,
  modalArgs: {},

  openModal: action((state, payload) => {
    const { modal, args } = payload;

    state.openedModal = modal;
    state.modalArgs = args || {};
  }),

  closeModal: action((state) => {
    state.openedModal = null;
    state.modalArgs = {};
  }),

  modifyModalArgs: action((state, payload) => {
    const args = payload;

    state.modalArgs = { ...(state.modalArgs ?? {}), ...args };
  })
};

export default uiState;
