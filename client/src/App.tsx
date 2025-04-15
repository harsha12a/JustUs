import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import RootLayout from './RootLayout'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { ToastContainer } from 'react-toastify'
import Profile from './components/Profile'
import Chat from './components/Chat'

function App() {
  const browser = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <HeroSection />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'signup',
          element: <SignUp />
        },
        {
          path: 'chat',
          element: <Chat />
        },
        {
          path: 'profile',
          element: <Profile />
        },
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={browser} />
      <ToastContainer 
        position='top-center'
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        theme='colored'
      />
    </>
  )
}

export default App