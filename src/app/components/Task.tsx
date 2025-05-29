'use client'

import { Circle, CheckCircle2, Trash2 } from "lucide-react"
import { useState } from "react"

interface TaskItemProps {
  task: {
    title: string
    description: string
    priority: 'high' | 'medium' | 'low'
    date: string
  }
  onToggleComplete: () => void
}

export default function TaskItem({ task, onToggleComplete, deleteTask }: TaskItemProps) {
  const [isCompleted, setIsCompleted] = useState(false)

  const handleToggle = () => {
    setIsCompleted(!isCompleted)
    onToggleComplete()
  }

  return (
    <div className="border-2 border-gray-600 bg-gray-800 mt-5 rounded-xl p-4 relative">
      {isCompleted ? (
        <CheckCircle2 
          color="#4ade80"
          className="absolute left-2 top-1/4 transform -translate-y-1/2 cursor-pointer"
          onClick={handleToggle}
        />
      ) : (
        <Circle 
          color="#919191" 
          className="absolute left-2 top-1/4 transform -translate-y-1/2 cursor-pointer"
          onClick={handleToggle}
        />
      )}
      <h1 className="ml-10 text-white font-bold">{task.title}</h1>   
      <h2 className="ml-10 text-gray-500">{task.description}</h2>
      <p className={`ml-8 rounded-2xl px-2 mt-2 inline-block ${
        task.priority === 'high' ? 'bg-red-700' : 
        task.priority === 'medium' ? 'bg-amber-700' : 'bg-green-700'
      }`}>
        <span className="rounded-2xl px-2 inline-block text-white">
          {task.priority === 'high' ? 'Высокий' : 
           task.priority === 'medium' ? 'Средний' : 'Низкий'}
        </span>
      </p>
      {task.date && (
        <p className="ml-10 mt-2 text-gray-400 text-sm">
          {new Date(task.date).toLocaleDateString()}
        </p>
      )}
    
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer">
        <Trash2 color="#ff0000" onClick={() => deleteTask()} />
      </div>
    </div>
  )
}