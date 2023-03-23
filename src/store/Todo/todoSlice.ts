import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodos, ITodo, StatusTodo, IEditingTodo } from '../../models/todo';
import { toast } from 'react-hot-toast';

const initalTodos: ITodos = {
  todos: [],
  editingTodo: {
    index: undefined,
    todo: undefined,
  },
  hasEditingTodo: false,
  currentStatus: 'All',
  changed: false,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: initalTodos,
  reducers: {
    replaceTodos(state, action: PayloadAction<ITodo[]>) {
      state.todos = action.payload;
      state.changed = false;
    },
    addTodo(state, action: PayloadAction<ITodo>) {
      state.todos.unshift(action.payload);
      toast.success('Add todo successfully', {
        style: {
          fontSize: '1.6rem',
        },
      });
      state.changed = true;
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      toast.success('Todo deleted successfully', {
        style: {
          fontSize: '1.6rem',
        },
      });
      state.changed = true;
    },
    updateTodo(state, action: PayloadAction<IEditingTodo>) {
      if (state.hasEditingTodo) {
        state.todos[action.payload.index!] = action.payload.todo!;
        state.hasEditingTodo = false;
        state.editingTodo.index = undefined;
        state.editingTodo.todo = undefined;
      }
      toast.success('Todo updated successfully', {
        style: {
          fontSize: '1.6rem',
        },
      });
      state.changed = true;
    },
    toggleCompletedStatus(state, action: PayloadAction<string>) {
      const id = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        const todo = state.todos[todoIndex];
        todo.isCompleted = !todo.isCompleted;
        state.todos[todoIndex] = todo;
      }
      state.changed = true;
    },
    loadEditingTodo(state, action: PayloadAction<string>) {
      const id = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      state.hasEditingTodo = true;
      state.editingTodo.index = todoIndex;
      state.editingTodo.todo = state.todos[todoIndex];
      state.changed = false;
    },
    changeStatus(state, action: PayloadAction<StatusTodo>) {
      state.currentStatus = action.payload;
    },
  },
});

export const todosActions = todosSlice.actions;
export default todosSlice.reducer;
