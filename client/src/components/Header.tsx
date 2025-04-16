import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Header() {
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");
  const [header, setHeader] = useState(false);
  const menuRef = useRef(null);
  const status = useSelector((state: any) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as any).contains(e.target)) {
        setHeader(false);
      }
    };
    if (header) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [header]);

  const handleLogout = () => {
    axios.post("http://localhost:4000/user/logout", {}, { withCredentials: true });
    dispatch(logout());
  };

  return (
    <header className="">
      <div className="sm:hidden absolute right-24 cursor-pointer top-5 z-20" onClick={() => setHeader(!header)}>
        <Menu />
      </div>

      <nav className="flex p-4 justify-between items-center dark:bg-[#1b222c] bg-[#ddc2ff]">
        <div className="ml-5 font-bold text-xl fonting">JustUs</div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-24 text-lg">
          {!status ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <>
              <button onClick={() => {handleLogout();navigate('/')}}>Logout</button>
              <Link to="/chat">Chats</Link>
              <Link to="/profile">Profile</Link>
            </>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="flex items-center rounded-full w-14 h-7 bg-zinc-400 dark:bg-zinc-700 p-1 transition-colors duration-300"
        >
          <div
            className={`w-5 h-5 rounded-full bg-white dark:bg-yellow-400 shadow-md transform transition-transform duration-300 ${
              dark ? "translate-x-7" : "translate-x-0"
            } flex items-center justify-center`}
          >
            {dark ? <Sun className="w-4 text-yellow-900" /> : <Moon className="w-4 text-gray-700" />}
          </div>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {header && (
        <div
          ref={menuRef}
          className="sm:hidden absolute right-5 top-16 bg-white dark:bg-black shadow-md rounded-lg p-4 flex flex-col space-y-3 z-10"
        >
          {!status ? (
            <>
              <Link to="/login" onClick={() => setHeader(false)}>Login</Link>
              <Link to="/signup" onClick={() => setHeader(false)}>Signup</Link>
            </>
          ) : (
            <>
              <button onClick={() => { handleLogout(); setHeader(false); }}>Logout</button>
              <Link to="/chat" onClick={() => setHeader(false)}>Chats</Link>
              <Link to="/profile" onClick={() => setHeader(false)}>Profile</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
