import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import instance from "../../instance/instance";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Header = () => {

  const [dropdown,setDropdown] = useState(false)

  const navigate = useNavigate()

  
  const token = JSON.parse(localStorage.getItem("clientToken"));


  return (
    <div>
      <nav class="bg-gray-100 border-gray-200 px-2 sm:px-4 py-2.5 rounded">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
            <img src={logo} onClick={()=>navigate('/')} class="h-10  sm:h-10 block" alt="Dr Care logo" />
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-cyan-700 dark:focus:ring-cyan-600"
            aria-controls="navbar-default"
            aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
          
          <div class="hidden  w-full md:block md:w-auto " id="navbar-default">
            <ul class="flex flex-col p-2 mt-1 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8  md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-gray-100 dark:bg-white md:dark:bg-white-900 dark:border-gray-700">
             
              <li>
                <Link to={'/'} className={'block  py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-cyan-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:scale-105 ease-in-out duration-200'}>
                <p className="mt-3">Home</p> 
                  
                </Link>
              </li>
              <li>
                <Link to={'/about'} className={'block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-cyan-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:scale-105 ease-in-out duration-200'}>
                <p className="mt-3">About</p> 
                  
                </Link>
              </li>
              <li>
              <Link to={'/Departments'} className={'block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-cyan-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:scale-105 ease-in-out duration-200'}>
              <p className="mt-3">Departments</p> 
                </Link>
              </li>
              <li>
              <Link to={'/doctors'} className={'block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-cyan-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:scale-105 ease-in-out duration-200'}>
                  <p className="mt-3">Doctors</p> 
                </Link>
              </li>
              

              <li>
                {
                 token ?
                 <div onClick={()=>{setDropdown(!dropdown)}} to={'/login'} className={'block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-cyan-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:scale-105 ease-in-out duration-200'}>
                 <img src='https://icon-library.com/images/windows-user-icon/windows-user-icon-14.jpg'  class="rounded-full inline-flex items-center h-8 mt-1 mr-1" alt="" />
               </div>
                :
                 <Link to={'/login'} className={'block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-cyan-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:scale-105 ease-in-out duration-200'}>
                  <p className="mt-3">Login</p> 
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
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
