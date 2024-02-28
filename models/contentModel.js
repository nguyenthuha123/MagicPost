var mongoose = require('mongoose'); 
var ContentSchema = mongoose.Schema({
    content: String, 
    quantity: {
        type: Number, 
        min: [0, 'can not enter negative interger'],
    }, 
    price:{
      type: Number, 
      min: [0, 'can not enter negative interger'], 
    }, 
    attachedDoc: String
})
//liên kết 1: 1 vơi bảng chính

var ContentModel = mongoose.model("content", ContentSchema, "content"); 
module.exports = ContentModel; 