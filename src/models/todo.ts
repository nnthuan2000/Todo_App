export type StatusTodo = 'All' | 'Incomplete' | 'Completed';

export const status = ['All', 'Incomplete', 'Completed'];

export interface ITodo {
  id: string;
  title: string;
  date: string;
  isCompleted: boolean;
}

export interface IEditingTodo {
  index?: number;
  todo?: ITodo;
}

export interface ITodos {
  todos: ITodo[];
  editingTodo: IEditingTodo;
  hasEditingTodo: boolean;
  currentStatus: StatusTodo;
  changed: boolean;
}
