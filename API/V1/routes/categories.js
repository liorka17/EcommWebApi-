const express=require('express');
const catrouter=express.Router();

const{getAll,getById,addNew,updateById,deleteById}=require('../controllers/categories');


catrouter.get('/',getAll);
catrouter.get('/:id',getById);
catrouter.post('/',addNew);
catrouter.put('/:id',updateById);
catrouter.delete('/:id',deleteById);



module.exports=catrouter;