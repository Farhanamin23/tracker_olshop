import express from 'express'
import { type } from 'os'
const moment = require('moment')
const Transaction  = require('../model/Transaction')
const multer = require('multer')
const path = require('path')

const router = express.Router();

const storage= multer.diskStorage({
    destination: ( req, file, cb ) => {
    cb(null, './image/')
    },
    filename:(req,file,cb) => {
      console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
    }
})


const upload = multer({storage : storage})

router.post('/add-transaction', upload.single('image'), async function (req,res) {  
  try {
    const newtransaction = new Transaction({
      userid: req.body.userid,
      total: req.body.total,
      type : req.body.type,
      katagori: req.body.katagori,
      image:req.file?.path,
      deskripsi: req.body.deskripsi,
      tanggal : req.body.tanggal
    })
    await newtransaction.save();
    res.send('Transaksi Berhasil Di Tambah')
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/edit-transaction', upload.single('image'), async function (req,res) {  
  try {
    await Transaction.findOneAndUpdate({_id: req.body.transactionId}, req.body.payload)
    res.send('Transaksi Berhasil Di Update')
  } catch (error) {
    res.status(400).json(error)
  }
})


router.post("/delete-transaction", async function (req, res) {
  try {
    await Transaction.findOneAndDelete({_id : req.body.transactionId})
    res.send("Transaction Delete Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});


router.post("/get-all-transaction", async (req, res) => {
  const { frequency, selectedRange , type } = req.body;
  try {
    const transactions = await Transaction.find({
      ...(frequency !== "custom"
        ? {
            tanggal: {
              $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
            },
          }
        : {
            tanggal: {
              $gte: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),
      userid: req.body.userid,
      ...(type!=='semua' && {type})
    });

    res.send(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router