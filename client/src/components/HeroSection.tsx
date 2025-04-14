import axios from "axios"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setChat } from "../redux/slices/chatSlice"

function HeroSection() {
  const user = useSelector((state: any) => state.user.user)
  const dispatch = useDispatch()
  useEffect(() => {
    if(user) {
      axios.get(`http://localhost:4000/chat/${user.id}`, {
        withCredentials: true
      }).then((res) => {
        dispatch(setChat(res.data))
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [user, dispatch])
  return (
    <div>HeroSection</div>
  )
}

export default HeroSection