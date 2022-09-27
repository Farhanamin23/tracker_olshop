import { Progress } from 'antd'
import React from 'react'
import '../style/analytic.css'

function Analytic({transaction}:{
  transaction : any}
  ){
  const totalTransaction = transaction.length
  const totalPemasukanTransaction = transaction.filter((transaction: any) => transaction.type==='Pemasukan')
  const totalPengeluaranTransaction = transaction.filter((transaction : any) => transaction.type==='Pengeluaran')
  const totalPemasukanTransactionPercentage= (totalPemasukanTransaction.length/totalTransaction)*100
  const totalPengeluaranTransactionPercentage= (totalPengeluaranTransaction.length/totalTransaction)*100
  
  const totalTurnover = transaction.reduce((acc: any, transaction: any) => acc + transaction.total, 0)
  const totalPemasukanTurnover = transaction.filter((transaction: any ) => transaction.type==='Pemasukan').reduce((acc : any , transaction : any) => acc + transaction.total, 0)
  const totalPengeluaranTurnover = transaction.filter((transaction: any ) => transaction.type==='Pengeluaran').reduce((acc : any, transaction : any) => acc + transaction.total, 0);
  const totalPemasukanTurnoverPercentage = (totalPemasukanTurnover/totalTurnover) *100
  const totalPengeluaranTurnoverPercentage =(totalPengeluaranTurnover/totalTurnover)*100 
  

  const katagoris =[ 'Penjualan Shope', 'Penjualan Tokopedia' , 'Penjualan Tiktok' , 'Penjualan Offline' , 'Gaji Admin' , 'Biaya Packaging' , 'Pembelian Produk' , 'Biaya Sewa Ruko']
  return (
    <div className='analytic'>
    <div className='row'>
      <div className='col-md-4 mt-3'>
        <div className='transaction-count1'>
          <h4>Total Semua Transaksi {totalTransaction} </h4>
          <h5>Pemasukan  :{totalPemasukanTransaction.length}</h5>
          <h5>Pengeluaran :{totalPengeluaranTransaction.length}</h5>
            
            <div className='progress-bars'>
              <Progress className=' mx-5' strokeColor="green" type="circle" percent={totalPemasukanTransactionPercentage} />
              <Progress strokeColor="red" type="circle" percent={totalPengeluaranTransactionPercentage} />
            </div>
        </div>
      </div>
      <div className='col-md-4 mt-3'>
        <div className='transaction-count'>
          <h4>Total Semua Transaksi : Rp.{totalTurnover} </h4>
          <h5>Pemasukan  : Rp.{totalPemasukanTurnover}</h5>
          <h5>Pengeluaran : Rp.{totalPengeluaranTurnover}</h5>
            <div className='progress-bars'>
              <Progress className=' mx-5' strokeColor="green" type="circle" percent={totalPemasukanTurnoverPercentage} />
              <Progress strokeColor="red" type="circle" percent={totalPengeluaranTurnoverPercentage} />
            </div>
        </div>
      </div>
    </div>
      <hr />
    <div className='row '>
      <div className='col-md-6'>
        <div className='pemasukan-catagory-analysis'>
          <h3>Pemasukan Dari Setiap Katgori</h3>
          {katagoris.map((katagori) => {
            const total = transaction.filter((t: { type: string; katagori: any })=>t.type==='Pemasukan' && t.katagori===katagori).reduce((acc: any, t: { total: any }) =>acc + t.total,0)
            return ( 
            total >0 &&<div className='catagory-card'>
              ,<h5>{katagori}</h5>
              <Progress  percent= { ((total / totalPemasukanTurnover )*100)}/>
            </div>
          )})}
        </div>
      </div>
      <div className='col-md-6'>
        <div className='pengeluaran-catagory-analysis'>
        <h3>Pengeluaran Dari Setiap Katgori</h3>
          {katagoris.map((katagori) => {
            const total = transaction.filter((t: { type: string; katagori: any })=>t.type==='Pengeluaran' && t.katagori===katagori).reduce((acc: any, t: { total: any }) =>acc + t.total,0)
            return ( 
            total >0 &&<div className='catagory-card'>
              ,<h5>{katagori}</h5>
              <Progress  percent= { ((total / totalPengeluaranTurnover )*100)}/>
            </div>
          )})}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Analytic