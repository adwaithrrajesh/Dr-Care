import React, { useContext } from "react";
import { useState } from "react";
import { doctorData } from "../../../pages/patient/Doctors";


const Search = () => {

  // ----------------------------------------------------------------Use Context-------------------------------------------------------------------//
  const {setSearch} = useContext(doctorData)

  return (
    <div className="flex flex-col justify-center items-center">
      <form>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full mt-10 p-4 pl-10 text-sm text-gray-900 border border-blue-100 rounded-2xl bg-gray-50 focus:ring-cyan-500 focus:border-cyan-500 dark:bg-cyan-50 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            onChange={(e)=>setSearch(e.target.value)}
          />
          <div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
