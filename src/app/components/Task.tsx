'use client'

import { Circle, CheckCircle2, Trash2, Pencil } from "lucide-react"
import { useState } from "react"

interface TaskItemProps {
  task: {
    id: string
    title: string
    description: string
    priority: 'high' | 'medium' | 'low'
    date: string
    completed: boolean
  }
  onToggleComplete: () => void
  deleteTask: () => void
  updateTask: (updatedTask: { id: string; title: string; description: string; priority: 'high' | 'medium' | 'low' }) => void
}

export default function TaskItem({ task, onToggleComplete, deleteTask, updateTask }: TaskItemProps) {
  
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)
  const [editedPriority, setEditedPriority] = useState(task.priority)

  const handleSave = () => {
    updateTask({ id: task.id, title: editedTitle, description: editedDescription, priority: editedPriority })
    setIsEditing(false)
  }

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
      
      {isEditing ? (
        <div className=" ml-2 md:ml-10 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-lg font-bold text-white">Редактировать задачу</h2>
          <input 
            type="text" 
            value={editedTitle} 
            onChange={e => setEditedTitle(e.target.value)} 
            className="w-full text-white bg-gray-700 border border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all mt-2 p-2 rounded-lg"
            placeholder="Название задачи"
          />
          <textarea 
            value={editedDescription} 
            onChange={e => setEditedDescription(e.target.value)} 
            className="w-full text-gray-300 bg-gray-700 border border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all mt-2 p-2 rounded-lg min-h-[100px]"
            placeholder="Описание задачи"
          />
          <div className="md:flex md:justify-between items-center">
            <select 
              value={editedPriority} 
              onChange={e => setEditedPriority(e.target.value as 'high' | 'medium' | 'low')} 
              className="mt-2 cursor-pointer bg-gray-700 text-white border border-gray-500 rounded-lg p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            >
              <option value="high">Высокий приоритет</option>
              <option value="medium">Средний приоритет</option>
              <option value="low">Низкий приоритет</option>
            </select>
           <button 
              onClick={handleSave} 
              className="mt-4 text-white px-4 py-2 bg-blue-600 rounded-lg duration-200 cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            >
              Сохранить
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className={`ml-10 ${task.completed ? 'text-gray-500' : 'text-white'} font-bold`}>{task.title}</h1>   
          <h2 className={`ml-10 ${task.completed ? 'text-gray-600' : 'text-gray-500'}`}>{task.description}</h2>
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
        </>
      )}
      {!isEditing &&
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer">
          <div className="flex">
            <Pencil color="#819AA9" className="mr-4" onClick={() => setIsEditing(!isEditing)} />
            <Trash2 color="#ff0000" onClick={deleteTask} />
          </div>
        </div>
      }
    </div>
  )
}
