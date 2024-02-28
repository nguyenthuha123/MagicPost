var mongoose = require('mongoose')
var deliverySchema = mongoose.Schema({
   senderName:{
      type: String, 
      //validate
      minLength: [3,"sender name can not be smaller than 3 characters" ], 
      maxLength: 30 
    }, 
   addressSender: {
      type: String, 
      minLength: [3,"address can not be smaller than 3 characters" ], 
      maxLength: 50
    },  
   phonenumberSD:{
      type: Number, 
      min: [0, 'can not enter negative interger'],
  }, 
   postalCode: {
      type: Number, 
      min: [0, 'can not enter negative interger'],
  },  

   category:{
      type: mongoose.SchemaTypes.ObjectId, 
      ref: 'category'
    }, 

    content: String, 
    quantity: {
        type: Number, 
        min: [0, 'can not enter negative interger'],
    }, 
    price:{
      type: Number, 
      min: [0, 'can not enter negative interger'], 
    }, 

   attachedDoc: String, 
   specialSV: String, 
   instruction:{
      type: mongoose.SchemaTypes.ObjectId, 
      ref: 'instruction'
   }, 
   deliveryDate: Date, 
   receiverName: String, 
   receiverAddress: String, 
   numberPhoneReceiver:{
      type: Number, 
      min: [0, 'can not enter negative interger'], 
   } , 
   mainfreight: {
      type: Number, 
      min: [0, 'can not enter negative interger'], 
   } ,  
   surcharge:{
      type: Number, 
      min: [0, 'can not enter negative interger'], 
   } ,  
   totalPrice:{
      type: Number, 
      min: [0, 'can not enter negative interger'], 
   } , 
   receiverRevenue: {
      type: Number, 
      min: [0, 'can not enter negative interger'], 
   } , 
   receiverDate: Date
})
var deliveryModel = mongoose.model("delivery", deliverySchema, "delivery"); 
module.exports = deliveryModel;