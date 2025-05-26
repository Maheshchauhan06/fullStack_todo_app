import { useState } from "react";
import { Todo } from "./Types";
import "./App.css";

const initialTodo: Todo = {
  title: "",
  description: "",
  status: "",
  date: "",
  resource: "",
};

export default function TodoForm() {
  const [todo, setTodo] = useState<Todo>(initialTodo);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTodo({ ...todo, resource: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:8080/todos/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    setTodo(initialTodo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={todo.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        name="description"
        value={todo.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />

      <select
        name="status"
        value={todo.status}
        onChange={handleChange}
        required
      >
        <option value="">Select Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <input
        name="date"
        type="date"
        value={todo.date}
        onChange={handleChange}
        required
      />

      <input type="file" accept="image/*" onChange={handleFileChange} />

      <button type="submit">Add Todo</button>
    </form>
  );
}
