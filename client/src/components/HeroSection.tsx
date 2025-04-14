import axios from "axios"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setChat } from "../redux/slices/chatSlice"
interface User {
  id: string,
  username: string,
  email: string,
  profilePic: string,
  createdAt: Date
}

interface RootState {
  user: User
}
function HeroSection() {
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get(`http://localhost:4000/chat/${user.id}`, {
      withCredentials: true
    }).then((res) => {
      dispatch(setChat(res.data))
    })
    .catch((err) => {
      console.log(err)
    })
  }, [user, dispatch])
  return (
    <div>HeroSection</div>
  )
}

export default HeroSection