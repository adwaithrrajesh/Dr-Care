import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar">
       
        <div class="h-full px-3 py-1 overflow-y-auto bg-blue-500">
          <ul class="space-y-2 font-medium">
            <li className="py-10">
              <Link
              to={'/admin'}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white ">
                    <img src="https://cdn-icons-png.flaticon.com/512/2416/2416668.png" className="h-16" alt="" />
                <span class="ml-3">Admin Panel</span>
              </Link>
            </li>
            <li className="py-1">
              <Link
              to={'/admin'}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-blue-400">
                    <img src="https://www.freeiconspng.com/thumbs/dashboard-icon/dashboard-icon-3.png" className="h-10" alt="" />
                <span class="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
              </Link>
            </li>
            <li className="py-1">
              <Link
              to={'/admin/users'}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-blue-400">
                    <img src="https://cdn-icons-png.flaticon.com/512/1533/1533506.png" className="h-10" alt="" />
                <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li className="py-1">
              <Link
              to={'/admin/doctors'}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-blue-400">
                    <img src="https://media.istockphoto.com/id/637884180/vector/doctor-icon.jpg?s=612x612&w=0&k=20&c=YnLWef-p_r5ro9FiR9kGFeclFBHf17KZX9o6WrhyES4=" className="h-10 rounded-full" alt="" />
                <span class="flex-1 ml-3 whitespace-nowrap">Doctors</span>
              </Link>
            </li>
            <li className="py-1">
              <Link
              to={'/admin/addDepartment'}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-blue-400">
                    <img src="https://static.vecteezy.com/system/resources/previews/016/132/003/original/syringe-icon-in-comic-style-inject-needle-cartoon-illustration-on-white-isolated-background-drug-dose-splash-effect-business-concept-vector.jpg" 
                    className="h-10 rounded-full " alt="" />
                <span class="flex-1 ml-3 whitespace-nowrap">Add Department</span>
              </Link>
            </li>

            <li className="py-1">
              <Link
              to={'/admin/departmentManagement'}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-blue-400">
                    <img src="https://static.vecteezy.com/system/resources/previews/014/308/998/original/social-event-management-icon-cartoon-project-planner-vector.jpg" 
                    className="h-10 rounded-full " alt="" />
                <span class="flex-1 ml-3 whitespace-nowrap">Manage Department</span>
              </Link>
            </li>

            <li className="py-1">
              <Link
              to={'/admin/doctorVerification'}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-blue-400">
                    <img src="https://media.istockphoto.com/id/1141608383/vector/female-asian-doctor-id-card-template-medical-identity-badge-with-barcode.jpg?s=612x612&w=0&k=20&c=pz3kToDz0hKkkR0wGmJ_uQX3dFZ2HlE_hrlhsqQassU=" 
                    className="h-10 rounded-full " alt="" />
                <span class="flex-1 ml-3 whitespace-nowrap">Doctor Verification</span>
              </Link>
            </li>

            <li className="py-1">
              <Link
              to={'/admin/viewReports'}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-blue-400">
                    <img src="https://pngimg.com/d/exclamation_mark_PNG64.png" className="h-10" alt="" />
                <span class="flex-1 ml-3 whitespace-nowrap">Reports</span>
              </Link>
            </li>

            <li className="py-1">
              <Link
              onClick={()=>localStorage.clear()}
              to={'/admin/login'}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-blue-400">
                    <img src="https://cdn-icons-png.flaticon.com/512/1057/1057200.png" className="h-10" alt="" />
                <span class="flex-1 ml-3 whitespace-nowrap">Logout</span>
              </Link>
            </li>
            
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
