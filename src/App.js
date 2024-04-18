import React, { Component } from 'react';
import './styles/base.scss';
import TodoList from 'components/TodoList/TodoList';
import initialTodos from '../src/todos.json';

class App extends Component {
  state = {
    todos: initialTodos,
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({ todos: prevState.todos.filter(todo => todo.id !== todoId) }));
  };

  toggleCompleted = todoId => {
    console.log(todoId);

    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  render() {
    const { todos } = this.state;

    const completedTodoCount = todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );

    return (
      <div>
        <h1>Перелік завдань</h1>
        <div>
          <p>Загальна кількість todo'шек: {todos.length}</p>
          <p>Кількість виконаних todo'шек: {completedTodoCount}</p>
        </div>
        <TodoList
          todos={todos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </div>
    );
  }
}

export default App;
