import { useAppSelector } from '../../store';

import TodoItem from './TodoItem';
import styles from './TodosList.module.scss';

const TodosList = () => {
  let todos = useAppSelector((state) => state.todo.todos);
  const currentStatus = useAppSelector((state) => state.todo.currentStatus);

  if (currentStatus === 'Completed') {
    todos = todos.filter((todo) => todo.isCompleted === true);
  } else if (currentStatus === 'Incomplete') {
    todos = todos.filter((todo) => todo.isCompleted === false);
  }

  const hasTodos = todos.length !== 0;

  return (
    <div className={styles['todos-list']}>
      {hasTodos && (
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
      {!hasTodos && <p className={styles['todos-list-empty']}>No Todos</p>}
    </div>
  );
};

export default TodosList;
