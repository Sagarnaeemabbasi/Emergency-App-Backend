import user from '../models/user.js';
import {sendToken} from '../Utils/sendToken.js';

export const signupUser = async (req, res) => {
  try {
    const {name, email, password, role} = req.body;
    if (!name || !email || !password || role) {
      res.status(400).json({
        message: 'kindly fill all the fields',
        status: false,
      });
      return;
    }
    let emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailreg.test(email)) {
      return res.status(400).json({
        message: 'kindly fill the correct Email',
        status: false,
      });
    }
    let userOne = await user.findOne({email}).select('+password');
    if (userOne) {
      res.status(400).json({
        message: 'user already exist',
        status: false,
      });

      return;
    }
    const otp = Math.floor(Math.random() * 100000);

    const obj_to_sent = {
      role,
      name,
      email,
      password,
      otp,
      otp_expiry: new Date(
        Date.now() + process.env.OTP_EXPIRY_DATE * 60 * 1000,
      ),
    };

    userOne = await user.create(obj_to_sent);

    sendToken(res, userOne, 201, 'SignUp Successfully');
  } catch (error) {
    res.status(400).json({
      message: `${error}`,
      status: false,
    });
  }
};
