
import { useEffect, useState } from 'react';
import './App.css'
import AddToDo from './components/AddToDo'
import Home from './pages/Home'
import ToDoList from './components/ToDoList';

function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7070/api/todos')
      .then(response => response.json())
      .then(data => setTodos(data.result))
      .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
  }, []);

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

const deleteTodo = (id) => {
  // Sende eine DELETE-Anfrage an das Backend, um das Todo zu löschen
  fetch(`http://localhost:7070/api/todos/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => setTodos(data.result))
    .catch(error => console.error('Fehler beim Löschen des Todos:', error));
};

/*   const addTodo = (newTodo) => {
    if (newTodo.trim() !== '') {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), task: newTodo, completed: false },
      ]);
    }
  };
 */

  return (
    <main>
      <Home todos={todos} toggleTodo={toggleTodo} />
      <AddToDo todos={todos} setTodos={setTodos} toggleTodo={toggleTodo} />
      <ToDoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
      
    </main>
  )
}

export default App
