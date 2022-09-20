import { response } from "express";
import moment from "moment";

const express = require('express')
const Resseler = require('../model/Resseler')
const router = express.Router()


router.post('/add-resseler', async function (req, res) {
    try {
      const newresseler = new Resseler(req.body);
      await newresseler.save();
      res.send('Resseler Berhasil Di  Tambah')
    } catch (error) {
      res.status(400).json(error)
    }
})

router.post('/edit-resseler', async function (req, res) {
  try {
    await Resseler.findOneAndUpdate({_id : req.body.resellerId}, req.body.payload)
    res.send('Resseler Berhasil Di Update')
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/delete-resseler', async function (req, res) {
  try {
    await Resseler.findOneAndDelete({_id : req.body.resellerId})
    res.send('Resseler Berhasil Di Hapus')
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/get-all-resseler' , async function (req , res) {
  const {frequency, selectRange , status} = req.body
  try {
    const resseler = await Resseler.find({
      ...(frequency !=='custom' ? {
        tanggal: {
          $gt : moment().subtract(Number(req.body.frequency) , "d").toDate(),
      },
      }: {
        tanggal: {
          $gte : selectRange[0],
          $lte : selectRange[1]
        },
      }),
      userid : req.body.userid,
      ...(status !=='semua' && {status})
    });
    res.send(resseler)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router