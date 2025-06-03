'use client'
import { useState, useEffect } from "react"
import Header from "./components/Header"
import Span from "./components/Span"
import { ClipboardList, Funnel, Search } from "lucide-react"
import Task from "./components/Task"
import { Bouncy } from "ldrs/react"
import 'ldrs/react/Bouncy.css'
import Image from "next/image"

interface Task {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  date: string
  completed: boolean
}

export default function Home() {
  const [data, setData] = useState<string | null>(null)
  const [description, setDescription] = useState<string>('')
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('high')
  const [date, setDate] = useState<string>('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }

  const addTask = () => {
    if (data && description) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: data,
        description: description,
        priority: priority,
        date: date,
        completed: false
      }
      setTasks([...tasks, newTask])
      setData('')
      setDescription('')
      setPriority('high')
      setDate('')
    }
  }

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? {...task, completed: !task.completed} : task
    )
    setTasks(updatedTasks)
  }

  const updateTask = (updatedTask: { id: string; title: string; description: string; priority: 'high' | 'medium' | 'low' }) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    )
    setTasks(updatedTasks)
  }

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) || task.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const completedTasksCount = tasks.filter(task => task.completed).length
  const today = new Date().toISOString().split('T')[0]
  const tasksDueToday = tasks.filter(task => task.date === today && !task.completed).length
  const overdueTasks = tasks.filter(task => task.date && new Date(task.date) < new Date(today) && !task.completed).length

  return (
    <>
      <Header />

      <div className="bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 py-5 gap-5">
            <Span 
              title="Всего задач" 
              count={tasks.length} 
              img="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5ZThmMmUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1ib29rLW1hcmtlZC1pY29uIGx1Y2lkZS1ib29rLW1hcmtlZCI+PHBhdGggZD0iTTEwIDJ2OGwzLTMgMyAzVjIiLz48cGF0aCBkPSJNNCAxOS41di0xNUEyLjUgMi41IDAgMCAxIDYuNSAySDE5YTEgMSAwIDAgMSAxIDF2MThhMSAxIDAgMCAxLTEgMUg2LjVhMSAxIDAgMCAxIDAtNUgyMCIvPjwvc3ZnPg==" 
            />
            <Span 
              title="Завершено" 
              count={completedTasksCount} 
              img="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMyZWFlMGEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaXJjbGUtY2hlY2staWNvbiBsdWNpZGUtY2lyY2xlLWNoZWNrIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Im05IDEyIDIgMiA0LTQiLz48L3N2Zz4=" 
            />
            <Span 
              title="Осталось сегодня" 
              count={tasksDueToday} 
              img="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDZlZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jbG9jay1pY29uIGx1Y2lkZS1jbG9jayI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48cG9seWxpbmUgcG9pbnRzPSIxMiA2IDEyIDEyIDE2IDE0Ii8+PC9zdmc+" 
            />
            <Span 
              title="Просрочено" 
              count={overdueTasks} 
              img="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZjAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jbG9jay1hbGVydC1pY29uIGx1Y2lkZS1jbG9jay1hbGVydCI+PHBhdGggZD0iTTEyIDZ2Nmw0IDIiLz48cGF0aCBkPSJNMTYgMjEuMTZhMTAgMTAgMCAxIDEgNS0xMy41MTYiLz48cGF0aCBkPSJNMjAgMTEuNXY2Ii8+PHBhdGggZD0iTTIwIDIxLjVoLjAxIi8+PC9zdmc+" 
            />
          </div>

          <div className="w-full">
            <div className="w-full border border-gray-700 rounded-xl p-6 bg-gray-800 shadow-lg">
              <div className="flex flex-col space-y-5">
                <input
                  type="text"
                  placeholder="Новая задача"
                  value={data || ''}
                  onChange={e => setData(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
                {data && (
                  <div>
                    <textarea
                      placeholder="Описание задачи"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all min-h-[100px]"
                    />
                    <div className="block md:flex mt-5 items-center">
                      <Image
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM3MzczNzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jbG9jazEtaWNvbiBsdWNpZGUtY2xvY2stMSI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48cG9seWxpbmUgcG9pbnRzPSIxMiA2IDEyIDEyIDE0LjUgOCIvPjwvc3ZnPg==" 
                        alt="img"
                        className="w-5 h-5 my-1"
                      />
                      <select
                        value={priority}
                        onChange={e => setPriority(e.target.value as 'high' | 'medium' | 'low')}
                        className="p-2 cursor-pointer mx-3 text-white border-gray-600 rounded-xl bg-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                      >
                        <option value="high">Высокий приоритет</option>
                        <option value="medium">Средний приоритет</option>
                        <option value="low">Низкий приоритет</option>
                      </select>

                      <img 
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM3MzczNzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jYWxlbmRhci1pY29uIGx1Y2lkZS1jYWxlbmRhciI+PHBhdGggZD0iTTggMnY0Ii8+PHBhdGggZD0iTTE2IDJ2NCIvPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iNCIgcng9IjIiLz48cGF0aCBkPSJNMyAxMGgxOCIvPjwvc3ZnPg==" 
                        className="w-5 h-5 md:ml-2 my-2"
                      />
                      <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="mx-2 cursor-pointer text-white p-2 border bg-gray-700 border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                      />    
                    </div>
                  </div>
                )}
                <button 
                  onClick={addTask} 
                  disabled={!data}
                  className={`md:ml-auto py-2 px-5 cursor-pointer rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${data ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                >
                  Добавить задачу
                </button>
              </div>
            </div>
          </div>

          <div className="my-5 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Найти задачу"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-gray-700 text-white px-10 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          <div className="my-8">
            {loading ? (
              <div className="text-center py-10">
                <Bouncy
                  size="45"
                  speed="1.5"
                  color="white" 
                />
              </div>
            ) : filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <Task
                  key={task.id}
                  task={task}
                  onToggleComplete={() => toggleTaskCompletion(task.id)}
                  deleteTask={() => deleteTask(task.id)}
                  updateTask={updateTask}
                />
              ))
            ) : tasks.length > 0 ? (
              <div className="text-center py-10">
                <Search size={50} className="mx-auto text-gray-500" />
                <h1 className="text-white text-xl mt-4">
                  Задачи не найдены
                </h1>
              </div>
            ) : (
              <div className="text-center py-10">
                <ClipboardList size={50} className="mx-auto text-gray-500" />
                <h1 className="text-white text-xl mt-4">
                  Список задач пуст
                  <br />
                  Попробуйте создать новую задачу
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}