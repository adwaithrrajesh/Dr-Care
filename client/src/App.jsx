import { BrowserRouter, Routes, Route } from 'react-router-dom'


// Import Patient Page
import Login from './pages/patient/Login'
import Signup from './pages/patient/Signup'
import Home from './pages/patient/Home'
import Departments from './pages/patient/Departments'
import Doctors from './pages/patient/Doctors'
import DoctorProfile from './pages/patient/DoctorProfile'
import Chat from './pages/patient/Chat'
import About from './pages/patient/About'
import ForgotPassword from './pages/patient/ForgotPassword'
import OtpForgotPassword from './components/patient/OtpForgotPassword'
import ResetPassword from './pages/patient/ResetPassword'
import DoctorBooking from './pages/patient/DoctorBooking'
import UserProfile from './pages/patient/userProfile'
import EditUserProfile from './pages/patient/editUserProfile'
import UserAppointments from './pages/patient/Appointments'
import Wallet from './pages/patient/wallet'
import CancelledAppointments from './pages/patient/CancelledAppointments'
import ChatList from './pages/patient/ChatList'
import DoctorChatList from './pages/doctor/DrChatList'


// Otp
import Otp from './pages/patient/Otp'

// Import Doctor Page
import DoctorLogin from './pages/doctor/DoctorLogin'
import DoctorSignup from './pages/doctor/DoctorSignup'
import DoctorHome from './pages/doctor/DoctorHome'
import Profile from './pages/doctor/Profile'
import UploadDetails from './pages/doctor/UploadDetails'
import DrOtp from './pages/doctor/DrOtp'
import DoctorForgotPassword from './pages/doctor/ForgotPasswordDoctor'
import DoctorOtpForgotPassword from './components/doctor/ForgotPasswordOtp'
import DoctorResetPassword from './pages/doctor/ResetPassword'
import DrChat from './pages/doctor/DrChat'
import EditProfile from './pages/doctor/EditProfile'
import ScheduleTime from './pages/doctor/ScheduleTime'
import Appointments from './pages/doctor/Appointments'
import DoctorDashboard from './pages/doctor/dashboard'
import EditScheduledTime from './pages/doctor/EditScheduledTime'

// Import Admin Page
import AdminLogin from './pages/admin/adminLogin'
import ListUsers from './pages/admin/Users'  
import DoctorList from './pages/admin/Doctors'
import AddDepartment from './pages/admin/AddDepartment'
import DepartmentManagement from './pages/admin/DepartmentManagement'
import DoctorVerification from './pages/admin/doctorVerification'
import AdminDashboard from './pages/admin/AdminDashboard'
import ViewReports from './pages/admin/viewReports'


// Import Public and Protected Routes
import ClientPublicRoutes from './utils/ClientPublicRoutes'
import ClientProtectedRoutes from './utils/ClientProtectedRoutes'
import DoctorPublicRoutes from './utils/DoctorPublicRoutes'
import DoctorProtectedRoutes from './utils/DoctorPrivateRoute'
import AdminPublicRoute from './utils/AdminPublicRoute'
import AdminProtectedRoute from './utils/AdminProtectedRoute'
import ViewVerificationImage from './pages/admin/ViewVerificationImage'


// -------------------------------------------------------SOCKET IO------------------------------------------------------------------------------------




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
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/book' element={<DoctorBooking/>}/>
        <Route path='/departments' element={<Departments/>}/>
        <Route path='/doctorProfile' element={<DoctorProfile/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/editProfile' element={<EditUserProfile/>}/>
        <Route path='/appointments' element={<UserAppointments/>}/>
        <Route path='/wallet' element={<Wallet/>}/>
        <Route path='/viewCancelledAppointments' element={<CancelledAppointments/>}/>
        <Route path='/chatList' element={<ChatList/>}/>
        </Route>

        <Route path='/' element={<Home/>}/>
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
        <Route path='/doctor/editScheduledTime' element={<EditScheduledTime/>}/>
        <Route path='/doctor/home' element={<DoctorHome/>}/>
        <Route path='/doctor/profile' element={<Profile/>}/>
        <Route path='/doctor/uploadDetails' element={<UploadDetails/>}/>
        <Route path='/doctor/chatList' element={<DoctorChatList/>}/>
        <Route path='/doctor/chat' element={<DrChat/>}/>
        <Route path='/doctor/appointments' element={<Appointments/>}/>
        <Route path='/doctor/editProfile' element={<EditProfile/>}/>
        <Route path='/doctor/scheduleTime' element={<ScheduleTime/>}/>
        <Route path='/doctor/dashboard' element={<DoctorDashboard/>}/>
        </Route>
        
        <Route path='/doctor/forgotpassword' element={<DoctorForgotPassword/>}/>
        <Route path='/doctor/forgot-password-otp' element={<DoctorOtpForgotPassword/>}/>
        <Route path='/doctor/resetPassword' element={<DoctorResetPassword/>}/>


        {/* Admin */}
        <Route element={<AdminPublicRoute/>}>
        <Route path='/admin/login' element={<AdminLogin/>}/>
        </Route>
        
        <Route element={<AdminProtectedRoute/>}>
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/admin/users' element={<ListUsers/>}/>
        <Route path='/admin/doctors' element={<DoctorList/>}/>
        <Route path='/admin/addDepartment' element={<AddDepartment/>}/>
        <Route path='/admin/departmentManagement' element={<DepartmentManagement/>}/>
        <Route path='/admin/doctorVerification' element={<DoctorVerification/>}/>
        <Route path='/admin/viewVerificationImage' element={<ViewVerificationImage/>}/>
        <Route path='/admin/viewReports' element={<ViewReports/>}/>

        </Route>
        

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
