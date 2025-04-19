import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
function ProtectedRoute() {
  const user = useSelector((state: any) => state.user.user)
  const loation = useLocation()
  return user? (
    <Outlet />
  ): (
    <Navigate to="/login" state={{ from: loation }} replace />
  )
}

export default ProtectedRoute