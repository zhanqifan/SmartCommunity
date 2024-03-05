const mongoose =require('mongoose')
const config = require('./config')

mongoose.connect(`mongodb://${config.DBHOST}:${config.DBPORT}/${config.DBNAME}`)
