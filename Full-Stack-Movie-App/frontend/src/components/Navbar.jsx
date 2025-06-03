import { useEffect, useState } from 'react'
import logo from "../images/logo.png"
import Avatar from 'react-avatar'
import { useNavigate } from 'react-router-dom'
import { api_base_url } from '../helper'

const Navbar = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const getDetails = () => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setData(data.user);
      } else {
        setError(data.msg);
      }
    })
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleUserLogin = () => {
    navigate('/login');
  };

  const handleAdminLogin = () => {
    navigate('/adminLogin');
  };

  return (
    <>
      <nav className='h-[80px] flex items-center justify-between px-6 sm:px-10 md:px-[100px] bg-black text-white relative'>
        <img className='w-[140px] cursor-pointer' src={logo} alt="Logo" onClick={() => navigate('/')} />

        <div className='flex items-center gap-4'>
          {/* Search Box */}
          <div className="inputBox w-[40vw] max-w-[300px] rounded-[30px] overflow-hidden">
            <input type="text" className='w-full rounded-[30px] pl-[20px] py-[6px] text-black' placeholder='Search Here... !' />
          </div>

          {/* Avatar with Dropdown */}
          <div className="relative">
            <div onClick={() => setDropdownOpen(!dropdownOpen)} className='cursor-pointer'>
              <Avatar round="50%" name={data ? data.name : "U"} size="40" />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-[160px] bg-black text-blue-600 rounded shadow-lg z-10">
                <button onClick={handleUserLogin} className="block w-full text-left px-4 py-2 hover:bg-gray-900">
                  Login
                </button>
                <button onClick={handleAdminLogin} className="block w-full text-left px-4 py-2 hover:bg-gray-900">
                  Admin Login
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar