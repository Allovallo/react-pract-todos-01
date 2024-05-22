import React from 'react';

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
      <button type="button" className="TodoList__btn" onClick={onDelete}>
        Удалити
      </button>
    </>
  );
};

export default Todo;