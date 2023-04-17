const path = require('path')
const multer = require('multer')

// const storage  = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null, './pdfs')
//     },
//     filename: function(req,file,cb){
//         let ext=path.extname(file.originalname)
//         cb(null, Date.now()+ext)
//     }
// })

// pdf upload using multer planning to do in the future purpose, I have used earlier it was working perfectly 
// due to some issue we have revert to an alternative

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../pdfs');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 25 * 1024 * 1024 } // limit file size to 25MB
  }).single('pdf');
  
  // Middleware function for handling file uploads
  const uploadPdfMiddleware = (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        // Handle file upload errors
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  };
// const upload=multer({
//     storage:storage,
//     limits: { fieldSize: 25 * 1024 * 1024 },
//     fileFilter:function(req,file,callback){
//         if(file.mimetype==="application/pdf"){
//             callback(null,true)
//         }
//         else{
//             console.log('only pdfs sir or madammmm')
//             callback(null, false)
//         }
//     }
// })

module.exports=uploadPdfMiddleware