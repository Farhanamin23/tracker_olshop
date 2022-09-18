import { response } from "express";

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

router.post('/get-all-resseler' , async function (req , res) {
  try {
    const resseler = await Resseler.find({userid : req.body.userid});
    res.send(resseler)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router