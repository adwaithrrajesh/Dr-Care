const drModel = require("../model/doctor");
const bcrypt = require("bcrypt");

module.exports = {
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
  }

};
