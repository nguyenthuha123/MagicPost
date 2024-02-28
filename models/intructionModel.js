var mongoose = require('mongoose'); 
//design collection of table
var InstructionSchema = mongoose.Schema({
       name:{
        type : String, 
        minLength : [3, "name of type instruction can not be smaller than 3 characters"], 
        maxLength: 50
       }  
})//liên kết 1: 1 với bảng chính 

var instructionModel = mongoose.model("instruction", InstructionSchema, "instruction"); 
module.exports = instructionModel; 