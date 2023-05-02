const drModel = require("../model/doctor");
const bcrypt = require("bcrypt");
const bookedAppointmentModel = require('../model/bookedAppointments')

module.exports = {
// ----------------------------------------------------------------STORE DOCTOR-------------------------------------------------------------------//
  drStore: (doctorDetails) => {
    return new Promise((resolve, reject) => {
      const newDoctor = new drModel(doctorDetails);
      const saltRounds = 10;
      bcrypt.hash(newDoctor.password, saltRounds, (err, hash) => {
        if (err) throw err;
        newDoctor.password = hash;
        newDoctor.save().then(() => {
            resolve(true);
          })
          .catch((err) => {
            resolve(false);
          });
      });
    });
  },

// ----------------------------------------------------------------DO LOGIN-------------------------------------------------------------------//

  doLogin:(doctor,doctorDatabase)=>{
    return new Promise(async(resolve,reject)=>{
      const password = doctor.password
      const realPassword = doctorDatabase.password
      const passwordMatch = await bcrypt.compare(password,realPassword)
      if(passwordMatch){
        const doctorData = {
          doctorId : doctorDatabase._id,
          email: doctorDatabase.email
        }
        resolve(doctorData)
      }else{
        resolve(false) 
      }
    })
  },

// ----------------------------------------------------------------RESET PASSWORD-------------------------------------------------------------------//

  resetPassword:(doctorEmail,Password)=>{
    return new Promise(async(resolve,reject)=>{
      const saltRound = 10
      const newPassword = await bcrypt.hash(Password,saltRound)
      const passwordUpdate = await drModel.updateOne({email:doctorEmail},{password:newPassword})
      if(passwordUpdate){
        resolve(true)
      }else{
        resolve(false)
      }
    })
  },

// -----------------------------------------------------------------GET APPOINTMENT GRAPH-------------------------------------------------------------------//
  
  getAppointmentGraph:(id) =>{
    return new Promise(async(resolve, reject) => {
      const year = new Date().getFullYear();
      const appointmentCount = [];

      for (let month = 1; month <= 12; month++) {
        const start = new Date(`${year}-${month.toString().padStart(2, '0')}-01`);
        const end = month === 12 
          ? new Date(`${year}-12-31`) 
          : new Date(`${year}-${(month + 1).toString().padStart(2, '0')}-01`);
        const count = await bookedAppointmentModel.count({ doctorId: id,createdAt: {  $gte: start,  $lt: end}});
        appointmentCount.push(count)
      }
     resolve(appointmentCount)
    });
  }

};
