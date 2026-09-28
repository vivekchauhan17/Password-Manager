import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      try {
        // Decode JWT
        const payload = JSON.parse(atob(token.split(".")[1]));

        // Save user
        setUser(payload);

        // Save token
        localStorage.setItem("token", token);

        // Remove ?token=... from URL
        window.history.replaceState({}, document.title, "/");
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      // Check if user is already logged in
      const savedToken = localStorage.getItem("token");

      if (savedToken) {
        try {
          const payload = JSON.parse(
            atob(savedToken.split(".")[1])
          );

          setUser(payload);
        } catch (error) {
          console.error("Invalid saved token:", error);
          localStorage.removeItem("token");
        }
      }
    }
  }, []);

  // Go to login page
  const handleLogin = () => {
    window.location.href = "http://localhost:5174";
  };

  // Sign out
  const handleLogout = () => {
    // Remove JWT
    localStorage.removeItem("token");

    // Remove user from state
    setUser(null);

    // Close dropdown
    setDropdownOpen(false);

    // Redirect to main app
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
          <button
            onClick={handleLogin}
            className="rounded-full bg-green-700 px-5 py-2 text-base font-bold text-white ring-1 ring-white transition-all duration-200 hover:bg-green-600 active:scale-95"
          >
            Login With Google
          </button>
        ) : (
          <div className="relative">

            {/* Name Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="rounded-full bg-green-700 px-5 py-2 text-base font-bold text-white ring-1 ring-white transition-all duration-200 hover:bg-green-600 active:scale-95"
            >
              {user.name}
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-2 text-base text-gray-800 shadow-lg">

                {/* Name - does nothing */}
                <div className="cursor-default px-4 py-2 font-semibold">
                  {user.name}
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