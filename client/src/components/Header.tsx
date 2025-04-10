import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

function Header() {
  const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark' ? true : false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])
  return (
    <div>
        <nav className="flex bg-gray-400 p-4 justify-end items-center dark:bg-black dark:text-white">
            <div className="mx-5 my-2 text-lg">Login</div>
            <div className="mx-5 my-2 text-lg">Signup</div>
            <button onClick={() => setDark(!dark)} className="flex items-center rounded-full w-14 h-7 bg-gray-300 dark:bg-zinc-700 p-1 transition-colors duration-300">
                <div className={`w-5 h-5 rounded-full bg-white dark:bg-yellow-400 shadow-md transform transition-transform duration-300 ${dark ? "translate-x-7" : "translate-x-0"
              } flex items-center justify-center`}>{dark? <Sun className="w-12 text-yellow-900 p-[2px]" />:<Moon className="w-12 text-gray-700 p-[2px]" />}</div>
            </button>
        </nav>
        <div></div>
    </div>
  )
}

export default Header