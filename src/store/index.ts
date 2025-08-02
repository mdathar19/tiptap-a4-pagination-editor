import { configureStore } from '@reduxjs/toolkit';
import {useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import appSlice from './slices/appSlice';
import editorSlice from './slices/editorSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    editor: editorSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;