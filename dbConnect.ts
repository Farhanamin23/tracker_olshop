const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://farhan:farhan@cluster0.aughysi.mongodb.net/farhan-app', {
  useNewUrlParser: true,
  useUnifiedTopology:true
})
const connection = mongoose.connection

connection.on('error', err => console.log(err));

connection.on('connected', () => console.log('mongo succes connetion'))

