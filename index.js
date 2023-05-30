const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors())

const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//For saving the space in server i can also save this images in s3 bucket and then use the url of that image in my database
app.use('/uploads', express.static('uploads'));

const connectDB = require('./config/db');
connectDB()

app.use('/',require('./routes/routes'));


let port = process.env.PORT || 4001;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})