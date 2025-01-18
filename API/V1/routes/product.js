const express=require('express');
const router=express.Router();
//const productRouter=require('../controllers/product');
const{getAll,getById,addNew,updateById,deleteById}=require('../controllers/product');


router.get('/',getAll);
router.get('/:id',getById);
router.post('/',addNew);
router.put('/:id',updateById);
router.delete('/:id',deleteById);

module.exports=router;