import React from 'react';
import IconButton from 'components/IconButton/IconButton';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';

const Todo = ({ text, completed, onToggleCompleted, onDelete }) => {
  return (
    <>
      <input
        type="checkbox"
        className="TodoList__checkbox"
        checked={completed}
        onChange={onToggleCompleted}
      />
      <p className="TodoList__text">{text}</p>
      <IconButton>
        <DeleteIcon width="32" height="32" fill="#fff" onClick={onDelete}></DeleteIcon>
      </IconButton>
    </>
  );
};

export default Todo;
