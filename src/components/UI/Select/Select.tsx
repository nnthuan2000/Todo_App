import React, { useState, useImperativeHandle, useEffect } from 'react';

import { useAppDispatch } from '../../../store';
import { todosActions } from '../../../store/todoSlice';

import styles from './Select.module.scss';
import { StatusTodo } from '../../../models/todo';

interface SelectProps {
  className?: string;
  id: string;
  status: string[];
  isCompleted: boolean;
  isChangeStatusGlobal: boolean;
}

const Select = React.forwardRef(
  ({ id, className, status, isCompleted, isChangeStatusGlobal }: SelectProps, ref) => {
    const dispatch = useAppDispatch();
    const [selectedOption, setSelectedOption] = useState<string>(
      isCompleted ? status[1] : status[0]
    );

    const selectOptionHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(e.target.value);
    };

    useEffect(() => {
      if (isChangeStatusGlobal) {
        dispatch(todosActions.changeStatus(selectedOption as StatusTodo));
      }
    }, [dispatch, selectedOption, isChangeStatusGlobal]);

    useImperativeHandle(ref, () => {
      return {
        value: selectedOption,
      };
    });

    return (
      <select
        name=""
        id={id}
        className={`${styles.select} ${className || ''}`}
        defaultValue={selectedOption}
        onChange={selectOptionHandler}
      >
        {status.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
);

export default Select;
