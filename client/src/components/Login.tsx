import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../redux/slices/userSlice'
import { useState } from 'react'
import useNotify from '../hooks/useNotify'
import { useNavigate, useLocation } from 'react-router-dom'
function Login() {
  const { register, watch, handleSubmit, formState: { errors: err } } = useForm()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const notify = useNotify()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/chat'
  // const user = useSelector((state: object) => state.user)
  const handleForm = (obj: object) => {
    setLoading(true)
    axios.post('https://justus-8qo2.onrender.com/user/login', obj, {
      withCredentials: true
    })
      .then((res) => {
        dispatch(login(res.data.resp))
        notify.success(res.data.message)
        navigate(from, { replace: true })
      })
      .catch((err) => {
        console.log(err)
        notify.error(err.response.data.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <div className='flex flex-col items-center justify-center h-[90vh] mx-5'>
      {loading && (
        <div className="fixed inset-0 bg-black/30 dark:bg-white/30 flex items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
        </div>
      )}

      <form onSubmit={handleSubmit(handleForm)} className='mx-5 py-20 flex flex-col justify-between items-center sm:w-[500px] w-full bg-gray-200 dark:bg-gray-900 p-5'>
        <div className='text-3xl font-semibold mb-20'>Login</div>
        <div className='flex flex-col gap-1 sm:w-[70%] w-full'>
          {/* <label htmlFor='username'>Username</label> */}
          <div className="relative w-full mb-10">
            <input
              type="text"
              {...register('username', { required: true })}
              // placeholder=" "
              className={`peer p-4 px-5 w-full bg-transparent border rounded-sm focus:outline-none focus:border-black dark:focus:border-white border-black dark:border-white`}
              id="username"
            />
            <div className={`pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-200 peer-focus:top-0 bg-gray-200 dark:bg-gray-900 px-1 peer-focus:text-sm ${watch('username') ? 'top-[0px] text-sm' : ''} text-lg`}>
              Username
            </div>
            {/* <div className={`bg-black dark:bg-white peer-focus:w-0 h-[1px] absolute top-3/4 mx-5 ${details.username ? 'w-0' : 'w-[180px] sm:w-[500px]'}`}></div> */}

          </div>

          {err.username && <span className='text-red-500'>*This field is required</span>}
        </div>
        <div className='flex flex-col gap-1 sm:w-[70%] w-full mb-20'>
          {/* <label htmlFor='password'>Password</label> */}
          <div className="relative w-full">
            <input
              type="password"
              {...register('password', { required: true })}
              // placeholder=" "
              className={`peer p-4 px-5 w-full bg-transparent border rounded-sm focus:outline-none focus:border-black dark:focus:border-white border-black dark:border-white`}
              id="password"
            />
            <div className={`pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-200 peer-focus:top-0 bg-gray-200 dark:bg-gray-900 px-1 peer-focus:text-sm ${watch('password') ? 'top-[0px] text-sm' : ''} text-lg`}>
              Password
            </div>
            {/* <div className={`bg-black dark:bg-white peer-focus:w-0 h-[1px] absolute top-3/4 mx-5 ${details.password ? 'w-0' : 'w-[180px] sm:w-[500px]'}`}></div> */}

          </div>
          {err.password && <span className='text-red-500'>*This field is required</span>}
        </div>
        <button type="submit" className='bg-blue-500 text-white w-fit px-5 py-2 hover:bg-blue-600 rounded-sm'>Login</button>
      </form>
    </div>
  )
}

export default Login