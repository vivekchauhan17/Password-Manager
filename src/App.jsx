import './App.css'
import Navbar from './component/Navbar'
import Manager from './component/Manager'
import Footer from './component/footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <div className='bg-green-50 bg-[linear-gradient(to_bottom,#8080800a_1px,transparent_1px),linear-gradient(to_right,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'>

        <Routes>
          <Route path="/" element={<Manager />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </div>

      <Footer />

    </BrowserRouter>
  )
}

export default App