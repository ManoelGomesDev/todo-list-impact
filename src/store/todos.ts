import {create} from "zustand"

export type Todo = {
    id: string
    title: string
    favorite: boolean
}

export type TodoState = {
    todos: Todo[]
    addTodo: (title: string) => void
    deleteTodo: (id: string) => void
    favoriteTodo: (id: string) => void
}

export const useTodoStore = create<TodoState>((set) => ({
    todos: [],
    addTodo: (title) => set((state) => ({ 
        todos: [...state.todos, { id: crypto.randomUUID(), title, favorite: false }] 
    })),
    deleteTodo: (id) => set((state) => ({ 
        todos: state.todos.filter(todo => todo.id !== id) 
    })),
    favoriteTodo: (id) => set((state) => ({ 
        todos: state.todos.map(todo => todo.id === id ? { ...todo, favorite: !todo.favorite } : todo) 
    })),
}))



