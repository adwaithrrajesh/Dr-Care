import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Header = () => {

  const [dropdown,setDropdown] = useState(false)

  const navigate = useNavigate()

  
  const token = JSON.parse(localStorage.getItem("clientToken"));



  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };


  return (


    <nav className="bg-gray-100 border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      
      
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">

        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
           <img src={logo} onClick={()=>navigate('/')} class="h-10  sm:h-10 block" alt="Dr Care logo" />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden">
            <button
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:text-gray-500 transition duration-300 ease-in-out"
            >
              <svg
                className={`h-6 w-6 ${isOpen ? 'transform rotate-180' : ''}`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
    <div className="hidden sm:flex sm:items-center sm:ml-6 mt-8 ">
          <ul class="flex flex-col p-2 mt-1  border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8  md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-gray-100 dark:bg-white md:dark:bg-white-900 dark:border-gray-700">
         <li>
           <Link
              to={'/'}
              className="px-3 py-2 rounded-md text-bold font-medium text-cyan-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:text-cyan-900 transition duration-300 ease-in-out">
              Home
            </Link>
        </li>
        <li>
           <Link
              to={'/about'}
              className="px-3 py-2 rounded-md text-bold font-medium text-cyan-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:text-cyan-900 transition duration-300 ease-in-out">
              About
            </Link>
        </li>

        <li>
           <Link
              to={'/departments'}
              className="px-3 py-2 rounded-md text-bold font-medium text-cyan-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:text-cyan-900 transition duration-300 ease-in-out">
              Departments
            </Link>
        </li>

        <li>
           <Link
              to={'/doctors'}
              className="px-3 py-2 rounded-md text-bold font-medium text-cyan-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:text-cyan-900 transition duration-300 ease-in-out">
              Doctors
            </Link>
        </li>

    
     <li>
                {
                 token ?
                 <div onClick={()=>{setDropdown(!dropdown)}} to={'/login'} className='mb-7 h-8'>
                 <img src='https://icon-library.com/images/windows-user-icon/windows-user-icon-14.jpg'  class="pb-1 rounded-full h-8" alt="" />
               </div>
                :
                <Link to={'/login'}
                className="px-3 py-2 rounded-md text-bold font-medium text-cyan-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:text-cyan-900 transition duration-300 ease-in-out">
                Login
              </Link>
                }

                {/* Drop down */}
    
    {dropdown && <>
    <div class="relative" data-te-dropdown-ref>
      <ul
          class="absolute left-auto right-0 z-[1000] float-left m-0 mt-1  min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg"
          aria-labelledby="dropdownMenuButton1"
          data-te-dropdown-menu-ref>

            
          <li className="hover:bg-blue-100">
            <Link
            to={'/profile'}
              class="block w-full whitespace-nowrap  bg-transparent px-4 py-2 text-sm font-normal text-black hover:bg-neutral-100 active:text-blue-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
              data-te-dropdown-item-ref>         
              <div className="inline-flex">
              <img src='https://icon-library.com/images/windows-user-icon/windows-user-icon-14.jpg' className="rounded-full h-6 mr-3"  alt="" />
              <p className="text-cyan-800 font-medium text-base">View Profile</p>
                </div>     
              </Link>
          </li>

          <li className="hover:bg-blue-100">
            <Link to={'/chatList'}
              class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-black hover:bg-neutral-100 active:text-blue-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
              data-te-dropdown-item-ref>         
              <div className="inline-flex">
              <img src='https://cdn-icons-png.flaticon.com/512/134/134914.png' className="h-6 mr-3" alt="" />
              <p className="text-cyan-800 font-medium text-base">Chat</p>
                </div>     
              </Link>
          </li>

          <li className="hover:bg-blue-100">
            <Link to={'/appointments'}
              class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-black hover:bg-neutral-100 active:text-blue-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
              data-te-dropdown-item-ref>         
              <div className="inline-flex">
              <img src='https://cdn-icons-png.flaticon.com/512/2764/2764452.png' className="h-6 mr-3" alt="" />
              <p className="text-cyan-800 font-medium text-base">Appointments</p>
                </div>     
              </Link>
          </li>

          <li className="hover:bg-blue-100">
            <Link to={'/wallet'}
              class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-black hover:bg-neutral-100 active:text-blue-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
              data-te-dropdown-item-ref>         
              <div className="inline-flex">
              <img src='https://www.kindpng.com/picc/m/421-4213376_credit-wallet-png-icon-transparent-png.png' className="h-6 mr-3" alt="" />
              <p className="text-cyan-800 font-medium text-base">Wallet</p>
                </div>     
              </Link>
          </li>


          <li className="hover:bg-blue-100" onClick={()=>{localStorage.clear(); navigate('/login') }}>
            <Link
              class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-black hover:bg-neutral-100 active:text-blue-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
              data-te-dropdown-item-ref>         
              <div className="inline-flex">
              <img src='https://img.freepik.com/free-icon/logout_318-385171.jpg' className="h-6 mr-3" alt="" />
              <p className="text-cyan-800 font-medium text-base">Logout</p>
                </div>     
              </Link>
          </li>
        </ul>
      </div>


      

      </>
    }
             
              </li>
        
        
    </ul>
           

              
            {/* Add more menu items here */}
          </div>
        </div>
      </div>

      {/* Responsive Menu */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } sm:hidden transition-all duration-800 scroll-smooth ease-in-out`}
      >
        <div className="px-2 pt-2 pb-3 mt-5">
        <Link to={'/'} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200 transition duration-300 ease-in-out">
            <div className="inline-flex">
            <img src='https://cdn-icons-png.flaticon.com/512/5973/5973800.png' className="h-7 mr-3" alt="" />
            Home
            </div>
          </Link>

          <Link to={'/departments'} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200 transition duration-300 ease-in-out">
            <div className="inline-flex">
            <img src='https://cdn-icons-png.flaticon.com/512/5861/5861956.png' className="h-7 mr-3" alt="" />
            Departments
            </div>
          </Link>

          <Link to={'/doctors'} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200 transition duration-300 ease-in-out">
            <div className="inline-flex">
            <img src='https://img.freepik.com/premium-vector/cartoon-male-doctor-holding-clipboard_29190-4660.jpg?w=2000' className="h-7 mr-3 rounded-full" alt="" />
            Doctors
            </div>
          </Link>


          <Link to={'/about'} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200 transition duration-300 ease-in-out">
            <div className="inline-flex">
            <img src='data:image/png;base64,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' className="h-6 mr-3" alt="" />
            About
            </div>
          </Link>
        

          {
            token ?
            <>    

            <Link to={'/chatList'}  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200 transition duration-300 ease-in-out">
            <div className="inline-flex">
            <img src='https://cdn-icons-png.flaticon.com/512/134/134914.png' className="h-7 mr-3 rounded-full" alt="" />
            Chat
            </div>
          </Link>

           <Link to={'/appointments'}  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200 transition duration-300 ease-in-out">
            <div className="inline-flex">
            <img src='https://static.vecteezy.com/system/resources/previews/012/852/501/original/schedule-doctor-appointment-2d-isolated-illustration-healthcare-service-flat-characters-on-cartoon-background-planning-colourful-editable-scene-for-mobile-website-presentation-vector.jpg' className="h-7 mr-3 rounded-full" alt="" />
            Appointments
            </div>
          </Link>

          <Link to={'/profile'}  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200 transition duration-300 ease-in-out">
            <div className="inline-flex">
            <img src='https://icon-library.com/images/windows-user-icon/windows-user-icon-14.jpg' className="h-7 mr-3 rounded-full" alt="" />
            View Profile
            </div>
          </Link>

          <Link to={'/wallet'}  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200 transition duration-300 ease-in-out">
            <div className="inline-flex">
            <img src='https://www.kindpng.com/picc/m/421-4213376_credit-wallet-png-icon-transparent-png.png' className="h-7 mr-3 rounded-full" alt="" />
            Wallet
            </div>
          </Link>

            <Link onClick={()=>localStorage.clear()} to={'/login'}  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200 transition duration-300 ease-in-out">
            <div className="inline-flex">
            <img src='https://img.freepik.com/free-icon/logout_318-385171.jpg' className="h-7 mr-3 " alt="" />
            Logout
            </div>
          </Link>
            </>
            :

            <>
            
            <Link to={'/login'} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:text-gray-900 focus:bg-gray-200 transition duration-300 ease-in-out">
            <div className="inline-flex">
            <img src='https://img.freepik.com/free-icon/logout_318-385171.jpg' className="h-7 mr-3" alt="" />
            Login
            </div>
          </Link>

            </>
          
          }

         
          
          {/* Add more menu items here */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
