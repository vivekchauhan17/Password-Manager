import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Read JWT and set user
  const loadUser = () => {
    const token = localStorage.getItem("token");

    console.log("Navbar token:", token);

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      console.log("Navbar user:", payload);

      setUser(payload);
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    // Check localStorage when Navbar loads
    loadUser();

    // Handle Google login token from URL
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      try {
        const payload = JSON.parse(atob(urlToken.split(".")[1]));

        console.log("Google login user:", payload);

        // Save Google token
        localStorage.setItem("token", urlToken);

        // Set user
        setUser(payload);

        // Remove token from URL
        window.history.replaceState({}, document.title, "/");
      } catch (error) {
        console.error("Invalid Google token:", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  // Go to login page
  const handleLogin = () => {
    window.location.href = "http://localhost:5174";
  };

  // Sign out
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setDropdownOpen(false);

    window.location.href = "http://localhost:5173";
  };

  return (
    <nav className="bg-slate-800 text-white text-2xl">
      <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">

        {/* Logo */}
        <a href="#">
          <div className="logo font-bold text-white">
            <span className="text-green-500">&lt;</span>
            Pass
            <span className="text-green-500">Safe/&gt;</span>
          </div>
        </a>

        {/* Login / User */}
        {!user ? (

          // <img
          //  className="flex p-1 h-9 w-9 "
          //  src="/icons/google-icon.png" alt="Google" />
          <button
            onClick={handleLogin}
            className="flex items-center gap-2 rounded-full bg-green-700 px-5 py-2 text-base font-bold text-white ring-1 ring-white transition-all duration-200 hover:bg-green-600 active:scale-95"

          >

            <img 
            src="/icons/google-icon.png"
            alt="google"
            className="h-5 w-5"
            
            />


            Login With Google
          </button>
        ) : (
          <div className="relative">

            {/* Name Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="rounded-full bg-green-700 px-5 py-2 text-base font-bold text-white ring-1 ring-white transition-all duration-200 hover:bg-green-600 active:scale-95"
            >
              {user.name || user.email}
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-2 text-base text-gray-800 shadow-lg">

                {/* Name */}
                <div className="cursor-default px-4 py-2 font-semibold">
                  {user.name || "User"}
                </div>

                {/* Email */}
                <div className="px-4 pb-2 text-sm text-gray-500">
                  {user.email}
                </div>

                {/* Sign out */}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </button>

              </div>
            )}
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
