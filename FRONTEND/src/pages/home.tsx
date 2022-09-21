/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { UnorderedListOutlined,AreaChartOutlined, EditOutlined, DeleteOutlined  } from '@ant-design/icons'
import DefaultLayout from '../components/DefaultLayout'
import '../style/transaction.css'
import AddEditTransaction from '../components/addEditTransaction'
import Spinner from '../components/spinner'
import { DatePicker, message, Select, Table } from 'antd'
import axios from 'axios'
import moment from 'moment'
import Analytic from '../components/Analytic'
const {RangePicker} = DatePicker
function home() {  
  const [showAddEditTransactionModal,setShowAddEditTransactionModal] = useState<boolean>(false)
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)
  const [loading , setLoading] = useState(false)
  const [transactionData, setTransactionData] = useState<any>([]);
  const [frequency, setFrequency] = useState<any>("7");
  const [type, setType] = useState<any>("semua");
  const [selectedRange, setSelectedRange] = useState<any>([]);
  const [viewType , setViewType]=useState<any>('table')
  
  const getTransactions= async ()=>{
    try {
      const user = JSON.parse(localStorage.getItem('farhan-app') || '{}');
      setLoading(true)
      const response = await axios.post(
        "/api/transaction/get-all-transaction", 
        {
          userid: user._id,
          frequency,
          ...(frequency === "custom" && { selectedRange }),
          type,
        }
      );
      setTransactionData(response.data)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("gagal")
    }
  }
  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/transaction/delete-transaction", {
        transactionId: record._id,
      });
      message.success("Transaksi Berhasil Di Delete");
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Transaksi Gagal Di Delete");
    }
  };

  useEffect(() => {
    getTransactions()
  }, [frequency, selectedRange, type])
  
  const columns = [
    {
      title : "Tanggal",
      dataIndex : "tanggal",
      render : (text : any) => <span>{moment(text).format('DD-MM-YYYY')}</span>
    },
    {
      title : "Total",
      dataIndex : "total"  
    },
    {
      title : "Katagori",
      dataIndex : 'katagori',
    },
    {
      title : "Tipe",
      dataIndex : "type", 
    },
    {
      title : "Deskripsi",
      dataIndex : "deskripsi"  
    },
    {
      title : 'Tindakan',
      dataIndex: 'tindakan',
      render:(text, record)=> {
        return <div>
          <EditOutlined  onAuxClick={() => {
            setSelectedItemForEdit(record)
            setShowAddEditTransactionModal(true)
          }}/>
          <DeleteOutlined  className='mx-3' onClick={() => deleteTransaction(record)}/>
        </div>
      }
    }
    
  ]
  return (
    <>
    <DefaultLayout>
    {loading && <Spinner />}
      <div className='filter d-flex justify-content-between align-content-center'>
      
        <div className='d-flex'>
          <div className='d-flex flex-column'>
              <h6>Pilih Tanggal</h6>
              <Select value={frequency} onChange={(value) => setFrequency(value)}>
                <Select.Option value="7">Dalam 1 Minggu</Select.Option>
                <Select.Option value='30'>Dalam 1 Bulan</Select.Option>
                <Select.Option value='366'>Dalam 1 Tahun</Select.Option>
                <Select.Option value='custom'>Atur Tanggal</Select.Option>
              </Select>
              {frequency === 'custom' && (
                <div className='mt-2'>
                  <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)} />
                </div>
              )}
          </div>
          <div className='d-flex flex-column mx-5'>
              <h6>Pilih Tipe </h6>
              <Select value={type} onChange={(value) => setType(value)}>
                <Select.Option value='semua'>Semua</Select.Option>
                <Select.Option value='Pemasukan'>Pemasukan</Select.Option>
                <Select.Option value='Pengeluaran'>Pengeluaran</Select.Option>
              </Select>
          </div>
      </div>

      <div className='d-flex'>
      <div>
          <div className='view-switch mx-5'>
          <UnorderedListOutlined  className={` mx-3 ${viewType ==='table' ? 'active-icon ': ' inactive-icon'}`}  onClick={() => setViewType('table')} size={30}/>
          <AreaChartOutlined className={`${viewType ==='analytic' ? 'active-icon ': ' inactive-icon'}`}  onClick={() => setViewType('analytic')} size={30}/>
          </div>
        </div>
      <button className="primary" onClick={()=> setShowAddEditTransactionModal(true)}>Tambah Transaksi</button>
      </div>
    
      </div>

      <div className="table-analytic">
        {viewType ==='table'? <div className='table'>
          <Table columns={columns}  dataSource={transactionData}/>
        </div> : <Analytic  transaction={transactionData} />}
      </div>
      {showAddEditTransactionModal  && (
        <AddEditTransaction 
        showAddEditTransactionModal={showAddEditTransactionModal}
        setShowAddEditTransactionModal={setShowAddEditTransactionModal}
        selectedItemForEdit={selectedItemForEdit}
        getTransactions={getTransactions}
        setSelectedItemForEdit={setSelectedItemForEdit}
        />
      )}   
    </DefaultLayout>
    </>
  );
}

export default home