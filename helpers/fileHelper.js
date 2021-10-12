
const multer = require('multer')
const path = require('path')

const Storage = multer.diskStorage({
      destination:function(req, file, cb){
            cb(null, 'uploads/img')
      },
      filename: function(req, file, cb){
            cb(null,file.originalname + '-'+ Date.now() )
      }
})

const filefilter = (req, file, cb)=>{
      const fileTypes = /jpeg|jpg|png|gif|jfif/
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
      const mimetype = fileTypes.test(file.mimetype)
      if(mimetype && extname){
            cb(null, true)
      }else{
            cb(new Error ('faqatgina rasm yuklash mumkin...'))
      }
      

}
// this code goes inside the object passed to multer()
// function fileFilter (req, file, cb) {    
//       // Allowed ext
//        const filetypes = /jpeg|jpg|png|gif/;
    
//      // Check ext
//       const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
//      // Check mime
//      const mimetype = filetypes.test(file.mimetype);
    
//      if(mimetype && extname){
//          return cb(null,true);
//      } else {
//          cb('Error: Images Only!');
//      }
//     }
const upload = multer({
      storage:Storage,
      fileFilter:filefilter,
})

module.exports = {upload}