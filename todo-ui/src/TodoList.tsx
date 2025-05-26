import { useEffect, useState } from "react";
import { Todo } from "./Types";
import "./App.css";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTodo, setEditTodo] = useState<Todo>({
    title: "",
    description: "",
    status: "",
    date: "",
    resource: "",
  });

  const fetchTodos = () => {
    fetch("http://localhost:8080/todos/get-all-todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id: number) => {
    await fetch(`http://localhost:8080/todos/delete-todo/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo({ ...editTodo, [e.target.name]: e.target.value });
  };

  const submitEdit = async () => {
    await fetch("http://localhost:8080/todos/update-todo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editTodo, id: editId }),
    });
    setEditId(null);
    fetchTodos();
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ marginBottom: "20px" }}>
          {editId === todo.id ? (
            <>
              <input
                name="title"
                value={editTodo.title}
                onChange={handleEditChange}
              />
              <input
                name="description"
                value={editTodo.description}
                onChange={handleEditChange}
              />
              <input
                name="status"
                value={editTodo.status}
                onChange={handleEditChange}
              />
              <input
                name="resource"
                value={editTodo.resource}
                onChange={handleEditChange}
              />
              <button onClick={submitEdit}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <div>
                <strong>{todo.title}</strong>
              </div>
              <div>{todo.description}</div>
              <div>
                Status: <em>{todo.status}</em>
              </div>
              {todo.resource && (
                <img
                  src={todo.resource}
                  alt="todo"
                  style={{ width: "150px", marginTop: "10px" }}
                />
              )}
              <div>
                <button
                  onClick={() => {
                    setEditId(todo.id || null);
                    setEditTodo(todo);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteTodo(todo.id!)}>Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
