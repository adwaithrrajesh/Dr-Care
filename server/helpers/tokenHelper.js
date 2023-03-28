const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports = {
    generateToken:(user)=>{
        return new Promise((resolve)=>{
            // const payload = {
            //     id: user._id,
            //     firstName : user.firstName
            // }
            const token = jwt.sign(user,process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
            resolve(token)
        })
    },
    verifyToken:(token)=>{
        return new Promise((resolve,reject)=>{
            try {
                const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
                resolve(decodedToken)
            } catch (error) {
                resolve(false)
            }
        })
    }
}