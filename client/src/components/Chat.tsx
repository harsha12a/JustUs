import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setChat } from '../redux/slices/chatSlice'
import profile from '../assets/profile.png'
function Chat() {
  const user = useSelector((state: any) => state.user.user)
  const chats = useSelector((state: any) => state.chat.chat)
  const dispatch = useDispatch()
  const [currChat, setCurrChat] = useState([])
  useEffect(() => {
    if (user) {
      async function getChat() {
        axios.get(`http://localhost:4000/chat/${user.id}`, {
          withCredentials: true
        }).then((res) => {
          dispatch(setChat(res.data))
        })
          .catch((err) => {
            console.log(err)
          })
      }
      getChat()
    }
  }, [user, dispatch])
  const getChat = async (id: string) => {
    await axios.get(`http://localhost:4000/message/${id}`, { withCredentials: true })
      .then((res) => {
        setCurrChat(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className='flex'>
      <div className='ml-3 flex flex-col gap-5 overflow-y-auto w-[300px] bg-grn dark:bg-brn h-[600px]'>
        {
          chats.map((chat: any) => {
            const other = chat.participants[0].username === user.username ? chat.participants[1] : chat.participants[0];
            return (
              <div key={chat.id} className='flex items-center gap-2 cursor-pointer hover:bg-brn dark:hover:bg-grn rounded-sm p-2 m-2' onClick={() => getChat(chat.id)}>
                <img src={other.profilePic ? other.profilePic : profile} alt="" className='w-10 rounded-full' />
                <div>{other.username}</div>
              </div>
            )
          })
        }
      </div>
      <div>
        {
          currChat.length == 0 ? <div>No Chat Selected</div> : <div>
            {
              currChat.map((chat: any) => {
                return (
                  <div>{chat.content}</div>
                )
              })
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Chat