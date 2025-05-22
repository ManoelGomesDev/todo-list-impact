This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Guia Redux Toolkit

### 1. Instalação

Primeiro, instale as dependências necessárias:

```bash
npm install @reduxjs/toolkit react-redux
# ou
yarn add @reduxjs/toolkit react-redux
```

### 2. Configuração do Store

Crie um arquivo para configurar a store do Redux:

```typescript
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Aqui você irá adicionar seus reducers
  },
});

// Tipos de inferência
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 3. Provider do Redux

Envolva sua aplicação com o Provider do Redux:

```typescript
// src/app/providers.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from '../store';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```

### 4. Criando uma Slice

Uma slice é uma coleção de lógica de reducer e actions:

```typescript
// src/store/features/todoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

### 5. Hooks Personalizados

Crie hooks personalizados para usar o Redux:

```typescript
// src/store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### 6. Usando em Componentes

Exemplo de como usar o Redux em um componente:

```typescript
// src/components/TodoList.tsx
'use client';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTodo, toggleTodo } from '../store/features/todoSlice';

export function TodoList() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todo.todos);

  const handleAddTodo = (text: string) => {
    dispatch(addTodo(text));
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  return (
    // JSX do componente
  );
}
```

### 7. Boas Práticas

1. **Imutabilidade**: O Redux Toolkit usa Immer internamente, permitindo que você "mute" o estado diretamente dentro dos reducers.
2. **Organização**: Mantenha suas slices em arquivos separados.
3. **Tipos**: Sempre defina interfaces para seus estados e payloads.
4. **Seletores**: Use seletores para acessar o estado de forma consistente.

### 8. Middleware e Extra Reducers

Para casos mais avançados, você pode adicionar middleware e extraReducers:

```typescript
import { createAsyncThunk } from '@reduxjs/toolkit';

// Thunk assíncrono
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('/api/todos');
    return response.json();
  }
);

// Na sua slice
export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // ... seus reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      });
  },
});
```

### 9. Debug

Para debug, recomenda-se usar a extensão Redux DevTools:
- [Redux DevTools para Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [Redux DevTools para Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
