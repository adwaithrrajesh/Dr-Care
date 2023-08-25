const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const bookedAppointmentModel = require('../model/bookedAppointments')
const appointmentModel = require('../model/appointment');
const doctor = require("../model/doctor");

module.exports = {
// ----------------------------------------------------------------USER STORE-------------------------------------------------------------------//

  userStore: (user) => {
    return new Promise(async(resolve,reject)=>{
        const newUser = new userModel(user);
        const saltRounds = 10;

        bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(() => {
            resolve(true)
            }).catch((err) => {
                resolve(false)
            });
        });
    })
  },

// ----------------------------------------------------------------LOGIN-------------------------------------------------------------------//
  
  doLogin:(user,userDatabase)=>{
    return new Promise(async(resolve,reject)=>{
      const password = user.password
      const realPassword = userDatabase.password
      const passwordMatch = await bcrypt.compare(password,realPassword)
      if(passwordMatch){
        const userData = {
          userId : userDatabase._id,
          email: userDatabase.email
        }
        resolve(userData)
      }else{
        resolve(false) 
      }
    })
  },

// ----------------------------------------------------------------RESET PASSWORD-------------------------------------------------------------------//

  resetPassword:(userEmail,Password)=>{
    return new Promise(async(resolve,reject)=>{
      const saltRound = 10
      const newPassword = await bcrypt.hash(Password,saltRound)
      const passwordUpdate = await userModel.updateOne({email:userEmail},{password:newPassword})
      if(passwordUpdate){
        resolve(true)
      }else{
        resolve(false)
      }
    })
  },

// ----------------------------------------------------------------Booking Appointment-------------------------------------------------------------------//

bookAppointment: (userId,appointmentId)=>{
  return new Promise(async(resolve,reject)=>{

    const appointment = await appointmentModel.findOne({_id: appointmentId}).populate('doctorId');
    const booking = new bookedAppointmentModel({
      userId,
      time: `${appointment.startingTime} to ${appointment.endingTime}`,
      date: appointment.date,
      doctorId: appointment.doctorId._id,
      amountPaid: appointment.doctorId.fee,
      appointmentId:appointmentId
    });
    
    try {
      const response = await booking.save();
      if(response){
        const slotDecrease = await appointmentModel.findByIdAndUpdate(appointmentId,{ $inc: { slot: -1 } },{ new: true });
        resolve(slotDecrease)
      }
    } catch (error) {
      return error;
    }
    
})
},
// --------------------------------------------------------------------------------------------------------------------------------------//

};
