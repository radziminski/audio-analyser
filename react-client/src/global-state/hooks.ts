import { createTypedHooks } from 'easy-peasy';

import { AppState } from './types';

const typedHooks = createTypedHooks<AppState>();

export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;
