import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import studentReducer from '@/features/students/studentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
