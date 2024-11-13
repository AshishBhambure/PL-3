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


/*

npm install --save-dev @types/jsonwebtoken


create database mySqlPr;
use mysqlpr;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

select * from users;

create table books(
 name varchar(255),
 bookId int primary key,
 author int ,
 foreign key (author) references user(userId)
);
INSERT into books (bookId,name,author) values(99,"name",1);
select * from books;
SELECT * FROM books b  INNER JOIN  User u on u.userId = b.author;

*/