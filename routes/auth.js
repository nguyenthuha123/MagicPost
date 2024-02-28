var express = require('express'); 
const userModel = require('../models/userModel');
var router = express.Router(); 
//import bcrypt
var bcrypt = require('bcryptjs'); 
//random value
var sail = 8; 

router.get('/register', (req, res) =>{
    res.render('auth/register', {layout: 'auth_layout'});
})

router.post('/register',async(req, res)=>{
  try{
    var userRegistration = req.body; 
    var hashPassword = bcrypt.hashSync(userRegistration.password, sail);

    var user = {
        username : req.body.username,
        password : hashPassword, 
        role: req.body.role
    }
    await userModel.create(user);
    // console.log('add success');
    res.redirect('auth/login');
  } catch(err){
    if(err.name === 'ValidationError'){
        let InputErrors = {};
        for(let field in err.errors){
            InputErrors[field] = err.errors[field].message; 
        }
        res.render('auth/register', {InputErrors, userRegistration});
    } 
}
})

router.get('/login', (req, res) =>{
    res.render('auth/login', {layout: 'auth_layout'});
})

router.post('/login',async(req, res)=>{
  
    var login = req.body; 
    //check username db va username login by key findOne
    var user = await userModel.findOne({username: login.username}); 
    if(user){
      var hash = bcrypt.compareSync(login.password,  user.password); 
      if(hash){
        // res.send("<h1>Login succeed</h1>")  
        req.session.username = login.username;
        req.session.role = user.role; 

        if(req.session.role== "admin")
        res.redirect('/admin')
        else
        res.redirect('/user')
      }
      else{
        // res.send("<h1>login fail</h1>");
        res.redirect('/auth/login');
      }
    }
})

router.get('/logout', (req, res) =>{
  req.session.destroy();
  res.redirect("/auth/login");
})
router.get('/test', (req, res) =>{
    res.render('auth/test'); 
})

module.exports = router;