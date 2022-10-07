import React from "react";
import "./index.css";

const App = () => {
  const todoData = JSON.parse(localStorage.getItem("todos"));
  const [todos, setTodos] = React.useState(todoData || []);

  return (
    <div className="App">
      <div className="wrapper">
        <h1>Todo List</h1>
        <AddTodo setTodos={setTodos} todos={todos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
      <Footer />
    </div>
  );
};

const TodoList = ({ todos, setTodos }) => {
  const handleToggleTodo = (item) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === item.id
        ? {
            ...todo,
            done: !todo.done
          }
        : todo
    );
    setTodos(updatedTodos);
  };

  if (!todos.length) {
    return <p>No tasks for today</p>;
  }

  return (
    <ul>
      {todos.map((item) => (
        <li key={item.id}>
          <span
            onClick={() => handleToggleTodo(item)}
            style={{ textDecoration: item.done ? "line-through" : "" }}
          >
            {item.text}
          </span>
          <DeleteTodo item={item} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
};

const AddTodo = ({ setTodos, todos }) => {
  const inputRef = React.useRef();

  const handleAddTodo = (event) => {
    event.preventDefault();
    const text = event.target.elements.addTodo.value;
    const newTask = {
      id: Math.random(),
      text,
      done: false
    };

    setTodos((prevTodos) => {
      return text === "" ? prevTodos : prevTodos.concat(newTask);
    });

    inputRef.current.value = "";
  };

  localStorage.setItem("todos", JSON.stringify(todos));

  return (
    <form onSubmit={handleAddTodo}>
      <input name="addTodo" ref={inputRef} placeholder="add new todo item" />
      <button type="submit">add new</button>
    </form>
  );
};

const DeleteTodo = ({ item, setTodos }) => {
  const handleDeleteTodo = () => {
    const confirmed = window.confirm("Do you want to delete this item?");

    if (confirmed) {
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== item.id);
      });
    }
  };

  return (
    <button className="delete" onClick={handleDeleteTodo}>
      delete
    </button>
  );
};

const Footer = () => {
  return (
    <p>
      by{" "}
      <a href="https://github.com/nirduk" target="_blank" rel="noreferrer">
        kudrin
      </a>
    </p>
  );
};

export default App;