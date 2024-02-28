var mongoose = require('mongoose'); 
var UserSchema = mongoose.Schema(
    {
        username : {
           type:  String, 
           unique: true, 
           required: true
        }, 
        password:{
            type: String, 
            require: true
        }, 
        role:{
            type: String, 
            require: true
        },
    }
);
var userModel = mongoose.model('user', UserSchema, 'user');
module.exports = userModel; 