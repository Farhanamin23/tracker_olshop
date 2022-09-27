import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  transactionid :{type:String, require:true},
  total:{type: Number, require:true},
  type:{type: String, require:true},
  katagori:{type: String, require:true},
  image:{type:String, require:true },
  deskripsi:{type: String, require:true},
  tanggal:{type: Date, require:true}
})

const transactionModel = mongoose.model("transaction", transactionSchema);

export default transactionModel