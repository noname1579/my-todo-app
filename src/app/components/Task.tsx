'use client'

import { Circle, CheckCircle2, Trash2, Pencil } from "lucide-react"

interface TaskItemProps {
  task: {
    title: string
    description: string
    priority: 'high' | 'medium' | 'low'
    date: string
    completed: boolean
  }
  onToggleComplete: () => void
  deleteTask: () => void
}

export default function TaskItem({ task, onToggleComplete, deleteTask }: TaskItemProps) {
  return (
    <div className={`border-2 ${task.completed ? 'border-green-500' : 'border-gray-600'} bg-gray-800 mt-5 rounded-xl p-4 relative`}>
      {task.completed ? (
        <CheckCircle2 
          color="#4ade80"
          className="absolute left-2 top-1/4 transform -translate-y-1/2 cursor-pointer"
          onClick={onToggleComplete}
        />
      ) : (
        <Circle 
          color="#919191" 
          className="absolute left-2 top-1/4 transform -translate-y-1/2 cursor-pointer"
          onClick={onToggleComplete}
        />
      )}
      <h1 className={`ml-10 ${task.completed ? 'text-gray-500 line-through' : 'text-white'} font-bold`}>{task.title}</h1>   
      <h2 className={`ml-10 ${task.completed ? 'text-gray-600 line-through' : 'text-gray-500'}`}>{task.description}</h2>
      {!task.completed && (
        <p className={`ml-8 rounded-2xl px-2 mt-2 inline-block ${
          task.priority === 'high' ? 'bg-red-900' : 
          task.priority === 'medium' ? 'bg-amber-900' : 'bg-green-900'
        }`}>
          <span className="rounded-2xl px-2 inline-block text-white">
            {task.priority === 'high' ? 'Высокий' : 
             task.priority === 'medium' ? 'Средний' : 'Низкий'}
          </span>
        </p>
      )}
      {task.date && (
        <p className={`ml-10 mt-2 text-sm ${task.completed ? 'text-gray-600' : 'text-gray-400'}`}>
          {new Date(task.date).toLocaleDateString()}
        </p>
      )}
    
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer">
        <div className="flex">
          <Pencil color="#819AA9" className="mr-4" />
          <Trash2 color="#ff0000" onClick={deleteTask} />
        </div>
      </div>
    </div>
  )
}