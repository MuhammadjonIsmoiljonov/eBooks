const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new Schema({
      fileName:{
            type:String,
            required:true
      },
      filePath:{
            type:String,
            required:true
      },
      fileType:{
            type:String,
            required: true
      },
      fileSize:{
            type:String,
            required:true
      },
      name:{
            type:String,
            required:true
      },
      author:{
            type:String,
            required:true
      }
})

module.exports = mongoose.model('files', fileSchema)