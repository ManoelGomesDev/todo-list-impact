'use client';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoslice';

// Configure the store
const store = configureStore({
  reducer: {
    todos: todoReducer
  }
});

// Type for RootState
export type RootState = ReturnType<typeof store.getState>;

// Provider component
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
} 