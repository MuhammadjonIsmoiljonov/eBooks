const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
      name:{
            type:String,
            required:true,
            maxlength:50,
            minlength:3
      },
      email:{
            type:String,
            unique:true,
            required:true,
            maxlength:255,
            minlength:5
      },
      password:{
            type:String,
            required:true,
            maxlength:255,
            minlength:5 
      }

})

userSchema.pre('save', async function(next){
      const salt = await bcrypt.genSalt()
      this.password = await bcrypt.hash(this.password, salt)
      next()
})
module.exports = mongoose.model('Users', userSchema)