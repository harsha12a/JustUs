import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../redux/slices/userSlice'
import { useState } from 'react'
import useNotify from '../hooks/useNotify'
import { useNavigate } from 'react-router-dom'
function Login() {
  const { register, handleSubmit, formState: { errors: err } } = useForm()
  const [loading, setLoading] = useState(false)
  const [details,setDetails] = useState({})
  const dispatch = useDispatch()
  const notify = useNotify()
  const navigate = useNavigate()
  // const user = useSelector((state: object) => state.user)
  const handleForm = (obj: object) => {
    setLoading(true)
    axios.post('http://localhost:4000/user/login', obj, {
      withCredentials: true
    })
      .then((res) => {
        setLoading(false)
        dispatch(login(res.data.resp))
        notify.success(res.data.message)
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className='flex flex-col items-center justify-center h-[90vh] bg-gray-100 dark:bg-black dark:text-white'>
      {loading && (
        <div className="fixed inset-0 bg-black/30 dark:bg-white/30 flex items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
        </div>
      )}


      <form onSubmit={handleSubmit(handleForm)} className='flex flex-col gap-10 justify-between items-center sm:w-[600px] w-[250px] bg-gray-200 dark:bg-gray-900 p-5'>
        <div className='text-3xl font-semibold'>Login</div>
        <div className='flex flex-col gap-1 w-full'>
          {/* <label htmlFor='username'>Username</label> */}
          <div className="relative w-full">
            <input
              type="text"
              {...register('username', { required: true })}
              // placeholder=" "
              className={`peer p-2 px-5 w-full bg-transparent border rounded-sm focus:outline-none focus:border-black dark:focus:border-white border-black dark:border-white`}
              id="username"
              onChange={(e) => {setDetails({...details, username: e.target.value})}}
            />
            <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-200 peer-focus:top-0 bg-gray-200 dark:bg-gray-900 px-1 peer-focus:text-sm ${details.username ? 'top-[0px] text-sm' : ''} text-lg`}>
              Enter username
            </div>
            {/* <div className={`bg-black dark:bg-white peer-focus:w-0 h-[1px] absolute top-3/4 mx-5 ${details.username ? 'w-0' : 'w-[180px] sm:w-[500px]'}`}></div> */}

          </div>

          {err.username && <span className='text-red-500'>*This field is required</span>}
        </div>
        <div className='flex flex-col gap-1 w-full'>
          {/* <label htmlFor='password'>Password</label> */}
          <div className="relative w-full">
            <input
              type="password"
              {...register('password', { required: true })}
              // placeholder=" "
              className={`peer p-2 px-5 w-full bg-transparent border rounded-sm focus:outline-none focus:border-black dark:focus:border-white border-black dark:border-white`}
              id="username"
              onChange={(e) => {setDetails({...details, password: e.target.value})}}
            />
            <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-200 peer-focus:top-0 bg-gray-200 dark:bg-gray-900 px-1 peer-focus:text-sm ${details.password ? 'top-[0px] text-sm' : ''} text-lg`}>
              Enter password
            </div>
            {/* <div className={`bg-black dark:bg-white peer-focus:w-0 h-[1px] absolute top-3/4 mx-5 ${details.password ? 'w-0' : 'w-[180px] sm:w-[500px]'}`}></div> */}

          </div>
          {err.password && <span className='text-red-500'>*This field is required</span>}
        </div>
        <button type="submit" className='bg-blue-500 text-white w-fit px-5 py-1 rounded-[2px]'>Login</button>
      </form>
    </div>
  )
}

export default Login