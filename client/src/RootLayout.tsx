import { Outlet } from "react-router-dom"
import Header from "./components/Header"
function RootLayout() {
  return (
    <div>
        <Header />
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default RootLayout