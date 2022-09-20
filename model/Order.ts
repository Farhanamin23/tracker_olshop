import mongoose  from "mongoose";

const ordeSchema = new mongoose.Schema ({
  userid :{type :String , require:true},
  jenis:{type: String, require:true},
  katagori:{type: String , required: true},
  marketplace:{type: String, require:true},
  order:{type:String, require:true },
  pembeli:{type: String, require:true},
  quantyti:{type: Number, require:true},
  total:{type : Number , require : true},
  status:{type: String, require: true},
  tanggal: {type: Date, require:true}
})

const orderModel = mongoose.model('Order' , ordeSchema)

module.exports = orderModel