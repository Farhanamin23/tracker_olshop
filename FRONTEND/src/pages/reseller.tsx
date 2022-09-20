/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import AddEditResseler from '../components/addEditResseler'
import '../style/transaction.css'
import {Button, DatePicker ,Input,message, Select, Table } from 'antd'
import axios from 'axios'
import Spinner from '../components/spinner'
import moment from 'moment'
import { DeleteOutlined, EditOutlined, SearchOutlined, UnorderedListOutlined } from '@ant-design/icons'
const {RangePicker} = DatePicker
function reseller() {
    const [showAddEditResellerModal, setShowAddEditResellerModal]=useState(false)
    const [loading , setLoading]=useState(false)
    const [resellerData, setResselerData]=useState([]);
    const [frequency , setFrequency]=useState('7')
    const [selectRange , setSelectRange]=useState<any>([])
    const [status , setStatus]=useState('Semua')
    const [selectItemForEdit , setSelectItemForEdit]=useState(null)
    
    
    const getResseler = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('farhan-app') || '{}');
        setLoading(true);
        const response = await axios.post(
          '/api/resseler/get-all-resseler',
          {userid: user._id, frequency , ...(frequency ==='custom' && {selectRange}), status }
        );
        setResselerData(response.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        message.error('Gagal Tampil Data')
      }
    }

    const deleteResseler = async (record)=> {
      try {
        setLoading(true);
        await axios.post ( '/api/resseler/delete-resseler',
        {
          resellerId : record._id
        }
        );
        message.success('Resseler Berhasil Di Hapus')
        getResseler();
        setLoading(false)
      } catch (error) {
        setLoading(false);
        message.error('gagal ambil data')
        
      }
    }

    useEffect(() =>  {
      getResseler();
    }, [frequency, selectRange , status]);

    const columns = [
      {
        title : 'Tanggal Gabung',
        dataIndex : 'tanggal',
        render : (text : any) => <span>{moment(text).format('DD-MM-YYYY')}</span>
      },
      {
        title : 'Nama Resseler',
        dataIndex : 'nama',
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
          return record.nama.toLowerCase().includes(value.toLowerCase())
        }
      },
      {
        title : 'Alamat Reselelr',
        dataIndex : 'alamat'
      },
      {
        title : 'Whatsapp Resseler',
        dataIndex : 'whatsapp'
      },
      {
        title : 'Email Resseler',
        dataIndex : 'email',
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
          return record.email.toLowerCase().includes(value.toLowerCase())
        }
      },
      {
        title : 'Katagori Resseler',
        dataIndex : 'katagori'
      },
      {
        title : 'Status Resseler',
        dataIndex : 'status'
      },
      {
        title : "Tindakan",
        dataIndex : 'tindakan',
        render:(text , record) => {
          return <div>
            <EditOutlined onClick={() => {
              setSelectItemForEdit(record)
              setShowAddEditResellerModal(true)
            }}/>
            <DeleteOutlined  className='mx-3' onClick={() => deleteResseler(record)}/>
          </div>
        }
      }
    ]
    return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className='filter d-flex justify-content-between align-items-center'>
        <div className='d-flex'>
            <div className='d-flex flex-column'>
                  <h6>Pilih Tanggal</h6>
                  <Select value={frequency} onChange={(value) => setFrequency(value)}>
                    <Select.Option value='7'>Dalam 1 Minggu</Select.Option>
                    <Select.Option value='30'>Dalam 1 Bulan</Select.Option>
                    <Select.Option value='365'>Dalam 1 Tahun</Select.Option>
                    <Select.Option value='custom'>Atur Tanggal</Select.Option>
                  </Select>

                  {frequency ==='custom' && (
                  <div className='mt-2'>
                    <RangePicker value={selectRange} onChange={(values) => setSelectRange(values)} />
                  </div>
                  )}
            </div>
            <div className='d-flex flex-column mx-5'>
                  <h6>Status Reseller</h6>
                  <Select value={status} onChange={(value) => setStatus(value)}>
                    <Select.Option value='semua'>semua</Select.Option>
                    <Select.Option value='Aktif'>Resseler Aktif</Select.Option>
                    <Select.Option value='Tidak Aktif'>Resseler Tidak Aktif</Select.Option>
                  </Select>
            </div>
        </div>
          
        <div className='d-flex'>
          <div>
              <div className='view-switch mx-5'>
                <UnorderedListOutlined  className='mx-2'/>
              </div>
          </div>
            <button className='primary' onClick={() => setShowAddEditResellerModal(true)}>Tambah Reseller</button>
        </div>
      </div>

      <div className='table-analytic'>
            <div className='table'>
              <Table columns={columns}  dataSource={resellerData}/>
            </div>
      </div>


      {showAddEditResellerModal  && (
        <AddEditResseler
        showAddEditResellerModal={showAddEditResellerModal}
        setShowAddEditResellerModal={setShowAddEditResellerModal}
        getResseler={getResseler}
        selectItemForEdit={selectItemForEdit}
        setSelectItemForEdit={setSelectItemForEdit}
        />
      )}
      </DefaultLayout>
  )
}

export default reseller