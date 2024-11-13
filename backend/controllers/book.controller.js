const connection = require('../config/db');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

exports.regBook = async(req,res)=>{
    try{
        const {name , bookId,author} = req.body;
        if(!name || !bookId || !author){
            return res.status(404).json({
                success:false,
                message:"Data Missing",
            });
        }
        try{
            const checkQuery = 'SELECT * FROM books WHERE bookId = ?';
            const [existingBook] = await connection.promise().query(checkQuery, [bookId]);

            if (existingBook.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Book with this bookId already exists",
                });
            }

            const query = 'INSERT INTO books (name , bookId,author) VALUES (?, ?, ?)'
        const [result] = await connection.promise().query(query,[name,bookId,author]);
        return res.status(200).json({
            success:true,
            message:"Book Inserted SuceessFully"
        })
        }
        catch(err){
            console.log("Error-->",err);
            return res.status(500).json({
                success:false,
                message:"Error while inserting book in db",
                data:err.message
            });
        }
       
    }
    catch(e){
         console.log("Error  in reg Book Controller",e);
         return res.status(500).json({
            success:false,
            message:e.message,
         })
    }
}

exports.getAllBooks = async(req,res)=>{
      try{
        try{
            const query = 'select * from books'
            const [result] = await connection.promise().query(query);
            console.log(result);
            return res.status(200).json({
                success:true,
                message:"all books fetched",
                data:result
            });
        }
        catch(err){
            console.log("Error-->",err);
            return res.status(500).json({
                success:false,
                message:"Error while inserting book in db",
                data:err.message
            });
        }
       
      }
      catch(e){
        console.log("Error ",e);
        return res.status(500).json({
            success:false,
            message:e.message,
        })
      }
}
exports.updateBookInfo= async(req,res)=>{
    try{
       const {bookId,author,name} = req.body;

       if(!bookId){
        return res.status(404).json({
            success:false,
            message:'id missing'
        });
       }
  
       try{
        const query = 'UPDATE BOOKS SET name = ? , author = ? where bookId = ?';
       const [result] = await connection.promise().query(query,[name,author,bookId]);
       return res.status(200).json({
        message:"Data Updated",
        success:true,
        data:result
       });

       }
       catch(err){
        console.log("Error-->",err);
            return res.status(500).json({
                success:false,
                message:"Error while inserting book in db",
                data:err.message
            });
       }
      
      
    }
    catch(e){
        console.log("Error  in reg Book Controller",e);
        return res.status(500).json({
           success:false,
           message:e.message,
        })
   }
}

exports.deleteBook= async(req,res)=>{
    try{
       const {bookId} = req.body;

       if(!bookId){
        return res.status(404).json({
            success:false,
            message:'id missing'
        });
       }
  
       try{
        const query = 'DELETE FROM BOOKS  BOOKS  where bookId = ?';
       const [result] = await connection.promise().query(query,[bookId]);
       return res.status(200).json({
        message:"Book Deleted",
        success:true,
        data:result
       });
       
       }
       catch(err){
        console.log("Error-->",err);
            return res.status(500).json({
                success:false,
                message:"Error while Deleting book in db",
                data:err.message
            });
       }
      
      
    }
    catch(e){
        console.log("Error  in reg Book Controller",e);
        return res.status(500).json({
           success:false,
           message:e.message,
        })
   }
}
exports.uploadImage = async(req,res)=>{
    try{
         const file = req.files.file;
         console.log("File-->",file);
        
         const result = await uploadImageToCloudinary(file,'StudyNotion');

         return res.status(200).json({
            success:true,
            message:"File Uploaded to cloudinary successFully ",
            data:result
         });
         


    }
    catch(e){
        console.log("Error ",e);
        return res.status(500).json({
            success:false,
            message:e.message,
        })
    }
}
