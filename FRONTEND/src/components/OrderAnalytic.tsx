import { Progress } from 'antd';
import React from 'react'
import '../style/analytic.css'

function OrderAnalytic({order}:{
  order :any;
}) {

  const totalOrder = order.length
  const totalSabunOrder = order.filter(orders => orders.jenis==='sabun')
  const totalParfumOrder=order.filter(orders => orders.jenis==='parfum')
  const totalSabunPercentage =(totalSabunOrder.length/totalOrder)*100
  const totalParfumPercentage = (totalParfumOrder.length/totalOrder)*100
  

  const totalStatusTurnover = order.reduce((acc: any, order: any) => acc + order.quantyti, 0)
  const totalStatusPenjualanSabunTurnover = order.filter((order: any ) => order.status==='diterima').reduce((acc : any , order : any) => acc + order.quantyti, 0)
  const totalStatusPenjualanParfumTurnover = order.filter((order: any ) => order.status==='dikembalikan').reduce((acc : any, order : any) => acc + order.quantyti, 0);
  const totalStatusPenjualanSabunTurnoverPercentage = (totalStatusPenjualanSabunTurnover/totalStatusTurnover) *100
  const totalStatusPenjualanParfumTurnoverPercentage =(totalStatusPenjualanParfumTurnover/totalStatusTurnover)*100

  
  const totalTurnover = order.reduce((acc: any, order: any) => acc + order.quantyti, 0)
  const totalPenjualanSabunTurnover = order.filter((order: any ) => order.jenis==='sabun').reduce((acc : any , order : any) => acc + order.quantyti, 0)
  const totalPenjualanParfumTurnover = order.filter((order: any ) => order.jenis==='parfum').reduce((acc : any, order : any) => acc + order.quantyti, 0);
  const totalPenjualanSabunTurnoverPercentage = (totalPenjualanSabunTurnover/totalTurnover) *100
  const totalPenjualanParfumTurnoverPercentage =(totalPenjualanParfumTurnover/totalTurnover)*100
  
  const katagori = [
    'pyary kunyit',
    'pyary nalpamara',
    'pyary pepaya',
    'pyary safron',
    'pyary aloevera',
    'daily parfum Aigner Debut Woman',
    'daily parfum Angel Alien',
    'daily parfum Angel Hearth',
    'daily parfum Angel Woman',
    'daily parfum Baby Poweder Floral',
    'daily parfum Bacarat',
    'daily parfum Benneton Pink',
    'daily parfum Beyonce',
    'daily parfum Bodyshop Coco',
    'daily parfum Bodyshop White Musk',
    'daily parfum Bodyshop Oceanus',
    'daily parfum Britney Fantasy',
    'daily parfum Bulgari Rose',
    'daily parfum Bulgari Rose Goldea',
    'daily parfum Burbery London Woman',
    'daily parfum Bulgary Omnia Ametyste',
    'daily parfum Bulgary Omnia Cystaline',
    'daily parfum Bulgary Pour Femmer',
    'daily parfum CA By Night',
    'daily parfum CH 212 Sexy Woman',
  ]
  
  return (
    <div className='analytic'>
    <div className='row'>
      <div className='col-md-4 mt-3'>
        <div className='transaction-count1'>
          <h4>Total Orang Order :  {totalOrder} </h4>
          <h5>Orang Yang Order Sabun :  {totalSabunOrder.length}</h5>
          <h5>Orang Yang Order Parfum : {totalParfumOrder.length}</h5>
            <div className='progress-bars'>
              <Progress className=' mx-5' strokeColor="green" type="circle" percent={totalSabunPercentage.toFixed(0)} />
              <Progress strokeColor="red" type="circle" percent={totalParfumPercentage.toFixed(0)} />
            </div>
        </div>
      </div>
      <div className='col-md-4 mt-3'>
        <div className='transaction-count'>
          <h4>Total Semua pcs : {totalTurnover} pcs</h4>
          <h5>Jumlah Sabun   : {totalPenjualanSabunTurnover} pcs</h5>
          <h5>Jumlah Parfum: {totalPenjualanParfumTurnover} pcs</h5>
            <div className='progress-bars'>
              <Progress className=' mx-5' strokeColor="green" type="circle" percent={totalPenjualanSabunTurnoverPercentage.toFixed(0)} />
              <Progress strokeColor="red" type="circle" percent={totalPenjualanParfumTurnoverPercentage.toFixed(0)} />
            </div>
        </div>
      </div>
      <div className='col-md-4 mt-3'>
        <div className='transaction-count'>
          <h4>Status Barang : {totalStatusTurnover} pcs</h4>
          <h5>Barang Diterima  : {totalStatusPenjualanSabunTurnover} pcs</h5>
          <h5>Barang Di Kembalikan: {totalStatusPenjualanParfumTurnover} pcs</h5>
            <div className='progress-bars'>
              <Progress className=' mx-5' strokeColor="green" type="circle" percent={totalStatusPenjualanSabunTurnoverPercentage.toFixed(0)} />
              <Progress strokeColor="red" type="circle" percent={totalStatusPenjualanParfumTurnoverPercentage.toFixed(0)} />
            </div>
        </div>
      </div>
    </div>
      <div className="row">
        <div className="col-md-6">
          <div className='sabun-catagory-analisis'>
            <hr />
            <h3>Penjualan Sabun</h3>
            {katagori.map((katagori)=> {
            const total = order.filter(t=>t.jenis ==='sabun' && t.katagori===katagori).reduce((acc, t) => acc +t.quantyti,0)
              return (
            total > 0 && <div className='catagory-card'>
                <h5>{katagori}</h5>
                <Progress  percent={( ( total / totalPenjualanSabunTurnover)*100 ).toFixed(0)}/>
              </div>
            )})}
          </div>
        </div>
        <div className="col-md-6">
          <div className='parfum-catagory-analisis'>
            <hr />
            <h3> Penjualan Parfum</h3>
            {katagori.map((katagori)=> {
            const total = order.filter(t=>t.jenis ==="parfum" && t.katagori===katagori).reduce((acc, t) => acc +t.quantyti,0)
              return (
                total > 0 && <div className='catagory-card'>
                <h5>{katagori}</h5>
                <Progress  percent={( ( total / totalPenjualanParfumTurnover)*100 ).toFixed(0)}/>
              </div>
            )})}
          </div>
        </div>
      </div>
      <hr />
      </div>
  )
}

export default OrderAnalytic