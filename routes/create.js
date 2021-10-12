const express = require('express')
const Files = require('../models/fileModel')
const { upload } = require('../helpers/fileHelper')
// const {requireAdmin} = require('../middlewares/adminMiddleware')
const { requireAuth } = require('../middlewares/authMiddleware')
const router = express.Router()

router.get('/create', (req, res) => {
      res.render('fileUploadForm')
})

router.post('/create', requireAuth, upload.single('file'), async (req, res) => {
      try {
            // const file = new Files({
            //       name: req.body.name,
            //       author: req.body.author,
            //       fileName: req.file.originalname,
            //       fileType: req.file.mimetype,
            //       filePath: req.file.path,
            //       fileSize: req.file.size,
            // })
            // console.log(req.file)
            // console.log(req.file)
            // await file.save()
            // res.redirect('/kitoblar')
      } catch (error) {
            console.log(error.message)
      }
})

module.exports = router