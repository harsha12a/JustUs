import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import RootLayout from './RootLayout'

function App() {
  const browser = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <HeroSection />
        }
      ]
    }
  ])
  return (
    <RouterProvider router={browser}></RouterProvider>
  )
}

export default App