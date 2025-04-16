import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setChat } from '../redux/slices/chatSlice'
import profile from '../assets/profile.png'
import ChatDetails from './ChatDetails'
import { getMessages } from '../redux/slices/messageSlice'
import { Search } from 'lucide-react'
import { set } from 'react-hook-form'
import socket from '../config/socket'

function Chat() {
  const user = useSelector((state: any) => state.user.user)
  const chats = useSelector((state: any) => state.chat.chat)
  const dispatch = useDispatch()

  const [currChat, setCurrChat] = useState([])
  const [loading, setLoading] = useState(false)
  const [chat, setChats] = useState({})
  const [showChatDetails, setShowChatDetails] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filtered, setFiltered] = useState([])
  const [id, setId] = useState("")
  useEffect(() => {
    if (user) {
      setLoading(true)
      async function getChat() {
        axios.get(`http://localhost:4000/chat/${user.id}/${new Date().getTime()}`, {
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
  useEffect(() => {
    if(user && user.username)
      socket.emit('register', user.username)
    return () => {
      socket.off('register')
    }
  }, [user])
  useEffect(() => {
    if(chats) {
      setFiltered(chats.filter((chat: any) => {
        const other = chat.participants[0].username === user.username ? chat.participants[1] : chat.participants[0]
        return other.username.toLowerCase().includes(searchQuery.toLowerCase())
      }))
    }
  }, [searchQuery, chats, user.username])
  const getChat = async (chat: any) => {
    setLoading(true)
    setChats(chat.participants[0].username === user.username ? chat.participants[1] : chat.participants[0])
    await axios.get(`http://localhost:4000/message/${chat.id}`, { withCredentials: true })
      .then((res) => {
        setCurrChat(res.data)
        dispatch(getMessages(res.data))
        setId(chat.id)
        setShowChatDetails(true)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleBack = () => {
    setShowChatDetails(false)
    setCurrChat([])
    setId("")
  }

  return (
    <div className='flex h-[calc(100vh-65px)]'>

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 bg-black/30 dark:bg-white/30 flex items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
        </div>
      )}

      {/* Chat list sidebar */}
      <div className={`flex-col overflow-y-auto sm:w-[350px] sm:flex w-full ${showChatDetails ? 'hidden' : 'flex'} border-r-2 border-gray-500`}>
        <div className="flex bg-gray-600 px-5 items-center">
          <Search className="mr-3" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-3 bg-transparent border-none outline-none w-full"
          />
        </div>

        {
          filtered.length !== 0 ? (
            <div>
              {filtered.map((chat: any) => {
                const other = chat.participants[0].username === user.username ? chat.participants[1] : chat.participants[0]
                return (
                  <div
                    key={chat.id}
                    className='flex items-center gap-5 cursor-pointer dark:hover:bg-brn hover:bg-grn rounded-sm p-2 m-2'
                    onClick={() => getChat(chat)}
                  >
                    <img src={other.profilePic || profile} alt="" className='ml-3 w-10 rounded-full' />
                    <div className='text-xl'>{other.username}</div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div>No Chats</div>
          )
        }

      </div>

      {/* Chat details panel */}
      <div className={`flex-grow ${showChatDetails ? 'block' : 'hidden'} sm:block`}>
        {
          currChat.length !== 0 ? (
            <ChatDetails chat={chat} id={id} onBack={handleBack} />
          ) : (
            <div className='flex justify-center items-center h-full text-2xl'>No Chat Selected</div>
          )
        }
      </div>
    </div>
  )
}

export default Chat
