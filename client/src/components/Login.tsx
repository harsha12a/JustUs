import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../redux/slices/userSlice'
function Login() {
  const { register, handleSubmit, formState: { errors: err } } = useForm()
  const dispatch = useDispatch()
  // const user = useSelector((state: object) => state.user)
  const handleForm = (obj: object) => {
    axios.post('http://localhost:4000/user/login', obj, {
      withCredentials: true
    })
    .then((res) => {
      dispatch(login(res.data.resp))
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return (
    <div className='flex flex-col items-center justify-center h-[90vh] bg-gray-100 dark:bg-black dark:text-white'>
      <form onSubmit={handleSubmit(handleForm)} className='flex flex-col gap-2 justify-between items-center sm:w-[300px] w-[250px] bg-gray-200 dark:bg-gray-900 p-5'>
        <div className='text-3xl font-semibold'>Login</div>
        <div className='flex flex-col gap-1 w-full'>
          <label htmlFor='username'>Username</label>
          <input type="text" {...register('username', { required: true })} className='p-2 rounded-md' id="" />
          {err.username && <span className='text-red-500'>*This field is required</span>}
        </div>
        <div className='flex flex-col gap-1 w-full'>
          <label htmlFor='password'>Password</label>
          <input type="password" {...register('password', { required: true })} className='p-2 rounded-md' id="" />
          {err.password && <span className='text-red-500'>*This field is required</span>}
        </div>
        <button type="submit" className='bg-blue-500 text-white w-fit px-5 py-1 rounded-[2px]'>Login</button>
      </form>
    </div>
  )
}

export default Login