import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './RootLayout'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { ToastContainer } from 'react-toastify'
import Profile from './components/Profile'
import Chat from './components/Chat'
import NotFound from './components/NotFound'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const browser = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Home />
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
          element: <ProtectedRoute />,
          children: [
            {
              path: 'chat',
              element: <Chat />
            },
            {
              path: 'profile',
              element: <Profile />
            },
          ]
        },
        {
          path: '*',
          element: <NotFound />
        }
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