const mongoose=require('mongoose');//יבוא לספריית מונגוס
const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userName:String,
    pass:String,
    fullName:String,
    
}

);//יצירת סכמה עבור היישות משתמש


module.exports=mongoose.model('users',userSchema);//ייצוא המודל שהוגדר ביחד עם הטבלה בבסיס הנתונים והסכימה שהגדרנו עבורה.