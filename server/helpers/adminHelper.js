const bcrypt = require('bcrypt')


module.exports = {
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
    }
}