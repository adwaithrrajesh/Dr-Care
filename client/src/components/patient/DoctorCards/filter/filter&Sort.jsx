import React, { useContext } from "react";
import { useState } from "react";
import { doctorData } from "../../../../pages/patient/Doctors";

const FilterandSort = () => {
    
    const[FilterisOpen,setFilterIsOpen] = useState(false)
    const[SortisOpen,setSortIsOpen] = useState(false)


    
    const {setSort,setFilter} = useContext(doctorData)
    const filter = useContext(doctorData)
    const sort = useContext(doctorData)





  return (
    <div className="flex justify-end">
      <div className="inline-flex justify-center items-end mt-14 space-x-3 mr-10">
      <div className="inline-flex bg-white border rounded-md ">
        <img
        onClick={()=> { setFilterIsOpen((prev)=>!prev); setSortIsOpen(false)}}
        src="https://cdn-icons-png.flaticon.com/512/107/107799.png"
          className="px-4 py-2 text-sm h-8 hover:bg-gray-50 rounded-l-md" />

        <div className="relative">
          <button
           onClick={()=> { setFilterIsOpen((prev)=>!prev); setSortIsOpen(false)}}
            type="button"
            className="inline-flex items-center justify-center h-full px-2 text-gray-600 border-l border-gray-100 hover:text-gray-700 rounded-r-md hover:bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          { FilterisOpen &&  <div className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
            <div className="p-2">
              <ul >
              <li
                onClick={(e)=>{setFilter('500-800'); setFilterIsOpen(false)}}
                className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
                  {filter.filter === '500-800' ? 
                <p className="font-extrabold text-cyan-600">
                  Fee ₹500 - ₹800
                </p>
                :
                <p>
                Fee ₹500 - ₹800
                </p>  
                }
              </li>
              <li
               onClick={(e)=>{setFilter('800-1000'); setFilterIsOpen(false)}}
                className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
                    {filter.filter === '800-1000' ? 
                <p className="font-extrabold text-cyan-600">
                  Fee ₹800 - ₹1000
                </p>
                :
                <p>
                Fee ₹800 - ₹1000
                </p>  
                }
              </li>
              <li
              onClick={()=>{setFilter('1000-2000'); setFilterIsOpen(false)}}
                className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
              {filter.filter === '1000-2000' ? 
                <p className="font-extrabold text-cyan-600">
                  Fee ₹1000 - ₹2000
                </p>
                :
                <p>
                Fee ₹1000 - ₹2000
                </p>  
                }
              </li>
              </ul>
            </div>
          </div>

          }
        </div>
      </div>

      <div className="inline-flex bg-white border rounded-md">
        <img
        onClick={()=> {setSortIsOpen ((prev)=>!prev);setFilterIsOpen(false)}}
        src="https://cdn-icons-png.flaticon.com/512/61/61217.png  "
          className="px-4 py-2 text-sm h-8 hover:bg-gray-50 rounded-l-md" />

        <div className="relative">
          <button
            onClick={()=> {setSortIsOpen ((prev)=>!prev);setFilterIsOpen(false)}}
            type="button"
            className="inline-flex items-center justify-center h-full px-2 text-gray-600 border-l border-gray-100 hover:text-gray-700 rounded-r-md hover:bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {

            SortisOpen &&  <div className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
            <div className="p-2">
            <ul>
              <li 
              onClick={(e)=>{setSort('priceDescending');setSortIsOpen(false)}}
              className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
              {sort.sort === 'priceDescending' ? 
                <p className="font-extrabold text-cyan-600">
                  Price high to low
                </p>
                :
                <p>
                Price high to low
                </p>  
                }
              </li>
              <li
              onClick={(e)=>{setSort('priceAscending'); setSortIsOpen(false)}}
                className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
                  {sort.sort === 'priceAscending' ? 
                <p className="font-extrabold text-cyan-600">
                  Price low to high
                </p>
                :
                <p>
                Price low to high
                </p>  
                }
              </li>
              <li
              onClick={(e)=>{setSort('experienceAscending');setSortIsOpen(false)}} 
                className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
                   {sort.sort === 'experienceAscending' ? 
                <p className="font-extrabold text-cyan-600">
                  Experience low to high
                </p>
                :
                <p>
                Experience low to high
                </p>  
                }
              </li>
              <li
              onClick={(e)=>{setSort('experienceDescending');setSortIsOpen(false)}}
                className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
                     {sort.sort === 'experienceDescending' ? 
                <p className="font-extrabold text-cyan-600">
                  Experience high to low
                </p>
                :
                <p>
                Experience high to low
                </p>  
                }
              </li>
              </ul>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
    </div>
  );
};

export default FilterandSort;
