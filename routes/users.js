import express from 'express'

import Users from '../models/Users.js'

import verifyToken from '../middlewares/verifyToken.js'

import dotenv from 'dotenv';

import nodemailer from 'nodemailer';



const router = express.Router();

dotenv.config();





router.get('/', async (req, res) => {

    const users = await Users.find()

    res.send({ data: users })

})



router.post('/register', async (req, res) => {

    try {

      const data = await Users.create(req.body)

        res.send({ message: 'User registered successfully!', uid:data._id})

    } catch (e) {

        res.status(400).send({ message: e.message })

    }

})



router.put('/login', async (req, res) => {

    try {

  const { email, password } = req.body



        //Step 1: Check if email exists

const user = await Users.findOne({email })

 if (!user) {

  res.status(404).send({ message: 'Email not found!' })

            return

        }

    

        //Step 2: Compare Password

  const isCorrectPassword = user.comparePassword(password)

  if (!isCorrectPassword) {

res.status(404).send({ message: 'Password is incorrect!' })

            return}

    

        //Step 3: Generate Token

  const token = Users.generateToken()

  Users.tokens.push(token)

  await Users.save()

  res.send({ message: 'User logged in successfully!', token })

    } catch (e) {

        res.status(400).send({ message: e.message })

    }

})



router.put('/logout', verifyToken, async (req, res) => {

  try{

    await Users.findByIdAndUpdate(req.userId, { $pull: { tokens: req.tokenToRemove } })

    res.send({ message: 'Logged out successfully!' })

  }catch (e){

    res.status(400).send({ message: e.message })

  }

})



const sendOtp = async (email, code) => {

  const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 587,

    auth: {

      user: process.env.Smtp_Users_Name,

      pass: process.env.Smtp_Password,

    },

  });



  const info = await transporter.sendMail({

    from: '"React-OLX" <React.olx.veri.email>',

    to: email,

    subject: "Verification code", // Subject line

    text: `Your verification code is ${code}`, // plain text body

    html: `<b>Your verification code is <a href="#">${code}</a></b>`, // html body

  });



  return info.messageId;

};





router.get('/sendemail/:email/:otp', async (req, res) => {

    try {

 const { params: { email, otp }} = req;

  const data = await Users.findOne({

  email});

  if(!data){

  res.send({ msg: 'Email not found', complete: false });

      return;

  };



 const messageId = await sendOtp(email, otp);

  res.send({ msg: 'Otp send successfully on email', messageId, complete: true });

    } catch (err) {

        res.send({ msg: err.message, complete: false });

    }

});

        

        

        

router.put('/updatepass/:email/:newPass', async (req, res) => {

    try {

  const { params:{email, newPass}}= req;

  const data = await Users.findOne({

    email});



const updatedPass = await data.updatePassword(newPass);

await User.findByIdAndUpdate(data._id, {

    password: updatedPass

})

res.send({ msg: 'Password updated successfully', complete: true });

    } catch (err) {

        res.send({ msg: err.message, complete: false });

    }

});








router.get('/:id', async (req, res) => {

    try {

        const data = await Users.findById(req.params.id);

        data ?

 res.send({ msg: 'user info found successfully', data }):

 res.send({ msg: 'Data not found' });

    } catch (err) {

        res.send({ msg: err.message });

    }



});



router.post('/post', async (req, res) => {

    try {

        const data = await Users.create(req.body);

  res.send({ msg: 'user found successfully', data });

    } catch (err) {

        res.send({ msg: err.message });

    }

});



router.put('/put/:id', async (req, res) => {

    try {

        await Users.findByIdAndUpdate(req.params.id, req.body);

        res.send({ msg: 'user updated successfully' });

    } catch (err) {

        res.send({ msg: err.message });

    }

});



export default router;

