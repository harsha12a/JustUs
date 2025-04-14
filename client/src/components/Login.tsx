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


      <form onSubmit={handleSubmit(handleForm)} className='flex flex-col gap-2 justify-between items-center sm:w-[300px] w-[250px] bg-gray-200 dark:bg-gray-900 p-5'>
        <div className='text-3xl font-semibold'>Login</div>
        <div className='flex flex-col gap-1 w-full'>
          <label htmlFor='username'>Username</label>
          <input type="text" {...register('username', { required: true })} className='p-2 rounded-md text-black' id="" />
          {err.username && <span className='text-red-500'>*This field is required</span>}
        </div>
        <div className='flex flex-col gap-1 w-full'>
          <label htmlFor='password'>Password</label>
          <input type="password" {...register('password', { required: true })} className='p-2 rounded-md text-black' id="" />
          {err.password && <span className='text-red-500'>*This field is required</span>}
        </div>
        <button type="submit" className='bg-blue-500 text-white w-fit px-5 py-1 rounded-[2px]'>Login</button>
      </form>
    </div>
  )
}

export default Login