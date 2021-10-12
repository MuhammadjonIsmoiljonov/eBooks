const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAdmin = async(req, res, next)=>{
      const token = req.cookies.jwt
      try {
            const decoded = jwt.verify(token, 'fazliddin')
            const user = await User.findById(decoded.id)
            if(user.email==='fazliddin@gmail.com'){
                  res.render('fileUploadForm')
                  next()
            }
            res.redirect('/')
            next()
      } catch (error) {
            res.redirect('/')
            next()
      }
}

module.exports = {requireAdmin}