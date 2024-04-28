import React, { Component } from 'react';
import './styles/base.scss';
import TodoList from 'components/TodoList/TodoList';
import TodoEditor from 'components/TodoEditor/TodoEditor';
import Filter from 'components/TodoFilter/TodoFilter';
// import initialTodos from '../src/todos.json';
import { nanoid } from 'nanoid';
import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    todos: [],
    filter: '',
    showModal: false,
  };

  componentDidMount() {
    console.log('App componentDidMount');

    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);

    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');

    if (this.state.todos !== prevState.todos) {
      console.log('Оновилося поле todos, записую todos в сховище!');

      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

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

  addTodo = text => {
    const todo = {
      id: nanoid(),
      text: text,
      completed: false,
    };

    this.setState(prevState => ({ todos: [todo, ...prevState.todos] }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    console.log('App render');

    const { todos, filter, showModal } = this.state;

    const completedTodoCount = todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );

    const visibleTodos = this.state.todos.filter(todo =>
      todo.text.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <div>
        <h1>Перелік завдань</h1>
        <div>
          <p>Загальна кількість todo'шек: {todos.length}</p>
          <p>Кількість виконаних todo'шек: {completedTodoCount}</p>
        </div>
        <button type="button" onClick={this.toggleModal}>
          Відкрити модалку
        </button>

        {showModal && (
          <Modal>
            <h1>Привіт, це контент модалки як children</h1>
            <p>
              text text text text text text text text text text text text text text text text text
              text text text text text text text text text text text text text text text text text
              text text text text text text text text
            </p>
            <button type="button" onClick={this.toggleModal}>
              Закрити
            </button>
          </Modal>
        )}

        <TodoEditor onSubmit={this.addTodo} />
        <Filter value={filter} onChange={this.changeFilter} />
        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </div>
    );
  }
}

export default App;
