const bcrypt = require('bcrypt')
const userModel = require('../model/user')
const bookedAppointmentModel = require('../model/bookedAppointments')

module.exports = {
// ----------------------------------------------------------------LOGIN-------------------------------------------------------------------//

    doLogin:(admin,adminDatabase)=>{
        return new Promise(async(resolve,reject)=>{
            const realPassword = admin.password
            const password = adminDatabase.password
            const passwordVerify = await bcrypt.compare(realPassword,password)
            const adminData = {
                adminId : adminDatabase._id,
                email: adminDatabase.email
            }
            if(passwordVerify){
                resolve(adminData)
            }else{
                resolve(false)
            }
        })
    },

  // -----------------------------------------------------------------GET USER GRAPH-------------------------------------------------------------------//
  getAppointmentGraphForAdmin : async () => {
    return new Promise(async(resolve, reject) => {
        const year = new Date().getFullYear();
        const appointmentCount = [];
  
        for (let month = 1; month <= 12; month++) {
          const start = new Date(`${year}-${month.toString().padStart(2, '0')}-01`);
          const end = month === 12 
            ? new Date(`${year}-12-31`) 
            : new Date(`${year}-${(month + 1).toString().padStart(2, '0')}-01`);
          const count = await bookedAppointmentModel.count({ createdAt: {  $gte: start,  $lt: end}});
          appointmentCount.push(count)
        }

       resolve(appointmentCount)
      });
},

}