import { useSelector } from "react-redux"
function Profile() {
  const user = useSelector((state: any) => state.user.user)
  return (
    <div className="flex justify-center items-center h-screen bg-grn dark:bg-brn">
      <div className="text-center dark:text-grn text-brn text-2xl font-bold">Welcome {user.username}</div>
      <div className="flex flex-col justify-center items-center mt-10">
        {/* <div className="w-40 h-40 rounded-full overflow-hidden"> */}
          {/* <img src={user.avatar} alt={user.username} className="w-full h-full object-cover"/> */}
        {/* </div> */}
        <div className="mt-5 text-center dark:text-grn text-brn text-xl font-bold">Your Email: {user.email}</div>
      </div>
      <div></div>
    </div>
  )
}

export default Profile