const TodoList = ({ todos }) => (
  <ul>
    {todos.map(({ id, text }) => (
      <li key={id}>
        <p>{text}</p>
      </li>
    ))}
  </ul>
);

export default TodoList;
