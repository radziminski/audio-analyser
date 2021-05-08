import { createTypedHooks } from 'easy-peasy';

import { IAppState } from './types';

const typedHooks = createTypedHooks<IAppState>();

export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;
