var express = require('express'); 
const instructionModel = require('../models/IntructionModel');
var router = express.Router(); 

//show all instruction
router.get('/', async(req, res) =>{
    var instrucList = await instructionModel.find({}); 
    res.render('instruction/index', {instrucList}); 
})

//delete
router.get('/delete/:id' , async(req, res)=>{
    var id = req.params.id; 
    await instructionModel.findByIdAndDelete(id); 
    res.redirect('/instruction'); 
})
//add
//1. show form add
router.get('/add', async(req, res) => {
    res.render('instruction/add'); 
})

router.post('/add', async(req, res) => {
var instruction = req.body; 
await instructionModel.create(instruction); 
res.redirect('/instruction'); 
})

//xử lí edit
router.get('/edit/:id', async(req, res)=>{
    var id = req.params.id;
    var instruction = await instructionModel.findById(id); 
    res.render('instruction/edit', {instruction}); 
})

router.post('/edit/:id', async(req, res) => {
var id = req.params.id; 
var data = req.body
await instructionModel.findByIdAndUpdate(id, data); 
res.redirect('/instruction'); 
})
module.exports = router; 