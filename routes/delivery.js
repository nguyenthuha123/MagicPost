var express = require('express'); 
const deliveryModel = require('../models/deliveryModel');
const categoryModel = require('../models/categoryModel');
const instructionModel = require('../models/IntructionModel');


const {checkSingleSession, checkMultipleSession, checkLoginSession} = require('../middleware/auth'); 
var router = express.Router(); 


// show delivery page
router.get('/', checkMultipleSession(['user', 'admin']), async(req, res) =>{
    var deliveryList = await deliveryModel.find({}).populate('category'); 
      res.render('delivery/index', {deliveryList}); 
})

// xu li form add
// 1. show form add
router.get('/add', checkSingleSession, async(req, res) => {
    var categoryList = await categoryModel.find({});
    var instrucList = await instructionModel.find({});
    res.render('delivery/add', {categoryList, instrucList}); 
})

router.post('/add', async(req, res) =>{
    try{
        var delivery = req.body; 
        await deliveryModel.create(delivery); 
        res.redirect('/delivery'); 
    }
    catch(err){
        //if user nhap sai
        if(err.name === 'ValidationError'){
            let InputErrors = {};
            //chay loop error in field
            for(let field in err.errors){
                InputErrors[field] = err.errors[field].message; 
            }
            //render -> add and show error ben fe
            res.render('delivery/add', {InputErrors, delivery});
        } 
    }
})

//xu lu edit
router.get('/edit/:id' ,checkLoginSession,  async(req, res) => {
    var id = req.params.id; 
    var categoryList = await categoryModel.find({}); 
    var instrucList = await instructionModel.find({});
    var delivery = await deliveryModel.findById(id);
    res.render('delivery/edit', {categoryList, instrucList, delivery});
})

//onclick
router.post('/edit/:id', checkLoginSession,  async(req, res)=>{
    try{
        var getdatabylink = req.params.id;
        var getdatabyform = req.body
        await deliveryModel.findByIdAndUpdate(getdatabylink, getdatabyform);
        res.redirect('/delivery'); 
    }
    catch(err){
        if(err.name === 'ValidationError'){
            let InputErrors = {};
            //chay loop error in field
            for(let field in err.errors){
                InputErrors[field] = err.errors[field].message; 
            }
            //render -> add and show error ben fe
            res.render('delivery/edit', {InputErrors, getdatabyform });
        } 
    }
})

//delete
router.get('/delete/:id', checkLoginSession, async(req, res) =>{
    var id = req.params.id; 
    await deliveryModel.findByIdAndDelete(id); 
    res.redirect('/delivery'); 
})

module.exports = router;
