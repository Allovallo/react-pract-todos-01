import React, { Component } from 'react';
import './styles/base.scss';
import TodoList from 'components/TodoList/TodoList';
import initialTodos from '../src/todos.json';

class App extends Component {
  state = {
    todos: [],
  };

  render() {
    return (
      <div>
        <h1>Перелік завдань</h1>
        <TodoList todos={initialTodos} />
      </div>
    );
  }
}

export default App;
