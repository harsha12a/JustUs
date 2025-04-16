import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setChat } from '../redux/slices/chatSlice'
import profile from '../assets/profile.png'
import ChatDetails from './ChatDetails'
function Chat() {
  const user = useSelector((state: any) => state.user.user)
  const chats = useSelector((state: any) => state.chat.chat)
  const dispatch = useDispatch()
  const [currChat, setCurrChat] = useState([])
  const [loading, setLoading] = useState(false)
  const [chat, setChats] = useState({})
  useEffect(() => {
    if (user) {
      setLoading(true)
      async function getChat() {
        axios.get(`http://localhost:4000/chat/${user.id}`, {
          withCredentials: true
        }).then((res) => {
          dispatch(setChat(res.data))
        })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            setLoading(false)
          })
      }
      getChat()
    }
  }, [user, dispatch])
  const getChat = async (chat: any) => {
    setLoading(true)
    setChats(chat.participants[0].username === user.username ? chat.participants[1] : chat.participants[0]);
    await axios.get(`http://localhost:4000/message/${chat.id}`, { withCredentials: true })
      .then((res) => {
        setCurrChat(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <div className='flex'>
      {loading && (
        <div className="fixed inset-0 bg-black/30 dark:bg-white/30 flex items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
        </div>
      )}
      <div className='m-3 flex-col overflow-y-auto sm:w-[350px] sm:flex w-full bg-grn dark:bg-brn h-[calc(100vh-80px)]'>
        {
          chats.map((chat: any) => {
            const other = chat.participants[0].username === user.username ? chat.participants[1] : chat.participants[0];
            return (
              <div key={chat.id} className='flex items-center gap-2 cursor-pointer hover:bg-brn dark:hover:bg-grn rounded-sm p-2 m-2' onClick={() => getChat(chat)}>
                <img src={other.profilePic ? other.profilePic : profile} alt="" className='w-10 rounded-full' />
                <div>{other.username}</div>
              </div>
            )
          })
        }
      </div>
      <div className='flex-grow mr-2 hidden sm:block'>
      {
        currChat.length !== 0 ? 
          <div className=''>
            <ChatDetails currChat={currChat} chat={chat} />
          </div> : 
          <div className='flex justify-center items-center h-[calc(100vh-80px)] text-2xl'>No Chat Selected</div>
      }
      </div>
    </div>
  )
}

export default Chat