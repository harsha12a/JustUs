import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import RootLayout from './RootLayout'
import Login from './components/Login'
import SignUp from './components/SignUp'

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
        }
      ]
    }
  ])
  return (
    <RouterProvider router={browser}></RouterProvider>
  )
}

export default App