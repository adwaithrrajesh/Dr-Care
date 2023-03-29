const userModel = require("../model/user");
const bcrypt = require("bcrypt");

module.exports = {
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
  doLogin:(user,userDatabase)=>{
    return new Promise(async(resolve,reject)=>{
      const password = user.password
      const realPassword = userDatabase.password
      const passwordMatch = await bcrypt.compare(password,realPassword)
      if(passwordMatch){
        const userData = {
          firstName:userDatabase.firstName,
          lastName:userDatabase.lastName,
          email:userDatabase.email,
          phoneNumber:userDatabase.phoneNumber,
          block:userDatabase.block
        }
        resolve(userData)
      }else{
        resolve(false) 
      }
    })
  },
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
  }


};
