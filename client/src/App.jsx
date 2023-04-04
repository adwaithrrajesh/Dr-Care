import { BrowserRouter, Routes, Route } from 'react-router-dom'


// Import Patient Page
import Login from './components/patient/pages/login/Login'
import Signup from './components/patient/pages/signup/Signup'
import Home from './components/patient/pages/home/Home'
import Departments from './components/patient/pages/DepartmentList/Departments'
import Doctors from './components/patient/pages/DoctorsList/Doctors'
import DoctorProfile from './components/patient/pages/DoctorProfile/DoctorProfile'
import Chat from './components/patient/pages/chat/Chat'
import About from './components/patient/pages/About/About'
import ForgotPassword from './components/patient/pages/forgotPassword/ForgotPassword'
import OtpForgotPassword from './components/patient/pages/forgotPassword/Otp/OtpForgotPassword'
import ResetPassword from './components/patient/pages/forgotPassword/resetpassword/ResetPassword'
import DoctorBooking from './components/patient/pages/booking/DoctorBooking'
// Otp
import Otp from './components/patient/pages/otp/Otp'

// Import Doctor Page
import DoctorLogin from './components/doctor/pages/DoctorLogin/DoctorLogin'
import DoctorSignup from './components/doctor/pages/DoctorSignup/DoctorSignup'
import DoctorHome from './components/doctor/pages/Home/DoctorHome'
import Profile from './components/doctor/pages/Profile/Profile'
import UploadDetails from './components/doctor/pages/uploadDetails/UploadDetails'
import DrOtp from './components/doctor/pages/Otp/DrOtp'
import DoctorForgotPassword from './components/doctor/pages/ForgotPassword/ForgotPasswordDoctor'
import DoctorOtpForgotPassword from './components/doctor/pages/ForgotPassword/otp/ForgotPasswordOtp'
import DoctorResetPassword from './components/doctor/pages/ForgotPassword/resetpassword/ResetPassword'
import DrChat from './components/doctor/pages/DrChat/DrChat'

import Appointments from './components/doctor/pages/Appointments/Appointments'

// Import Admin Page
import AdminLogin from './components/admin/pages/login/adminLogin'
import ListUsers from './components/admin/pages/users/Users'  
import DoctorList from './components/admin/pages/doctors/Doctors'
import AddDepartment from './components/admin/pages/department/AddDepartment'
import DepartmentManagement from './components/admin/pages/department/DepartmentManagement'
import DoctorVerification from './components/admin/pages/doctors/verifyDoctor/doctorVerification'


// Import Public and Protected Routes
import ClientPublicRoutes from './utils/ClientPublicRoutes'
import ClientProtectedRoutes from './utils/ClientProtectedRoutes'
import DoctorPublicRoutes from './utils/DoctorPublicRoutes'
import DoctorProtectedRoutes from './utils/DoctorPrivateRoute'
import AdminPublicRoute from './utils/AdminPublicRoute'
import AdminProtectedRoute from './utils/AdminProtectedRoute'
import ViewVerificationImage from './components/admin/pages/doctors/verifyDoctor/viewVerifyImages/ViewVerificationImage'



function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        {/* Patient */}
        <Route element={<ClientPublicRoutes/>}>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup'element={<Signup/>}/>
        </Route>
      
        <Route element={<ClientProtectedRoutes/>}>
        <Route path='/doctorProfile' element={<DoctorProfile/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/book' element={<DoctorBooking/>}/>
        </Route>

        <Route path='/' element={<Home/>}/>
        <Route path='/departments' element={<Departments/>}/>
        <Route path='/doctors' element={<Doctors/>}/>

        <Route path='/about' element={<About/>}/>
        <Route path='/otp' element={<Otp/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/forgot-password-otp' element={<OtpForgotPassword/>}/>
        <Route path='/resetPassword' element={<ResetPassword/>}/>
 

        {/* Doctor */}

        <Route element={<DoctorPublicRoutes/>}> 
        <Route path='/doctor/login' element={<DoctorLogin/>}/>
        <Route path='/doctor/signup' element={<DoctorSignup/>}/>
        <Route path='/doctor/otp' element={<DrOtp/>}/>
        </Route>

        <Route element={<DoctorProtectedRoutes/>}>
        <Route path='/doctor/home' element={<DoctorHome/>}/>
        <Route path='/doctor/profile' element={<Profile/>}/>
        <Route path='/doctor/uploadDetails' element={<UploadDetails/>}/>
        <Route path='/doctor/chat' element={<DrChat/>}/>
        <Route path='/doctor/appointments' element={<Appointments/>}/>
        </Route>
        
        <Route path='/doctor/forgotpassword' element={<DoctorForgotPassword/>}/>
        <Route path='/doctor/forgot-password-otp' element={<DoctorOtpForgotPassword/>}/>
        <Route path='/doctor/resetPassword' element={<DoctorResetPassword/>}/>


        {/* Admin */}
        <Route element={<AdminPublicRoute/>}>
        <Route path='/admin/login' element={<AdminLogin/>}/>
        </Route>
        
        <Route element={<AdminProtectedRoute/>}>
        <Route path='/admin' element={<ListUsers/>}/>
        <Route path='/admin/doctors' element={<DoctorList/>}/>
        <Route path='/admin/addDepartment' element={<AddDepartment/>}/>
        <Route path='/admin/departmentManagement' element={<DepartmentManagement/>}/>
        <Route path='/admin/doctorVerification' element={<DoctorVerification/>}/>
        <Route path='/admin/viewVerificationImage' element={<ViewVerificationImage/>}/>
        </Route>
        

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
