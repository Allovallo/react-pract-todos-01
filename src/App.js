import React, { Component } from 'react';
import './styles/base.scss';
import TodoList from 'components/TodoList/TodoList';
import TodoEditor from 'components/TodoEditor/TodoEditor';
import Filter from 'components/TodoFilter/TodoFilter';
import initialTodos from '../src/todos.json';
import { nanoid } from 'nanoid';
import Modal from 'components/Modal/Modal';
import Clock from 'components/Clock/Clock';
import Tabs from 'components/Tabs/Tabs';
import tabs from '../src/tabs.json';
import IconButton from 'components/IconButton/IconButton';
import { ReactComponent as AddIcon } from './icons/add.svg';

class App extends Component {
  state = {
    todos: initialTodos,
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

  calculatedCompletedTodos = () => {
    const { todos } = this.state;
    return todos.reduce((total, todo) => (todo.completed ? total + 1 : total), 0);
  };

  visibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return todos.filter(todo => todo.text.toLowerCase().includes(normalizedFilter));
  };

  render() {
    const { todos, filter, showModal } = this.state;
    const totalTodoCount = todos.length;
    const completedTodoCount = this.calculatedCompletedTodos();
    const visibleTodos = this.visibleTodos();

    return (
      <div>
        <Clock />

        <IconButton onClick={this.toggleModal}>
          <AddIcon width="40" height="40"></AddIcon>
        </IconButton>

        <Tabs items={tabs}></Tabs>
        {/* {showModal && <Clock />} */}
        {/* <button type="button" onClick={this.toggleModal}>
          Відкрити/Закрити таймер
        </button> */}

        <h1>Перелік завдань</h1>
        <div>
          <p>Загальна кількість todo'шек: {totalTodoCount}</p>
          <p>Кількість виконаних todo'шек: {completedTodoCount}</p>
        </div>
        {/* <button type="button" onClick={this.toggleModal}>
          Відкрити модалку
        </button> */}

        {showModal && (
          <Modal onClose={this.toggleModal}>
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
