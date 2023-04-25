import { Outlet } from "react-router-dom"
import { NavBar } from "./components/NavBar"
import './App.css'

function App() {
  return (
   <div className='App'>
      <NavBar/>
      <Outlet/>
    </div>
  )
}

export default App