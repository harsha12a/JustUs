import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import logo from '../assets/logo1.gif'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../redux/slices/userSlice"
import axios from "axios"
function Header() {
  const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark' ? true : false)
  const status = useSelector((state: any) => state.user.isLoggedIn)
  const dispatch = useDispatch()
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])
  const handleLogout = () => {
    axios.post('http://localhost:4000/user/logout', {}, { withCredentials: true })
    dispatch(logout())
  }
  return (
    <div>
      <nav className="flex p-4 justify-between items-center dark:bg-black dark:text-white">
        <img src={logo} alt="" className="w-10 h-10 mx-5 my-2" />
        <div className="flex items-center justify-between flex-wrap">
          {
            !status ? 
              <div>
                <Link to={'login'} className="mx-5 my-2 text-lg">Login</Link>
                <Link to={'signup'} className="mx-5 my-2 text-lg">Signup</Link>
              </div> : 
              <div>
                <button onClick={handleLogout} className="mx-5 my-2 text-lg">Logout</button>
                <Link to={'signup'} className="mx-5 my-2 text-lg">Profile</Link>
              </div>
          }
          <button onClick={() => setDark(!dark)} className="flex items-center rounded-full w-14 h-7 bg-gray-300 dark:bg-zinc-700 p-1 transition-colors duration-300">
            <div className={`w-5 h-5 rounded-full bg-white dark:bg-yellow-400 shadow-md transform transition-transform duration-300 ${dark ? "translate-x-7" : "translate-x-0"
              } flex items-center justify-center`}>{dark ? <Sun className="w-12 text-yellow-900 p-[2px]" /> : <Moon className="w-12 text-gray-700 p-[2px]" />}</div>
          </button>
        </div>
      </nav>
      <div></div>
    </div>
  )
}

export default Header