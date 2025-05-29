'use client'
import { useState, useEffect } from "react"
import Header from "./components/Header"
import Span from "./components/Span"
import { Search } from "lucide-react"

interface Task {
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  date: string
}

export default function Home() {
  const [data, setData] = useState<string | null>(null)
  const [description, setDescription] = useState<string>('')
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('high')
  const [date, setDate] = useState<string>('')
  const [tasks, setTasks] = useState<Task[]>([])

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (data && description) {
      const newTask: Task = {
        title: data,
        description: description,
        priority: priority,
        date: date,
      }
      setTasks([...tasks, newTask])
      setData(null)
      setDescription('')
      setPriority('high')
      setDate('')
    }
  }

  return (
    <>
      <Header />

      <div className="bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 px-4 md:px-0 md:grid-cols-4 py-5 gap-5">
            <Span title="Всего задач" count={tasks.length} img="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5ZThmMmUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1ib29rLW1hcmtlZC1pY29uIGx1Y2lkZS1ib29rLW1hcmtlZCI+PHBhdGggZD0iTTEwIDJ2OGwzLTMgMyAzVjIiLz48cGF0aCBkPSJNNCAxOS41di0xNUEyLjUgMi41IDAgMCAxIDYuNSAySDE5YTEgMSAwIDAgMSAxIDF2MThhMSAxIDAgMCAxLTEgMUg2LjVhMSAxIDAgMCAxIDAtNUgyMCIvPjwvc3ZnPg==" />
            <Span title="Завершено" count={tasks.filter(task => task.completed).length} img="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMyZWFlMGEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaXJjbGUtY2hlY2staWNvbiBsdWNpZGUtY2lyY2xlLWNoZWNrIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Im05IDEyIDIgMiA0LTQiLz48L3N2Zz4=" />
            <Span title="Осталось сегодня" count={0} img="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDZlZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jbG9jay1pY29uIGx1Y2lkZS1jbG9jayI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48cG9seWxpbmUgcG9pbnRzPSIxMiA2IDEyIDEyIDE2IDE0Ii8+PC9zdmc+" />
            <Span title="Просрочено" count={0} img="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZjAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jbG9jay1hbGVydC1pY29uIGx1Y2lkZS1jbG9jay1hbGVydCI+PHBhdGggZD0iTTEyIDZ2Nmw0IDIiLz48cGF0aCBkPSJNMTYgMjEuMTZhMTAgMTAgMCAxIDEgNS0xMy41MTYiLz48cGF0aCBkPSJNMjAgMTEuNXY2Ii8+PHBhdGggZD0iTTIwIDIxLjVoLjAxIi8+PC9zdmc+" />
          </div>

          <div className="w-full mx-auto">
            <div className="w-full border border-gray-700 rounded-xl p-6 bg-gray-800 shadow-lg">
              <div className="flex flex-col space-y-5">
                <input
                  type="text"
                  placeholder="Новая задача"
                  value={data || ''}
                  onChange={e => setData(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
                {data && <div>
                  <input
                    type="text"
                    placeholder="Описание задачи"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full bg-gray-700 text-white px-4 pt-3 pb-10 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                  <div className="flex mt-5">
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM3MzczNzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jbG9jazEtaWNvbiBsdWNpZGUtY2xvY2stMSI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48cG9seWxpbmUgcG9pbnRzPSIxMiA2IDEyIDEyIDE0LjUgOCIvPjwvc3ZnPg==" alt="" />
                    <select
                      name="category"
                      value={priority}
                      onChange={e => setPriority(e.target.value as 'high' | 'medium' | 'low')}
                      className="p-2 mx-3 text-white border-gray-600 rounded-xl bg-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    >
                      <option value="high">Высокий приоритет</option>
                      <option value="medium">Средний приоритет</option>
                      <option value="low">Низкий приоритет</option>
                    </select>

                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM3MzczNzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jYWxlbmRhci1pY29uIGx1Y2lkZS1jYWxlbmRhciI+PHBhdGggZD0iTTggMnY0Ii8+PHBhdGggZD0iTTE2IDJ2NCIvPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iNCIgcng9IjIiLz48cGF0aCBkPSJNMyAxMGgxOCIvPjwvc3ZnPg==" alt="" />
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="mx-2 text-white p-2 border bg-gray-700 border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    />    
                  </div>
                </div>}
                <button onClick={addTask} className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
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
              placeholder='Найти задачу'
              className="w-full bg-gray-700 text-white px-10 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </>
  )
}
