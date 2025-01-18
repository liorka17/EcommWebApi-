const mongoose=require('mongoose');//חיבור לספריית מונגו    
const ProductSchema=mongoose.Schema//יצירת סכימה עבור מוצרים
    ({
        _id:mongoose.Schema.Types.ObjectId,
        Pname:String,
        Price:Number,
        Picname:String,
        Pdesc:String,
        Cid:Number,
        Pid:Number
    });//יצירת סכימה עבור המוצרים
const ProductModel = mongoose.model('Product', ProductSchema);//יצירת מודל דרכו נעבוד מול הדיבי עם המוצרים

module.exports=ProductModel;

