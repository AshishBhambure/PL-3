const mysql = require('mysql2');

const connection = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'Ashish@2003',
    database:'mySqlPr',
    
});

const connect = connection.connect((err)=>{
    if(err){
        console.log("Error :: ",err);
        return res.status(500).json({
            success:false,
            message:"DataBase Connection Failed",
            data:err.message
        });
    }
    else{
         console.log("Connecction Success of MySql ");
    }

})

module.exports = connection;

