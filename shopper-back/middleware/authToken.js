var jwt = require('jsonwebtoken');
var USER = require('../modules/Users/user.model')

exports.Authentication = async function (req, res, next) {
    try {
        let token = req.headers.authorization
        if (!token) throw new Error('Please Attach Token')

        var decoded = jwt.verify(token, process.env.secretAuth);
        let userCheck = await USER.findById(decoded.id)
        req.userData = userCheck
        if(!userCheck) throw new Error('User not Found')
        next()
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}