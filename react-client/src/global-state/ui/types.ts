import { ModalType, IModalArgs } from '~/components/Modal/types';
import { Action, Thunk } from 'easy-peasy';

export type UIAction<Payload = void> = Action<IUIState, Payload>;

export type UIThunk<Payload = void, Result = void> = Thunk<
  IUIState,
  Payload,
  Result
>;

export interface IUIState {
  openedModal: ModalType | null;
  modalArgs: IModalArgs;

  openModal: UIAction<{ modal: ModalType; args?: IModalArgs }>;
  modifyModalArgs: UIAction<IModalArgs>;
  closeModal: UIAction;
}
