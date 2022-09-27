import mongoose from 'mongoose'

const ResselerSchema = new mongoose.Schema({
  resellerrid :{ type :String , require:true },
  nama: { type:String, require: true },
  alamat: { type:String, require: true },
  whatsapp: { type:String, require: true },
  email: { type:String, require: true },
  katagori: { type:String, require: true },
  status: { type:String, require: true },
  tanggal: { type:Date, require: true},
})

const resselermodel = mongoose.model('Reseller',  ResselerSchema)

export default resselermodel