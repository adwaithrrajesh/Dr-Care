const drModel = require("../model/doctor");
const bcrypt = require("bcrypt");

module.exports = {
    drStore: (doctorDetails) => {
    return new Promise((resolve,reject)=>{
        const response ={}
        const newDoctor = new drModel(doctorDetails);
        const saltRounds = 10;
        bcrypt.hash(newDoctor.password, saltRounds, (err, hash) => {
          if (err) throw err;
    
          newDoctor.password = hash;
          newDoctor.save().then(() => {
            response.status=true;
            resolve(response)
            }).catch((err) => {
                response.status = false;
                resolve(response)
            });
        });
    })

  },
};
