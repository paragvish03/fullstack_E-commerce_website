require('dotenv').config()
const express = require('express');
const {sequelize} = require('./models');
const flash = require('connect-flash')
const session = require('express-session')
const app = express();
const{userRouter,productRoutes,cartRoutes} = require('./routes');
const cookieParser = require('cookie-parser');


//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(userRouter)
app.use(productRoutes)
app.use(cartRoutes)
app.set('view engine','ejs')
app.use(express.static('public'))




//basic routes
app.get('/',(req,res)=>{
   
    res.render('main')
})
app.get('/about',(req,res)=>{
   
    res.render('about')
})


//login/signup
app.get('/login/user',(req,res)=>{
   
    res.render('login')
})



//server config
app.listen(process.env.PORT || 2000,async()=>{
    await sequelize.sync({force:false})    //mapping object into db tables
    console.log("\n Table has created") 
})