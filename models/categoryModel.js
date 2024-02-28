var mongoose = require('mongoose'); 
//design collection of table
var CategorySchema = mongoose.Schema({
       name: String
})

var categoryModel = mongoose.model("category", CategorySchema, "category"); 
module.exports = categoryModel; 