import React from "react";
import ToDoInput from "./components/ToDoInput";

const App = () => {
  return (
    <div className="min-h-screen bg-zinc-900 py-10 px-4">
      <div className="max-w-md mx-auto">
        
        <h1 className="text-3xl font-bold text-white mb-8 text-center italic">
          My<span>Tasks</span>
        </h1>

        <ToDoInput />

      </div>
    </div>
  );
};

export default App;
