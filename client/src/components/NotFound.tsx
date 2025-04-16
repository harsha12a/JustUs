import { useLocation } from "react-router-dom"

function NotFound() {
  const location = useLocation()
  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-4xl">Not Found <span className="text-red-600">404</span></div>
        <div className="text-2xl">Route - {location.pathname}</div>
    </div>
  )
}

export default NotFound