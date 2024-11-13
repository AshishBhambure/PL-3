
const cloudinary = require('cloudinary').v2;
// floder name  :: StudyNotion
const connectToCloudinary = () =>{
 try{
    //  require('dotenv').config();
    cloudinary.config({
        cloud_name:"dsbjv3jws",
        api_key:479447944651132,
        api_secret:"CHS8RWVPvcaOz72z2OsQCORCM0E",
        secure:true,

    })
 }
 
 catch(e)
 {
    console.log("Error Ehile Estabilishing Connection With Cloudinary  , ",e)
 }
}

module.exports  = connectToCloudinary;

// ./src/**/*.{js,jsx,ts,tsx}

/*

npm install --save-dev @types/jsonwebtoken

tailwind setup 
-->
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


index.css
@tailwind base;
@tailwind components;
@tailwind utilities;


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


