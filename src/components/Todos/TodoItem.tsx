import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch } from '../../store';
import { todosActions } from '../../store/todoSlice';
import { uiActions } from '../../store/uiSlice';

import styles from './TodoItem.module.scss';
import CheckButton from './CheckButton';
import { ITodo } from '../../models/todo';

interface TodoItemProps {
  todo: ITodo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const { id, title, date, isCompleted } = todo;

  const checkTodoHandler = () => {
    dispatch(todosActions.toggleCompletedStatus(id));
  };

  const removeTodoHandler = () => {
    dispatch(todosActions.removeTodo(id));
  };

  const editTodoHandler = () => {
    dispatch(todosActions.loadEditingTodo(id));
    dispatch(uiActions.toggleAddTaskModal());
  };

  return (
    <li className={styles['todo-item']}>
      <div className={styles['todo-details']}>
        <CheckButton isCompleted={isCompleted} onCheck={checkTodoHandler} />
        <div className={styles['todo-info']}>
          <p
            className={`${styles['todo-name']} ${isCompleted ? styles['todo-name-completed'] : ''}`}
          >
            {title}
          </p>
          <p className={styles['todo-date']}>{date}</p>
        </div>
      </div>
      <div className={styles['todo-actions']}>
        <FontAwesomeIcon
          icon={faTrash}
          className={styles['todo-action']}
          onClick={removeTodoHandler}
        />
        <FontAwesomeIcon icon={faPen} className={styles['todo-action']} onClick={editTodoHandler} />
      </div>
    </li>
  );
};

export default TodoItem;
