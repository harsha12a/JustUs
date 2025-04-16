import { useSelector } from "react-redux"
function ChatDetails({ currChat, chat }: any) {
    const user = useSelector((state: any) => state.user.user)
    return (
        <div className="relative h-[calc(100vh-120px)]">
            <nav className="bg-gray-400 my-3 w-full">
                {chat.username}
            </nav>
            <div className="relative h-full">
                <div className="absolute bottom-20 w-full">
                    {
                        currChat.map((chat: any) => {
                            return (
                                <div key={chat.id} className={`${chat.senderId === user.id ? 'right-0' : 'left-0'}`}>
                                    {chat.content}
                                </div>
                            )
                        })
                    }
                </div>
                <textarea
                    name=""
                    id=""
                    className="all-[unset] absolute bottom-0 dark:shadow-[0px_-2px_5px_0px_#d1d5db] shadow-[0px_-2px_5px_0px_#111827] bg-transparent w-full p-4 rounded-lg focus:outline-none transition-all"
                    placeholder="Type a message..."
                    rows={1}
                />
            </div>
        </div>
    )
}

export default ChatDetails
