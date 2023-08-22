import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import auth__Slice from '../features/auth/auth__Slice';
import themeSlice from '../features/theme/themeSlice';

import users__Slice from '../features/users/users__Slice';
import unit__Slice from '../features/refData/unit/unit__Slice';

import productgroup__Slice from '../features/refData/productgroup/productgroup__Slice';
import producttype__Slice from '../features/refData/producttype/producttype__Slice';
import products__Slice from '../features/refData/products/products__Slice';

import servicework_group__Slice from '../features/refData/servicework_group/servicework_group__Slice';
import thirdpartyservice_group__Slice from '../features/refData/thirdpartyservice_group/thirdpartyservice_group__Slice';
import serviceworks__Slice from '../features/refData/serviceworks/serviceworks__Slice';
import thirdpartyservices__Slice from '../features/refData/thirdpartyservices/thirdpartyservices__Slice';

export const store = configureStore({
  reducer: {
    theme__state: themeSlice,
    auth__state: auth__Slice,
    users__state: users__Slice,

    unit__state: unit__Slice,

    productgroup__state: productgroup__Slice,
    producttype__state: producttype__Slice,
    products__state: products__Slice,

    servicework_group__state: servicework_group__Slice,
    thirdpartyservice_group__state: thirdpartyservice_group__Slice,
    serviceworks__state: serviceworks__Slice,
    thirdpartyservices__state: thirdpartyservices__Slice,
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
