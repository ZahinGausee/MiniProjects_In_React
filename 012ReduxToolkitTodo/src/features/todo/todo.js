import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  todos: [
    {
      id: 1, 
      todoText: "Your msg"
    }
  ]
}

export const todosSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        todoText: action.payload
      }
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    }
  }
})

export const {addTodo, removeTodo} = todosSlice.actions;

export default todosSlice.reducer;