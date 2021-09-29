var express = require('express')

var spacewarRoutes = require('./spacewar')


const router = express.Router()

router.use('/v1/spacewar', spacewarRoutes)



module.exports = router
