import React from 'react'

const ToDoItem = ({ task, onDelete }) => {
  return (
    <div className='flex items-center justify-between p-3 bg-zinc-800 rounded-lg m-b2 border-l-4 border-sky-500'>
        <span className='text-white'>{task.title}</span>
        <button className='text-red-400 hover:text-red-600 font-medium' onClick={() => onDelete(task.id)}>
            Delete
        </button>
    </div>
  )
}

export default ToDoItem