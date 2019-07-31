'use strict'

const express = require('express')
const router = express.Router()
const config = require('../../config.json')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../../helpers/db')
const nodemailer = require('nodemailer')
const User = db.User

router.post('/authenticate', async (req, res) => {

    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({ username })

    if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...userWithoutHash } = user.toObject()
        const token = jwt.sign({ sub: user.id }, config.secret)
        res.json({
            ...userWithoutHash,
            token
        })
    } else {
        res.status(400).json({ message: 'Usuário ou senha incorreto.' })
    }
})

router.post('/register', async (req, res) => {
    const userParam = req.body

    if (await User.findOne({ username: userParam.username })) {
        res.status(400).json({ msg: 'Usuário "' + userParam.username + '" já existe.' })

        return
    }

    const user = new User(userParam)

    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    await user.save()

    delete user.password

    res.json(user)
})

router.post('/forgetPassword', async (req, res) => {
    const email = req.body.email

    if (await User.findOne({ email: email })) {
        
        var from = 'alynealicevieira1@gmail.com'
        var to = req.body.email
        let transporter = nodemailer.createTransport({
            host: 'smtp.googlemail.com',
            port: 465, 
            secure: true, 
            auth: {
                user: 'alynealicevieira1@gmail.com', 
                pass: 'MeAbMeBe21144' 
            }
        })
        
        let mailOptions = {
            from: from,
            to: to, 
            subject: 'Welcome Email ',
            text: 'Acesso a troca de senha: http://localhost:4200/newPassword'                                                                         
        }
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error)
            }
            console.log('Message sent: %s', info.messageId)
        })
    }
})

module.exports = router