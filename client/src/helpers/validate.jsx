import {toast} from 'react-hot-toast'


// -----------------------------------------------------Signup Validation----------------------------------------------------------------

export async function signupValidation(value){

    const error = {}

    if(!value.firstName){
        return error.firstName = toast.error('FirstName Required...!')
    }else if(!value.lastName){
        return error.lastName = toast.error('LastName Required ...!')
    }else if(!value.phoneNumber){
        return error.phoneNumber = toast.error('PhoneNumber Required ...!')
    }else if(value.phoneNumber.length < 9){
        return error.phoneNumber = toast.error('Please Enter a valid Phone Number...!')
    }else if(!value.email){
        return  error.email =toast.error('Email Required...!');
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value.email)){
       return error.email =toast.error('Invalid email....!');
    }else if(!value.password){
        return error.password = toast.error('Password Required ...!')
    }else if(value.password.length < 5){
        return error.password = toast.error('Your Password must contain atleast 5 characters')
    }else if(!value.confirmPassword){
        return error.confirmPassword = toast.error('Please Confirm your password')
    }else if(value.confirmPassword != value.password){
        return error.confirmPassword = toast.error('Password Doesnot Match')
    }
}

  // -----------------------------------------------------LOGIN VALIDATION----------------------------------------------------------------

export async function loginValidation(value){
    
    const error = {}

    if(!value.email){
        return error.email = toast.error('Email Required...!')
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value.email)){
        return error.email = toast.error('Invalid Email...!')
    }else if(!value.password){
        return error.password = toast.error('Password Required...!')
    }else if(value.password.length < 5){
        return error.password = toast.error('Invalid Password...!')
    }
}

// -----------------------------------------------------FORGOT PASSWORD VALIDATION----------------------------------------------------------------


// Email validation
export async function emailValidation(value){
    const error = {}

    if(!value.email){
        return error.email = toast.error('Email Required...!')
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value.email)){
        return error.email = toast.error('Invalid Email...!')
    }
}
// Password validation
export async function passwordValidation(value){
    const error = {}
    if(!value.password){
        return error.password = toast.error('Password Required ...!')
    }else if(value.password.length < 5){
        return error.password = toast.error('Your Password must contain atleast 5 characters')
    }else if(!value.confirmPassword){
        return error.confirmPassword = toast.error('Please Confirm your password')
    }else if(value.confirmPassword != value.password){
        return error.confirmPassword = toast.error('Password Doesnot Match')
    }
}

  // -----------------------------------------------------DEPARTMENT VALIDATION----------------------------------------------------------------

export async function DepartmentValidation(value){
    const error = {}
    if(!value.departmentName){
        return error.departmentName = toast.error('Please enter department Name')
    }else if(! value.departmentDiscription){
        return error.departmentDiscription = toast.error('Please enter Department Discription')
    }
}

  // -----------------------------------------------------DOCTOR UPLOAD VALIDATION----------------------------------------------------------------

export async function DoctorUploadValidation(value){
    const error = {}

    if(!value.idNumber){
        return error.idNumber = toast.error('Please enter Id Number')
    }else if(! value.qualification){
        return error.qualification = toast.error('Please enter Qualification')
    }else if(! value.departmentName){
        return error.departmentName = toast.error('Please enter DepartmentName')
    }else if(!value.fee){
        return error.fee = toast.error('Please add your fee')
    }else if(! value.experience){
        return error.experience = toast.error('Please enter year of experience')
    }
}

  // -----------------------------------------------------EDIT DOCTOR PROFILE----------------------------------------------------------------

  export async function editDoctorProfileValidation(value){
    const error = {}
    if(!value.firstName){
        return error.firstName = toast.error('FirstName Required...!')
    }else if(!value.lastName){
        return error.lastName = toast.error('LastName Required ...!')
    }else if(!value.email){
        return error.email = toast.error('Registered Email Required...!')
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value.email)){
        return error.email = toast.error('Invalid Email...!')
    }else if(! value.departmentName){
        return error.departmentName = toast.error('Please enter DepartmentName')
    }else if(!value.fee){
        return error.fee = toast.error('Please add your fee')
    }else if(! value.experience){
        return error.experience = toast.error('Please enter year of experience')
    }else if(!value.phoneNumber){
        return error.phoneNumber = toast.error('PhoneNumber Required ...!')
    }
}

  // -----------------------------------------------------EDIT DOCTOR PROFILE----------------------------------------------------------------

  export async function scheduleTimeValidation(value){
    console.log(value,"fjjjjjjjjjjjjj")
  }