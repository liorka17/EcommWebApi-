const mongoose = require('mongoose'); // חיבור לספריית מונגו

const CategorySchema = mongoose.Schema // יצירת סכימה עבור קטגוריות
    ({
        _id: mongoose.Schema.Types.ObjectId,
        Cname: String,
        Cdesc: String,
        Cid: Number
    }); // יצירת סכימה עבור הקטגוריות

const CategoryModel = mongoose.model('Category', CategorySchema); // יצירת מודל דרכו נעבוד מול הדיבי עם הקטגוריות

module.exports = CategoryModel;
