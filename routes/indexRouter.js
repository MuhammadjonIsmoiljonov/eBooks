const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const {requireAuth} = require('../middlewares/authMiddleware')
const Files = require('../models/fileModel')
const router = express.Router()

const maxAge = 3*24*60*60
const createToken = (id)=>{
      return jwt.sign({id}, 'fazliddin', {
            expiresIn:maxAge
      })
}

router.get('/',  (req, res)=>{
      
      res.render('index')
})

router.get('/kitoblar', requireAuth, async(req, res)=>{
      const file  = await Files.find().select(['filePath', 'name', 'author','-_id'])
      res.render('kitoblar', {file})
})

router.get('/register', (req, res)=>{
      res.render('register')
})
router.post('/register', async(req, res)=>{
      let user = await User.findOne({email:req.body.email})
      if(user){
            res.status(400).send('Bu email ro`yxatdan o`tgan...')
      }
      user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
      })
      await user.save()
      const token = createToken(user._id)
      res.cookie('jwt', token, {httpOnly:true, maxAge:maxAge*1000})
      res.redirect('/login')
      
})

router.get('/login', (req, res)=>{
      res.render('login')
})
router.post('/login', async(req, res)=>{
      let user = await User.findOne({email:req.body.email})
      if(!user){
           return res.status(400).send('Email yoki password xato')
      }
      const isValidPassword = await bcrypt.compare(req.body.password, user.password)
      if(!isValidPassword){
           return res.status(400).send('Email yoki password xato')
      }
      const token = createToken(user._id)
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).redirect('/')
})




module.exports  = router