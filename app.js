const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/indexRouter')
const createRouter = require('./routes/create')


const app = express()

//database connection

mongoose.connect('mongodb+srv://sang:test123@cluster0.op4fn.mongodb.net/kitoblar?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
}).then((result) => {
      console.log('monodbga ulanish bajarildi')
}).catch((err) => {
      console.log('mongodbga ulanishda xatolik')
})

//middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cookieParser())

//view engine
app.set('view engine', 'ejs')

//routes
app.use('/', indexRouter)
app.use('/', createRouter)


//server connection
app.listen(3000, () => {
      console.log('server 3000-portda ishlayapti...')

})