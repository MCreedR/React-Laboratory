import React from "react";
import { useState, useEffect } from "react";
import ToDoInput from "./components/ToDoInput";
import ToDoItem from "./components/ToDoItem";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7088/api/ToDoItems")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Failed to conect to API:", err));
  }, []);

  const addTask = (taskData) => {
    fetch("https://localhost:7088/api/ToDoItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks([...tasks, newTask]);
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  const deleteTask = (id) => {
    fetch(`https://localhost:7088/api/ToDoItems/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setTasks(tasks.filter((task) => task.id !== id));
        }
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  return (
    <div className="min-h-screen bg-zinc-900 py-10 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center italic">
          My<span>Tasks</span>
        </h1>

        <ToDoInput onAddTask={addTask} />

        <div className="mt-4">
          {tasks.map((task, index) => (
            <ToDoItem key={task.id} task={task} onDelete={deleteTask} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
