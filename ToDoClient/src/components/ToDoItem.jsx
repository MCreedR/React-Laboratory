import React from "react";

const ToDoItem = ({ task, onDelete }) => {
  return (
    <div className="p-4 bg-zinc-800 rounded-lg mb-4 border-l-4 border-sky-500 shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg">{task.title}</h3>
          <p className="text-zinc-400 text-sm mt-1">{task.description}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] bg-zinc-900 text-sky-400 px-2 py-1 rounded uppercase font-bold">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-zinc-500 hover:text-red-500 transition-colors p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
