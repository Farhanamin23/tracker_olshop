/* eslint-disable react-hooks/rules-of-hooks */
import { AreaChartOutlined, DeleteOutlined, EditOutlined, SearchOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Button, DatePicker, Input, message, Select, Table } from 'antd'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import AddEditOrder from '../components/addEditOrder'
import DefaultLayout from '../components/DefaultLayout'
import OrderAnalytic from '../components/OrderAnalytic'
import Spinner from '../components/spinner'
import '../style/transaction.css'
const { RangePicker} = DatePicker;

function order() {
  const [showAddEditOrderModal, setShowAddEditOrderModal] = useState(false);
  const [loading , setLoading] = useState(false);
  const [orderData, setOrderData]=useState([]);
  const [ frequency , setFrequency ] = useState("7");
  const [jenis , setJenis]=useState('Semua');
  const [status , setStatus]=useState('semua');
  const [selectedRange , setSelectedRange]=useState<any>([])
  const [viewType, setViewType]=useState('table')
  const [selectedItemForEdit, setSelectedItemForEdit]=useState(null)
  
  const getOrder = async ()=> {
    try {
      const user = JSON.parse(localStorage.getItem('farhan-app') || '{}');
      setLoading(true);
      const response = await axios.post ( '/api/order/get-all-order',
      {userid: user._id, frequency, 
        ...(frequency ==='custom' && {selectedRange}),
      jenis, status
      }
      );
      setOrderData(response.data)
      setLoading(false)
    } catch (error) {
      setLoading(false);
      message.error('gagal ambil data')
      
    }
  }

  const deleteOrder = async (record)=> {
    try {
      setLoading(true);
      await axios.post ( '/api/order/delete-order',
      {
        orderId : record._id
      }
      );
      message.success('Order Berhasil Di Hapus')
      getOrder();
      setLoading(false)
    } catch (error) {
      setLoading(false);
      message.error('gagal ambil data')
      
    }
  }

  useEffect(() => {
    getOrder()
  }, [frequency, selectedRange, jenis, status])
  
  const columns = [
    {
      title : "Tanggal",
      dataIndex : "tanggal",
      render : (text : any) => <span>{moment(text).format('DD-MM-YYYY')}</span>
    },
    {
      title : "Name Pembeli",
      dataIndex : "pembeli",
      filterDropdown:({setSelectedKeys, selectedKeys, confirm  }) => {
        return (
        <>
        <Input
        autoFocus 
        placeholder='Cari Berdasarkan Nama'
        value={selectedKeys[0]}
        onChange={(e) => {
          setSelectedKeys(e.target.value?[e.target.value]:[])
          confirm({closeDropDown : false});
        }}
        onPressEnter={() => {
          confirm();
        }}
        onBlur={() => {
          confirm()
        }}
        />
        <Button 
        onClick={() => {
          confirm();
        }} 
        type='primary'
        >Cari
        </Button>
      </>
      )},
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter:(value, record) => {
        return record.pembeli.toLowerCase().includes(value.toLowerCase())
      }
    },
    {
      title : "Marketplace",
      dataIndex : "marketplace"
    },
    {
      title : "Nomor Order",
      dataIndex : "order",
      filterDropdown:({setSelectedKeys, selectedKeys, confirm  }) => {
        return (
        <>
        <Input
        autoFocus 
        placeholder='Cari Berdasarkan Nomor Order'
        value={selectedKeys[0]}
        onChange={(e) => {
          setSelectedKeys(e.target.value?[e.target.value]:[])
          confirm({closeDropDown : false});
        }}
        onPressEnter={() => {
          confirm();
        }}
        onBlur={() => {
          confirm()
        }}
        />
        <Button 
        onClick={() => {
          confirm();
        }} 
        type='primary'
        >Cari
        </Button>
      </>
      )},
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter:(value, record) => {
        return record.order.toLowerCase().includes(value.toLowerCase())
      }
    },
    {
      title : "Jenis Produk",
      dataIndex : "jenis"
    },
    {
      title : "Nama Produk",
      dataIndex : "katagori"
    },
    {
      title : "Quantity",
      dataIndex : "quantyti"
    },
    {
      title : "Status",
      dataIndex : "status"
    },
    {
      title : "Total Harga",
      dataIndex : "total"
    },
    {
      title : 'Tindakan',
      dataIndex :'tindakan',
      render:(text, record) => {
        return <div>
          <EditOutlined onClick={() => {
            setSelectedItemForEdit(record)
            setShowAddEditOrderModal(true)
          }}/>
          <DeleteOutlined  className='mx-3' onClick={() => deleteOrder(record)}/>
        </div>
      }
    }

  ]

  return (
    <DefaultLayout>
          { loading  && <Spinner />}
      <div className='filter d-flex justify-content-between align-item-center'>

        <div className='d-flex'>
          <div className='d-flex flex-column'>
            <h6> Pilih Tanggal</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value='7'>Dalam 1 Minggu</Select.Option>
              <Select.Option value='30'>Dalam 1 bulan</Select.Option>
              <Select.Option value='365'>Dalam 1Tahun</Select.Option>
              <Select.Option value='custom'>Atur Tanggal</Select.Option>
            </Select>

            {frequency === 'custom' && (
              <div className='mt-2'>
            <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)} />
              </div>
            )}
          </div>
          <div className='d-flex flex-column mx-3 '>
            <h6>  Jenis Produk</h6>
            <Select value={jenis} onChange={(value) => setJenis(value)}>
              <Select.Option value='semua'>semua</Select.Option>
              <Select.Option value='sabun'>Sabun</Select.Option>
              <Select.Option value='parfum'>Parfum</Select.Option>
            </Select>
          </div>
          <div className='d-flex flex-column'>
            <h6>Status</h6>
            <Select value={status} onChange={(value) => setStatus(value)}>
              <Select.Option value='semua'>semua</Select.Option>
              <Select.Option value='diterima'>Di Terima</Select.Option>
              <Select.Option value='dikembalikan'>Di Kembalikan</Select.Option>
            </Select>
          </div>
        </div>

        <div className='d-flex'>
          <div>
              <div className='view-switch mx-5'>
                <UnorderedListOutlined  className={` mx-3 ${viewType ==='table' ? 'active-icon ': ' inactive-icon'}`}  onClick={() => setViewType('table')} size={30}/>
                <AreaChartOutlined  className={`${viewType ==='analytic' ? 'active-icon ': ' inactive-icon'}`}  onClick={() => setViewType('analytic')} size={30}/>
              </div>
          </div>
          <button className='primary' onClick={() => setShowAddEditOrderModal(true)}>Tambah Order</button>
        </div>

      </div >
      <div className='table-analytic'>
        {viewType ==='table' ? 
        
        <div className='table'>
          <Table columns={columns} dataSource={orderData}   />
        </div> : 
        <OrderAnalytic order={orderData}/> 
      }

      </div>
      
      
      {showAddEditOrderModal && (
        <AddEditOrder
        showAddEditOrderModal = {showAddEditOrderModal}
        setShowAddEditOrderModal = {setShowAddEditOrderModal}
        selectedItemForEdit={selectedItemForEdit}
        getOrder = {getOrder}
        setSelectedItemForEdit = {setSelectedItemForEdit}
        />

      )}
      </DefaultLayout>
  )
}

export default order