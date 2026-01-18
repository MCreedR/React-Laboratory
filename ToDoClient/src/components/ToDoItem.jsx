import React from 'react'

const ToDoItem = ({ task }) => {
  return (
    <div className='flex items-center justify-between p-3 bg-zinc-800 rounded-lg m-b2 border-l-4 border-sky-500'>
        <span className='text-white'>{task}</span>
        <button className='text-red-400 hover:text-red-600 font-medium'>
            Delete
        </button>
    </div>
  )
}

export default ToDoItem