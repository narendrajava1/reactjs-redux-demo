import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { RootLayout } from './RootLayout'
import EmployeeList from './components/EmployeeList'
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <EmployeeList />,
      },
    ],
  },
])
function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <h2>Employee Management</h2>
    </div>
  )
}

export default App
