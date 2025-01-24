require('dotenv').config(); // כדי לוודא שמשתני הסביבה נטענים
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';


const express = require('express');
const app = express();
const productRouter = require('./API/V1/routes/product');
const catRouter = require('./API/V1/routes/categories');
const userRouter=require('./API/V1/routes/user');
const morgan = require('morgan');
const mongoose = require('mongoose');
const secure = require('./API/V1/middlewares/secure');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoConnStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@liorka17.goeqk.mongodb.net/WebApi2025`;

mongoose.connect(mongoConnStr, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err.message));

app.use(secure);
app.use('/product', productRouter);
app.use('/categories', catRouter);
app.use('/user',userRouter);

app.all('*', (req, res) => {
    return res.status(404).json({ msg: 'Not Found 404' });
});



module.exports = app;
