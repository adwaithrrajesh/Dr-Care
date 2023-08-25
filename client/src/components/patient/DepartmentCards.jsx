import React, { useState } from 'react';
  import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDepartments } from '../../API/user';


  const Cards = () => {


    const navigate = useNavigate()
// ----------------------------------------------------------------STATES-------------------------------------------------------------------//

    const [searchResult,setSearchResult] = useState([])
    const [department,setDepartment] = useState([])
    const [loading,setLoading] = useState(false)



// ----------------------------------------------------------------REDUX SELECTOR-------------------------------------------------------------------//

    const selector = useSelector(state=>state.search)
    useEffect(() => {
      setSearchResult(selector.searchData)
    }, [selector]);


// ----------------------------------------------------------------FETCHING DEPARTMENT-------------------------------------------------------------------//
  
    useEffect(() => {
      viewDepartments()
    }, []);
    
    const viewDepartments = async()=>{
      setLoading(true)
      const response = await getDepartments()
      setDepartment(response.data.departments)
      setLoading(false)
    } 


// ------------------------------------------------------------------------------CODE-------------------------------------------------------------------//
 
    return (
      
          <div class="container my-12 mx-auto px-4 md:px-12">
                {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>}
          <div class="flex flex-wrap -mx-1 lg:-mx-4">

            { searchResult == null ?
              <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/2 lg:my-4 lg:px-4 lg:w-full cursor-pointer ">
                <article class="overflow-hidden rounded-lg shadow-lg bg-white h-[auto]">
                  <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                    <a href="#">
                      <img
                        alt="Placeholder"
                        class="block h-96 w-full rounded-full object-cover"
                        src="https://cdni.iconscout.com/illustration/premium/thumb/folder-is-empty-4064360-3363921.png"
                      />
                    </a>
                  </div>

                  <header class="flex items-center justify-center leading-tight">
                    <h1 class="text-lg">
                      <p class="no-underline text-4xl text-black">
                        Department Not found
                      </p>
                    </h1>
                  </header>

                  <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                    <p>We are really sorry we couldn't find the department that you entered</p>
                  </div>
                </article>
              </div>
              :
              <>
              {
                searchResult.length > 0 ? 
                <>
                 {searchResult.map((Department) => (
              <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer hover:scale-105 ease-in-out duration-200">
                <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                  <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                    <img
                      alt="Placeholder"
                      class="block h-60 w-64 rounded-2xl object-cover"
                      src={Department.departmentImage}
                    />
                  </div>

                  <header class="flex items-center justify-center leading-tight p-2 md:p-4">
                    <h1 class="text-lg">
                      <p class="no-underline text-black">{Department.departmentName}</p>
                    </h1>
                  </header>

                  <div class="flex items-center justify-center text-gray-500 text-center leading-tight p-2 md:p-4">
                    <p>
                      {Department.departmentDiscription}
                    </p>
                  </div>

                  <div onClick={()=>navigate('/doctors',{state:{departmentData: Department.departmentName}})} className="flex items-center justify-center leading-tight p-2 md:p-4" >
                    <p class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                      View Doctors
                      <svg
                        aria-hidden="true"
                        class="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </p>
                  </div>
                </article>
              </div>
               ))}
              </>
                :
                <>
                {
                  department.length == 0 &&
                  <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/2 lg:my-4 lg:px-4 lg:w-full cursor-pointer ">
                  <article class="overflow-hidden rounded-lg shadow-lg bg-white h-[auto]">
                    <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                      <a href="#">
                        <img
                          alt="Placeholder"
                          class="block h-96 w-full rounded-full object-cover"
                          src="https://cdni.iconscout.com/illustration/premium/thumb/folder-is-empty-4064360-3363921.png"
                        />
                      </a>
                    </div>
  
                    <header class="flex items-center justify-center leading-tight">
                      <h1 class="text-lg">
                        <p class="no-underline text-4xl text-black">
                          Department Not found
                        </p>
                      </h1>
                    </header>
  
                    <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                      <p>We are really sorry we couldn't find the department that you entered</p>
                    </div>
                  </article>
                </div>
                }
                {department?.map((Department) => (
             <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer hover:scale-105 ease-in-out duration-200">
               <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                 <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                   <img
                     alt="Placeholder"
                     class="block h-60 w-64 rounded-2xl object-cover"
                     src={Department.departmentImage}
                   />
                 </div>

                 <header class="flex items-center justify-center leading-tight p-2 md:p-4">
                   <h1 class="text-lg">
                     <p class="no-underline text-black">{Department.departmentName}</p>
                   </h1>
                 </header>

                 <div class="flex items-center justify-center text-gray-500 text-center leading-tight p-2 md:p-4">
                   <p>
                     {Department.departmentDiscription}
                   </p>
                 </div>

                 <div onClick={()=>navigate('/doctors',{state:{departmentData: Department.departmentName}})} className="flex items-center justify-center leading-tight p-2 md:p-4" >
                   <p class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                     View Doctors
                     <svg
                       aria-hidden="true"
                       class="w-4 h-4 ml-2 -mr-1"
                       fill="currentColor"
                       viewBox="0 0 20 20">
                       <path
                         fill-rule="evenodd"
                         d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                         clip-rule="evenodd"></path>
                     </svg>
                   </p>
                 </div>
               </article>
             </div>
              ))}
             </>

              }
               
          </>
            }
          </div>
        </div>
    );
  };

  export default Cards;
