const ToDoItem = ({ todo, toggleTodo, deleteTodo }) => {
    return ( 
        <li
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.task}
        <button onClick={() => deleteTodo(todo.id)}>Löschen</button>
      </li>
    );
}

export default ToDoItem;