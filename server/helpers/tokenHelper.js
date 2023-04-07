const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports = {
// ----------------------------------------------------------------GENERATE TOKEN--------------------------------------------------------------//

    generateToken:async (user)=>{
        try {
            return await new Promise((resolve) => {
                const token  = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '2d' })
                resolve(token)
            })
        } catch (err) {
            console.log(err)
        }
    },

// ----------------------------------------------------------------VERIFY TOKEN------------------------------------------------------------------//

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