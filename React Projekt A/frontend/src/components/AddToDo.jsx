import { useState } from "react";

const AddToDo = ({ todos, setTodos, toggleTodo }) => {


const [newTodo, setNewTodo] = useState('');



const addTodo = () => {
  if (newTodo.trim() !== '') {
    fetch('http://localhost:7070/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: newTodo }),
    })
      .then(response => response.json())
      .then(data => setTodos(data.result))
      .catch(error => console.error('Fehler beim Hinzufügen des Todos:', error));

    setNewTodo('');
  }
};




    return ( 
        <section>
        <h2>Füge ein weitern To-Do hinzu</h2>
        <p>Offene To-dos: {todos.filter((todo) => !todo.completed).length}</p>

        {todos ? (
    <div>

      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Hinzufügen</button>
    </div>
  ) : null}
        </section>
);
}

export default AddToDo;