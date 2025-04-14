// import axios from "axios"
// import { useEffect } from "react"
// import { useSelector } from "react-redux"
// import { useDispatch } from "react-redux"
// import { setChat } from "../redux/slices/chatSlice"

import { Link } from "react-router-dom"

function HeroSection() {
  // const user = useSelector((state: any) => state.user.user)
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   if(user) {
  //     axios.get(`http://localhost:4000/chat/${user.id}`, {
  //       withCredentials: true
  //     }).then((res) => {
  //       dispatch(setChat(res.data))
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  //   }
  // }, [user, dispatch])
  return (
    <div>
      <div className="bg-grn dark:bg-brn flex flex-col justify-evenly items-center h-screen">
          <div className="max-w-4xl flex flex-col gap-10">
          <div className="text-5xl font-bold text-center text-brn dark:text-grn">Connect with anyone, anywhere, instantly</div>
          <div className="text-center text-brn text-xl font-thin dark:text-grn">Experience seamless one-on-one conversations with our modern chat platform. Built for personal connections, designed for simplicity.</div>
          <div className="flex justify-center">
            <Link to={'signup'} className="bg-brn dark:bg-grn dark:text-brn text-grn py-2 px-4 rounded">Get Started</Link>
          </div>
          </div>
      </div>
    </div>
  )
}

export default HeroSection