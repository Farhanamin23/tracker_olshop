import mongoose from 'mongoose'

const UserShema = new mongoose.Schema({
  name: {
    type:String,
    require: true
  },
  email: {
    type:String,
    require: true
  },
  password: {
    type:String,
    require: true
  }
})

const usermodel = mongoose.model('Users',  UserShema)

module.exports = usermodel