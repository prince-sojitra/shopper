let USER = require('./user.model')
let OTP = require('./otp.model')
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: process.env.mailer_host,
    port: process.env.mailer_Port,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


async function main(email, otp) {
    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "SHOPPER Forgot Password Otp",
        html: `<b>Your otp is ${otp}</b>`, // html body
    });
    console.log("Message sent: %s", info.messageId);

}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
}
let storeOtps = {}


exports.usersCreation = async function (req, res, next) {
    try {
        const { firstname, lastname, email, password, role, address, mobileNo } = req.body;

        const user = new USER({
            firstname,
            lastname,
            email,
            password,
            role,
            address,
            mobileNo
        });

        const savedUser = await user.save()

        res.status(201).json({
            status: "Success",
            message: "user signup successfull",
            data: savedUser
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


exports.usersLogin = async function (req, res, next) {
    try {
        const { mobileNo, password } = req.body;

        const UserCheck = await USER.findOne({ mobileNo })

        if (!UserCheck) throw new Error("mobileNo is not existed..!")

        if (password !== UserCheck.password) throw new Error("password doesn't match..!")

        var token = jwt.sign({ id: UserCheck._id }, process.env.secretAuth);
        res.status(200).json({
            status: "Success",
            message: "user login successfull",
            data: UserCheck,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.usersAllDataGet = async function (req, res, next) {
    try {
        const userFound = await USER.find()


        res.status(200).json({
            status: "Success",
            message: "user Found successfull",
            data: userFound
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.userSendOTP = async function (req, res, next) {
    try {
        let { email } = req.body;
        let findUser = await USER.findOne({ email });
        if (!findUser) throw new Error("check your mail id. user not found..!");

        const otp = generateOTP();
        await OTP.create({ email, otp })
        await main(email, otp);

        res.status(200).json({
            status: "Success",
            message: "OTP sent successfully!",
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        });
    }
}

exports.usersFetchOTP = async function (req, res, next) {
    try {
        const { otp } = req.body;
        let DataFind = await OTP.findOne({ otp })
        if (!DataFind) throw new Error("No OTP sent to this email.");

        const isExpired = (Date.now() - DataFind.createdAt) > (1000 * 60 * 5);
        if (isExpired) {
            await OTP.deleteOne({ otp })
            throw new Error("OTP has expired, please request a new one.");
        }

        if (otp !== DataFind.otp) throw new Error("Incorrect OTP. Please check and try again.");
        await OTP.deleteOne({ otp })
        res.status(200).json({
            status: "Success",
            message: "OTP verified successfully!",
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        });
    }
}


exports.usersPasswordUpdate = async function (req, res, next) {
    try {
        const { email, password, confrimpassword } = req.body;
        if (password !== confrimpassword) throw new Error("password doesn't match.check your password and confrim password...!")
        let UpdateUSER = await USER.findOneAndUpdate({ email }, { $set: { password } },{new : true})

        res.status(200).json({
            status: "Success",
            message: "password update successfully!",
            data : UpdateUSER
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message,
        });
    }
}





