import React, { useState } from "react";

const ToDoInput = ({ onAddTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0], // Data de azi implicită
  });

  const handleAdd = () => {
    if (formData.title.trim()) {
      onAddTask({
        ...formData,
        isCompleted: false,
      });
      // Resetăm formularul
      setFormData({
        title: "",
        description: "",
        dueDate: new Date().toISOString().split("T")[0],
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 mb-8 bg-zinc-800 p-4 rounded-xl border border-zinc-700">
      <input
        type="text"
        placeholder="Task Title..."
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="p-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:ring-2 focus:ring-sky-500 outline-none"
      />
      <textarea
        placeholder="Description..."
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="p-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:ring-2 focus:ring-sky-500 outline-none h-20"
      />
      
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
          className="flex-1 p-2 rounded bg-zinc-900 text-white border border-zinc-700 outline-none"
        />

        <div className="flex justify-center">
        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded transition-colors"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default ToDoInput;
