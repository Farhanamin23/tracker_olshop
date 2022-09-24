import express from 'express'
import moment from 'moment'
import Transaction  from '../model/Transaction'

const router = express.Router();

router.post('/add-transaction',  async function (req,res) {  
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

router.post('/edit-transaction', async function (req,res) {  
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

export default router