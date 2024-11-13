const express = require('express');
const connection = require('./config/db');
const bookRoutes = require('./routes/bookroutes');
const connectToCloudinary = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors(
    {
        credentials:true,
        origin:"*"
    }
));

connectToCloudinary();
app.listen(PORT,()=>
    console.log("App Started on Port :: ",PORT)
);
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
}));

app.use(bookRoutes);
app.use(userRoutes);


