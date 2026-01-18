import React from "react";
import { useState } from "react";
import ToDoInput from "./components/ToDoInput";
import ToDoItem from "./components/ToDoItem";

const App = () => {

  const [tasks, setTasks] = useState([]);

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title: title,
      isCompleted: false
    };
    setTasks([...tasks, newTask]);
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-900 py-10 px-4">
      <div className="max-w-md mx-auto">
        
        <h1 className="text-3xl font-bold text-white mb-8 text-center italic">
          My<span>Tasks</span>
        </h1>

        <ToDoInput onAddTask={addTask}/>

        <div className="mt-4">
          {tasks.map((task, index) => (
            <ToDoItem key={task.id} task={task} onDelete={deleteTask}/>
          ))}
        </div>

      </div>
    </div>
  );
};

export default App;
