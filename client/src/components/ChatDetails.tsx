import EmojiPicker, { Theme } from "emoji-picker-react";
import { ArrowLeft, Send, Smile, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import socket from "../config/socket";
import profile from '../assets/profile.png'
import useNotify from "../hooks/useNotify";

function ChatDetails({ chat, id, onBack }: any) {
  const user = useSelector((state: any) => state.user.user);
  const msg = useSelector((state: any) => state.message.message);
  const [messages, setMessages] = useState(msg)
  const [text, setText] = useState("");
  const [picker, setPicker] = useState(false);
  const notify = useNotify()
  const updateEmoji = (emoji: any) => {
    setText(text => text + emoji.emoji);
  }
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    setMessages(msg)
  }, [id, msg])
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  useEffect(() => {
    socket.on('receieveMsg', (msg: any) => {
      setMessages((prev: any) => [...prev, msg])
    })
    socket.on('messageDeleted', (id: any) => {
      setMessages((prev: any) => prev.filter((msg: any) => msg.id !== id.id))
    })
    socket.on('messageSent', (msg: any) => {
      setMessages((prev: any) => [...prev, msg])
    })
    return () => {
      socket.off('receieveMsg')
      socket.off('messageSent')
      socket.off('messageDeleted')
    }
  })
  const handleDelete = (id: string, senderId: string) => {
    if(user.id !== senderId) return
    notify.confirm('Are you sure you want to delete this message?', () => {
      socket.emit('deleteMsg', { id, receiver: chat.username, sender: user.username })
    }, () => {})
  }
  const handleMessage = (e: any) => {
    if (e.shiftKey) return;
    e.preventDefault()
    setText("")
    setPicker(false)
    socket.emit('sendMsg', { chatId: id, senderId: user.id, receiverUsername: chat.username, content: text })
  }
  return (
    <div className="relative h-[calc(100vh-60px)] flex flex-col">
      <nav className="bg-grn dark:bg-brn w-full p-4 font-semibold flex items-center justify-between">
        <button className="sm:hidden text-lg mr-6" onClick={onBack}><ArrowLeft /></button>
        <img src={chat?.profilePic || profile} width={40} className="rounded-full" alt="" />
        <span className="mx-auto">{chat?.username}</span>
      </nav>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {(() => {
          const today = new Date().toDateString();
          let todayLabelInserted = false;

          return messages.map((msg: any) => {
            const isToday = new Date(msg.createdAt).toDateString() === today;
            const showTodayLabel = isToday && !todayLabelInserted;

            if (showTodayLabel) todayLabelInserted = true;

            return (
              <div key={msg.id}>
                {showTodayLabel && (
                  <div className="text-center text-sm rounded-md bg-gray-700 text-white w-fit mx-auto px-3 py-1 my-2">Today</div>
                )}
                <div
                  className={`flex ${msg.senderId === user.id ? "justify-end" : "justify-start"}`}
                >
                  <div className="relative group">
                  <div
                    className={`max-w-xs px-4 py-2 rounded-md break-words ${msg.senderId === user.id
                        ? "bg-green-500 text-white ml-auto"
                        : "bg-gray-300 text-black mr-auto"
                      }`}
                  >
                    <p>{msg.content}</p>
                    {msg.createdAt && (
                      <p className="text-[8px] text-right opacity-70">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                  <span className={`${msg.senderId !== user.id ? 'group-hover:hidden' : '-left-4' } hidden group-hover:block absolute top-1 cursor-pointer`} onClick={() => handleDelete(msg.id, msg.senderId)}><Trash2 className="text-red-500" size={16} /></span>
                  </div>
                </div>
              </div>
            );
          });
        })()}


        <div ref={bottomRef} />
      </div>
      {
        picker && <div className="absolute left-2 bottom-16">
          <EmojiPicker className="" onEmojiClick={updateEmoji} theme={localStorage.getItem('theme') === 'dark' ? 'dark' as Theme : 'light' as Theme} />
        </div>
      }
      {/* Message Input Area */}
      <div className="flex border-t pr-5 items-center transition-all duration-200 gap-2 border-gray-700 dark:border-gray-300 p-2">
        <button className="hover:scale-110" onClick={() => setPicker(!picker)}>
          <Smile />
        </button>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleMessage(e)}
          className="w-full overflow-y-scroll scrollbar-none bg-transparent rounded-md p-2 focus:outline-none resize-none"
          placeholder="Type a message..."
          rows={1}
        />
        <button className="hover:scale-110 text-blue-700" onClick={handleMessage}>
          <Send />
        </button>
      </div>
    </div>
  );
}

export default ChatDetails;
