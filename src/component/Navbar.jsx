import React from 'react'
const Navbar = () => {


  const handleLogin = () => {
    window.location.href = "http://localhost:5174";
  };


  return (
    <nav className='bg-slate-800 text-white text-2xl '>
      <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">
        <a href="#">
          <div className='logo font-bold text-white '>
            <span className='text-green-500'>&lt;</span>
            Pass
            <span className='text-green-500'>Safe/&gt;</span>
          </div>

        </a>

        {/* Login Button */} 
        
        <button onClick={handleLogin} className="rounded-full bg-green-700 px-5 py-2 text-base font-bold text-white ring-1 ring-white transition-all duration-200 hover:bg-green-600 active:scale-95" > Login With Google
          </button>


      </div>
    </nav>
  )
}

export default Navbar
