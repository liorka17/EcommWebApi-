require('dotenv').config();//פונקציה לטעינת הגדרות מקובץ איאנבי
const http=require('http');
//const port=5000;
const port=process.env.PORT || 5050;
const app=require('./app');
const srv=http.createServer(app);
srv.listen(port,()=>{console.log(`server is up!`)});

