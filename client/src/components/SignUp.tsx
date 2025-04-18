import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useNotify from '../hooks/useNotify'

function Signup() {
  const { register, watch, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const notify = useNotify()

  const handleForm = (data: any) => {
    if (data.password !== data.confirmPassword) {
      return notify.error("Passwords do not match")
    }

    setLoading(true)
    delete data.confirmPassword
    axios.post('http://localhost:4000/user', data, {
      withCredentials: true
    })
      .then((res) => {
        notify.success(res.data.message)
        navigate('/login')
      })
      .catch((err) => {
        console.log(err)
        notify.error(err.response?.data?.message || 'Signup failed')
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
      <form onSubmit={handleSubmit(handleForm)} className='mx-5 py-10 flex flex-col justify-between items-center sm:w-[500px] w-full bg-gray-200 dark:bg-gray-900 p-5'>
        <div className='text-3xl font-semibold mb-10'>Signup</div>

        {/* Email */}
        <div className='flex flex-col gap-1 sm:w-[70%] w-full mb-5'>
          <div className="relative w-full">
            <input
              type="email"
              {...register('email', { required: true })}
              className="peer p-4 px-5 w-full bg-transparent border rounded-sm focus:outline-none border-black dark:border-white focus:border-black dark:focus:border-white"
              id="email"
            />
            <div className={`pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-200 peer-focus:top-0 bg-gray-200 dark:bg-gray-900 px-1 peer-focus:text-sm ${watch('email') ? 'top-[0px] text-sm' : ''} text-lg`}>
              Email
            </div>
          </div>
          {errors.email && <span className='text-red-500'>*This field is required</span>}
        </div>

        {/* Username */}
        <div className='flex flex-col gap-1 sm:w-[70%] w-full mb-5'>
          <div className="relative w-full">
            <input
              type="text"
              {...register('username', { required: true })}
              className="peer p-4 px-5 w-full bg-transparent border rounded-sm focus:outline-none border-black dark:border-white focus:border-black dark:focus:border-white"
              id="username"
            />
            <div className={`pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-200 peer-focus:top-0 bg-gray-200 dark:bg-gray-900 px-1 peer-focus:text-sm ${watch('username') ? 'top-[0px] text-sm' : ''} text-lg`}>
              Username
            </div>
          </div>
          {errors.username && <span className='text-red-500'>*This field is required</span>}
        </div>

        {/* Password */}
        <div className='flex flex-col gap-1 sm:w-[70%] w-full mb-5'>
          <div className="relative w-full">
            <input
              type="password"
              {...register('password', { required: true })}
              className="peer p-4 px-5 w-full bg-transparent border rounded-sm focus:outline-none border-black dark:border-white focus:border-black dark:focus:border-white"
              id="password"
            />
            <div className={`pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-200 peer-focus:top-0 bg-gray-200 dark:bg-gray-900 px-1 peer-focus:text-sm ${watch('password') ? 'top-[0px] text-sm' : ''} text-lg`}>
              Password
            </div>
          </div>
          {errors.password && <span className='text-red-500'>*This field is required</span>}
        </div>

        {/* Confirm Password */}
        <div className='flex flex-col gap-1 sm:w-[70%] w-full mb-5'>
          <div className="relative w-full">
            <input
              type="password"
              {...register('confirmPassword', { required: true })}
              className="peer p-4 px-5 w-full bg-transparent border rounded-sm focus:outline-none border-black dark:border-white focus:border-black dark:focus:border-white"
              id="confirmPassword"
            />
            <div className={`pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-200 peer-focus:top-0 bg-gray-200 dark:bg-gray-900 px-1 peer-focus:text-sm ${watch('confirmPassword') ? 'top-[0px] text-sm' : ''} text-lg`}>
              Confirm Password
            </div>
          </div>
          {errors.confirmPassword && <span className='text-red-500'>*This field is required</span>}
        </div>

        {/* Profile URL */}
        <div className='flex flex-col gap-1 sm:w-[70%] w-full mb-10'>
          <div className="relative w-full">
            <input
              type="url"
              {...register('profilePic')}
              className="peer p-4 px-5 w-full bg-transparent border rounded-sm focus:outline-none border-black dark:border-white focus:border-black dark:focus:border-white"
              id="profilePic"
            />
            <div className={`pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-200 peer-focus:top-0 bg-gray-200 dark:bg-gray-900 px-1 peer-focus:text-sm ${watch('profilePic') ? 'top-[0px] text-sm' : ''} text-lg`}>
              Profile Photo Url
            </div>
          </div>
        </div>

        <button type="submit" className='bg-blue-500 text-white w-fit px-5 py-2 hover:bg-blue-600 rounded-sm'>Signup</button>
      </form>
    </div>
  )
}

export default Signup
