import { createSlice } from "@reduxjs/toolkit"

interface TodoState {
    tasks: string[]
    favoriteTasks: string[]
}

const initialState: TodoState = {
    tasks: [],
    favoriteTasks: [],
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task !== action.payload)
        },
        favoriteTask: (state, action) => {
            if (state.favoriteTasks.includes(action.payload)) {
                state.favoriteTasks = state.favoriteTasks.filter((task) => task !== action.payload)
            } else {
                state.favoriteTasks.push(action.payload)
            }
        },
     
    }
})

export const { addTask, deleteTask, favoriteTask } = todoSlice.actions
export default todoSlice.reducer
