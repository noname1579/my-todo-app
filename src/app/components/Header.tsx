'use client'

import { CircleCheckBig, Moon, Sun } from "lucide-react"
import { useState } from "react"

const Header = () => {

  const [isDark, setIsDark] = useState(false)

  const reverseTheme = () => {
    setIsDark(!isDark)
  }

  return (  
    <div className="bg-gray-900">
      <div className="px-3 flex items-center container mx-auto h-16 md:h-20 justify-between">
        <div className="flex items-center">
          <CircleCheckBig color="#fff" size={35} />
          <h1 className="text-2xl text-white font-bold pl-4 md:pl-8">My ToDo</h1>
        </div>
        {!isDark && <>
          <Sun color="#ffffff" onClick={reverseTheme} size={28} />
        </>}
        {isDark && <>
          <Moon color="#ffffff" onClick={reverseTheme} size={28} />
        </>}
      </div>
      <hr className="text-gray-600" />
    </div>
  )
}
 
export default Header