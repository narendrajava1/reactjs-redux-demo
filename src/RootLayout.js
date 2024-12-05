import { NavLink, Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return(
    <>
    <nav>
      <ul>
        <li><NavLink to="/"> Home</NavLink></li>
        <li><NavLink to="/add-emp">AddEmployee</NavLink></li>
      </ul>
    </nav>
    <Outlet/>
    </>
  )
}
