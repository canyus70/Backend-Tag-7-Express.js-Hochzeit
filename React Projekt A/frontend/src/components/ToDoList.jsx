import ToDoItem from "./TodoItem";

const ToDoList = ({todos, toggleTodo, deleteTodo }) => {
    return ( 
        <ul>
        {todos.map((todo) => (
          <ToDoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        ))}
      </ul>
     );
}

export default ToDoList;