import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Manager from './component/Manager'
import Footer from './component/footer'
import Login from './component/Login'


// import Login from './component/login'

function App() {

  const [count, setCount] = useState(0)
  const [token, setToken] = useState(localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null)

  if (!token) {
    return (<>
      <Login token={token} setToken={setToken} />
    </>)

  }

  return (
    <>
      <Navbar />
      {/* <Login /> */}
      <div className='bg-green-50 bg-[linear-gradient(to_bottom,#8080800a_1px,transparent_1px),linear-gradient(to_right,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'>
        <Manager />
      </div>
      <Footer />
    </>



  )
}

export default App
