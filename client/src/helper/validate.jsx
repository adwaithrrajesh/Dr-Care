import {toast} from 'react-hot-toast'


// Signup Validation
export async function signupValidation(value){

    const error = {}

    if(!value.FirstName){
        return error.FirstName = toast.error('FirstName Required...!')
    }else if(!value.LastName){
        return error.LastName = toast.error('LastName Required ...!')
    }else if(!value.PhoneNumber){
        return error.PhoneNumber = toast.error('PhoneNumber Required ...!')
    }else if(value.PhoneNumber.length < 9){
        return error.PhoneNumber = toast.error('Please Enter a valid Phone Number...!')
    }else if(!value.Email){
        return  error.email =toast.error('Email Required...!');
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value.Email)){
       return error.email =toast.error('Invalid email....!');
    }else if(!value.Password){
        return error.Password = toast.error('Password Required ...!')
    }else if(value.Password.length < 5){
        return error.Password = toast.error('Your Password must contain atleast 5 characters')
    }else if(!value.ConfirmPassword){
        return error.ConfirmPassword = toast.error('Please Confirm your password')
    }else if(value.ConfirmPassword != value.Password){
        return error.ConfirmPassword = toast.error('Password Doesnot Match')
    }
}
// Login validation
export async function loginValidation(value){
    const error = {}

    console.log(value)

    if(!value.Email){
        return error.Email = toast.error('Email Required...!')
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value.Email)){
        return error.Email = toast.error('Invalid Email...!')
    }else if(!Password){
        return error.Password = toast.error('Invalid Password...!')
    }
}
