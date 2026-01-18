import React from "react";

const ToDoInput = () => {
  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Add new task..."
        className="flex-1 p-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white focus:outline-none focus-ring2 focus-ring-sky-500"
      />
      <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-lg transition-colors">
        Add
      </button>
    </div>
  );
};

export default ToDoInput;
