const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User,Cart } = require('../models')
const jwt = require('jsonwebtoken')

//user creation
router.post('/user/signup', async (req, res) => {
    detail = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),   //register password in secure way in db
        title: req.body.title
    }

    try {
        let checkmail = await User.findOne({ where: { email: detail.email } });
        if (!checkmail) {
            let result = await User.create(detail)
            console.log(result.id)
           await Cart.create({id: result.id})
            res.redirect('/login/user')
           
        } else {

            res.send({ message: "Email already register" })
        }
    } catch (err) {
        res.send(err)
        console.log('err')

    }

})

//user login
router.post('/user/signin', async (req, res) => {

    let email = req.body.email
    let password = req.body.password

    //check is it register email
    let checkmail = await User.findOne({ where: { email: email } })
    try {
        if (checkmail) {
            let validpassword = bcrypt.compareSync(password, checkmail.password)
            let name = checkmail.title
            if (validpassword) {
                if(checkmail.email=='admin@test.com'){
                    const token = await jwt.sign({ email: checkmail.email }, process.env.SECRETKEY, {
                        expiresIn: '1h'
                    })
                    res.cookie('jwtssD', token, { httpOnly: true, maxAge: 6000000 })
                    console.log(token)
                    // res.render('index',{userData:})
                    //res.send({ message: "login succesful" })
                    // req.flash("success", "Logged in");
                    res.render('admin')

                }else{
                    const token = await jwt.sign({ id: checkmail.id }, process.env.SECRETKEY, {
                        expiresIn: '1h'
                    })
                    res.cookie('jwtssD', token, { httpOnly: true, maxAge: 600000 })
            console.log(token)
                    res.render('main',{checkmail})

                }
               
               

            } else {

                res.send({ message: "invalid Credentials" })



            }
        } else {
            res.send({ message: "invalid Credentials" })

        }
    }
    catch (err) {
        res.send(err)
        console.log('i')
    }



})


module.exports = {
    userRouter: router
}