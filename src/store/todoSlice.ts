import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodos, ITodo, StatusTodo, IEditingTodo } from '../models/todo';

const initalTodos: ITodos = {
  todos: [],
  editingTodo: {
    index: undefined,
    todo: undefined,
  },
  hasEditingTodo: false,
  currentStatus: 'All',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: initalTodos,
  reducers: {
    addTodo(state, action: PayloadAction<ITodo>) {
      state.todos.unshift(action.payload);
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo(state, action: PayloadAction<IEditingTodo>) {
      if (state.hasEditingTodo) {
        state.todos[action.payload.index!] = action.payload.todo!;
        state.hasEditingTodo = false;
        state.editingTodo.index = undefined;
        state.editingTodo.todo = undefined;
      }
    },
    toggleCompletedStatus(state, action: PayloadAction<string>) {
      const id = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        const todo = state.todos[todoIndex];
        todo.isCompleted = !todo.isCompleted;
        state.todos[todoIndex] = todo;
      }
    },
    loadEditingTodo(state, action: PayloadAction<string>) {
      const id = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      state.hasEditingTodo = true;
      state.editingTodo.index = todoIndex;
      state.editingTodo.todo = state.todos[todoIndex];
    },
    changeStatus(state, action: PayloadAction<StatusTodo>) {
      state.currentStatus = action.payload;
    },
  },
});

export const todosActions = todosSlice.actions;
export default todosSlice.reducer;
