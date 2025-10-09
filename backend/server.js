//start sercer
require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB();

const PORT = 3000;
const HOST = '127.0.0.1';

app.listen(PORT, HOST,()=>{
   console.log(`http://${HOST}:${PORT}`);  
})