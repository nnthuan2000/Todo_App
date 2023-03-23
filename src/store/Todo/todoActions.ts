import { AppDispatch } from '..';
import { todosActions } from './todoSlice';
import { ITodo } from '../../models/todo';

export const getTodos = () => {
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      return new Promise<string>((resolve) => {
        const data = localStorage.getItem('todos');
        if (data) {
          resolve(data);
        }
      });
    };

    const data = await fetchData();
    dispatch(todosActions.replaceTodos(JSON.parse(data)));
  };
};

export const sendTodos = (todos: ITodo[]) => {
  return async (dispatch: AppDispatch) => {
    const sendData = () => {
      console.log('aaaa');
      localStorage.setItem('todos', JSON.stringify(todos));
    };

    sendData();
  };
};
