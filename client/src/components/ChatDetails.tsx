import EmojiPicker from "emoji-picker-react";
import { ArrowLeft, Send, Smile } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

function ChatDetails({ chat, onBack }: any) {
  const user = useSelector((state: any) => state.user.user);
  const messages = useSelector((state: any) => state.message.message);
  const [text, setText] = useState("");
  const [picker, setPicker] = useState(false);
  const updateEmoji = (emoji: any) => {
    setText(text => text + emoji.emoji);
  }
  const handleMessage = (e) => {
    if(e.shiftKey) return;
    e.preventDefault()
    setText("")
    setPicker(false)
    console.log(text)
  }
  return (
    <div className="relative h-[calc(100vh-60px)] flex flex-col">
      <nav className="bg-grn dark:bg-brn w-full p-4 font-semibold flex items-center justify-between">
        <button className="sm:hidden text-lg" onClick={onBack}><ArrowLeft /></button>
        <span className="mx-auto">{chat?.username}</span>
      </nav>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((msg: any) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === user.id ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-md break-words ${msg.senderId === user.id
                  ? "bg-green-500 text-white ml-auto"
                  : "bg-gray-300 text-black mr-auto"
                }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      {
        picker && <div className="absolute left-2 bottom-16">
          <EmojiPicker className="" onEmojiClick={updateEmoji} theme={localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'} />
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
