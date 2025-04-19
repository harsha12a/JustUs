import { useState } from "react"
import useNotify from "../hooks/useNotify"
import axios from "axios"
import { useSelector } from "react-redux"
function NewChatDialog({ setDialog, onClose }: any) {
  const notify = useNotify()
  const [input, setInput] = useState('')
  const user = useSelector((state: any) => state.user.user)
  const [loading, setLoading] = useState(false);
  const handleInp = () => {
    setInput('')
    axios.post('https://just-us-server.vercel.app/chat', { inviter: user.username, invitee: input }, { withCredentials: true })
      .then(res => {
        setDialog(false)
        notify.success('Chat started successfully')
        console.log(res)
        onClose()
      })
      .catch(err => notify.error(err.response.data.message))
      .finally(() => setLoading(false))
  }
  const handleSubmit = () => {
    if (!input) return notify.error('Please enter a username')
    setLoading(true)
    notify.confirm(`Are you sure you want to start a new chat with ${input}?`, handleInp, () => { })
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {loading && (
        <div className="fixed inset-0 bg-black/30 dark:bg-white/30 flex items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
        </div>
      )}
      <div className="bg-white dark:bg-brn p-6 rounded-lg w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Start a New Chat</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter username"
          className="w-full border text-black border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-green-500"
        />
        <div className="flex justify-end mt-4 gap-2 text-black">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => setDialog(false)}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleSubmit}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewChatDialog