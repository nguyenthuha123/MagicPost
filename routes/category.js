var express = require('express'); 
const categoryModel = require('../models/categoryModel');
var router = express.Router(); 
const checkLoginSession = require('../middleware/auth');

//show home category
router.get('/',checkLoginSession, async(req, res) => {
    var categoryList = await categoryModel.find({}); 
    res.render('category/index', {categoryList}); 
})

//delete
router.get('/delete/:id' , async(req, res)=>{
    var id = req.params.id; 
    await categoryModel.findByIdAndDelete(id); 
    res.redirect('/category'); 
})
//add
//1. show form add
router.get('/add', async(req, res) => {
    res.render('category/add'); 
})

router.post('/add', async(req, res) => {
var category = req.body; 
await categoryModel.create(category); 
res.redirect('/category'); 
})

//xử lí edit
router.get('/edit/:id', async(req, res)=>{
    var id = req.params.id;
    var category = await categoryModel.findById(id); 
    res.render('category/edit', {category}); 
})

router.post('/edit/:id', async(req, res) => {
var id = req.params.id; 
var data = req.body
await categoryModel.findByIdAndUpdate(id, data); 
res.redirect('/category'); 
})

module.exports = router;
