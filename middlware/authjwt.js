
const {User}= require('../models');
const jwt = require('jsonwebtoken')


async function  check_token(req,res,next){

let token = req.cookies.jwtssD
if (token) {
    //verify
    const user = await jwt.verify(token,process.env.SECRETKEY)
    if(user){
       req.UserID =user.id
       req.Usermail =user.email
      
        next();
    }else{
       res.status(401).send({msg : 'auth token expired'})
       //res.render('login')
		return;
    }

} else {
   // res.clearCookies('token')
 //res.redirect('/')
    res.render('login')

    //return res.render('login');
}



}


async function check_roles(req, res, next){
  let email = req.Usermail
  let result = await User.findOne({where:{email:email}})

  if( result.title =='admin@test.com' ){
    next();
  }
  else{
    res.render('notallowed')
  }
}

module.exports = {
    check_token,
    check_roles
}