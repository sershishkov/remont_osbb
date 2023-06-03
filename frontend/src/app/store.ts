import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import auth__Slice from '../features/auth/auth__Slice';
import themeSlice from '../features/theme/themeSlice';

import users__Slice from '../features/users/users__Slice';

export const store = configureStore({
  reducer: {
    theme__state: themeSlice,

    auth__state: auth__Slice,
    users__state: users__Slice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
