const userModel = require("../model/user");
const bcrypt = require("bcrypt");

module.exports = {
  userStore: (user) => {
    return new Promise((resolve,reject)=>{
        const response ={}
        const newUser = new userModel(user);
        const saltRounds = 10;
        bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
          if (err) throw err;
    
          newUser.password = hash;
          newUser.save().then(() => {
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
