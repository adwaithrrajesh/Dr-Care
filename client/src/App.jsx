import { BrowserRouter, Routes, Route } from 'react-router-dom'


// Import Patient Page
import Login from './patient/pages/login/Login'
import Signup from './patient/pages/signup/Signup'
import Home from './patient/pages/home/Home'
import Departments from './patient/pages/DepartmentList/Departments'
import Doctors from './patient/pages/DoctorsList/Doctors'
import DoctorProfile from './patient/pages/DoctorProfile/DoctorProfile'
import Chat from './patient/pages/chat/Chat'
import About from './patient/pages/About/About'

// Import Doctor Page
import DoctorLogin from './doctor/pages/DoctorLogin/DoctorLogin'
import DoctorSignup from './doctor/pages/DoctorSignup/DoctorSignup'
import DoctorHome from './doctor/pages/Home/DoctorHome'
import Profile from './doctor/pages/Profile/Profile'
import UploadDetails from './doctor/pages/uploadDetails/UploadDetails'

// Import Admin Page
import AdminLogin from './admin/login/adminLogin'
import AdminHome from './admin/home/AdminHome'  
import DrChat from './doctor/pages/DrChat/DrChat'
import DoctorBooking from './patient/pages/booking/DoctorBooking'
import Appointments from './doctor/pages/Appointments/Appointments'





function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        {/* Patient */}
        <Route path='/login' element={<Login/>} />
        <Route path='/signup'element={<Signup/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/departments' element={<Departments/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctorProfile' element={<DoctorProfile/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/book' element={<DoctorBooking/>}/>
        <Route path='/about' element={<About/>}/>

        {/* Doctor */}
        <Route path='/doctor/login' element={<DoctorLogin/>}/>
        <Route path='/doctor/signup' element={<DoctorSignup/>}/>
        <Route path='/doctor/home' element={<DoctorHome/>}/>
        <Route path='/doctor/profile' element={<Profile/>}/>
        <Route path='/doctor/uploadDetails' element={<UploadDetails/>}/>
        <Route path='/doctor/chat' element={<DrChat/>}/>
        <Route path='/doctor/appointments' element={<Appointments/>}/>

        {/* Admin */}
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route path='/admin/home' element={<AdminHome/>}/>



      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
