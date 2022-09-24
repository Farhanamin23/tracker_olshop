import express from 'express'
import Order from '../model/Order'
const moment = require('moment')
const router = express.Router();

router.post('/add-order', async function (req, res) {
  try {
    const neworder = new Order(req.body);
    await neworder.save();
    res.send('Order Berhasil DI Tambah')
  } catch (error) {
    res.status(400).json(error)
  }
});

router.post('/edit-order' , async function (req , res) {
  try {
    await Order.findOneAndUpdate({_id : req.body.orderId}, req.body.payload)
    res.send('Order Berhasil Di Update')
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/delete-order' , async function (req , res) {
  try {
    await Order.findOneAndDelete({_id : req.body.orderId})
    res.send('Order Berhasil Di Hapus')
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/get-all-order', async (req, res) => {
  const { frequency , selectedRange , jenis, status } = req.body ;
  try {
    const order = await Order.find({
    ...(frequency !== 'custom' ? {
      tanggal :{
        $gt:moment().subtract(Number(req.body.frequency),'d').toDate(),
      },
    }: {
      tanggal : {
        $gte : selectedRange[0],
        $lte : selectedRange[1]
      }
    }),
    userid : req.body.userid,
    ...(jenis!=='semua' && {jenis}),
    ...(status!=='semua' && {status})
  });
  res.send(order)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router