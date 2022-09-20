/* eslint-disable react-hooks/rules-of-hooks */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, InputRef, message, Modal, Select, Space } from 'antd'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import Spinner from './spinner';

type test = {
  value:tost;
}

enum tost {
  semua='semua',
  Pemasukan = 'Pemasukan',
  Pengeluaran = 'Pengeluaran'
}

const { Option } = Select;

let index = 0;

function addEditTransaction({setShowAddEditTransactionModal, showAddEditTransactionModal,getTransactions , selectedItemForEdit , setSelectedItemForEdit}:{
  setShowAddEditTransactionModal : any;
  showAddEditTransactionModal:any
  getTransactions:any;
  selectedItemForEdit: any;
  setSelectedItemForEdit: any;
}) {
  const [type , setType]=useState(tost.semua)
  const [loading , setLoading] = useState(false)
  const [items, setItems] = useState(['']);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };


  const onFinish = async(values:any) => {
    try {
      const user = JSON.parse(localStorage.getItem('farhan-app') || '{}');
      setLoading(true)
      if(selectedItemForEdit)
      {
        await axios.post('/api/transaction/edit-transaction', {
          payload : {
            ...values, userid : user._id,
          },
          transactionId: selectedItemForEdit._id})
        getTransactions();
        message.success('Transaksi Berhasil Di Update')
      }else{
        await axios.post('/api/transaction/add-transaction', {
          ...values, userid : user._id})
      }
      getTransactions();
      message.success('Transaksi Berhasil Di Tambah')
      setShowAddEditTransactionModal(false)
      setSelectedItemForEdit(null)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      message.error('Tambah Transaksi gagal')
    }
    
}
  
  return (
    <Modal title={selectedItemForEdit ? 'Edit Transaksi' : 'Tambah Transaksi'} visible={showAddEditTransactionModal} onCancel={() => setShowAddEditTransactionModal(false)} footer={false}>
    {loading && <Spinner />}
    <Form layout='vertical' className='transaction-form' onFinish={onFinish} initialValues={selectedItemForEdit}>
      <Form.Item label="Total" name="total">
        <Input type='text' placeholder='Masukan jumlah Transaksi' />
      </Form.Item>
      <Form.Item label="Tipe input" name="type" >
        <Select placeholder="Masukan Tipe" onChange={(e) => setType(e)} >
        <Select.Option value="Pemasukan" >Pemasukan</Select.Option>
        <Select.Option value="Pengeluaran" >Pengeluaran</Select.Option>
        </Select>
      </Form.Item>
    <Form.Item label="Katagori" name="katagori">
      <Select placeholder="Pilihan Katagori" 
      // mode="multiple"
      dropdownRender={menu => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="Masukan Katagori Baru"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Tambah Baru
            </Button>
          </Space>
        </>
            )}
      >
                      {items.map(item => (
      <Option key={item}>{item}</Option>
    ))}
        {type === tost.Pemasukan && (
        <>
        <Select.Option value="Penjualan Shope ">Penjualan Dari Shope</Select.Option>
        <Select.Option value="Penjualan Tokopedia">Penjualan Dari Tokopedia</Select.Option>
        <Select.Option value="Penjualan Tiktok">Penjualan Dari Tiktok</Select.Option>
        <Select.Option value="Penjualan Offline">Penjualan Offline</Select.Option>
        </>)}
        {type === tost.Pengeluaran && (
        <>
        <Select.Option value="Gaji Admin">Gaji Admin</Select.Option>
        <Select.Option value="Biaya Packaging">Biaya Alat Packaging</Select.Option>
        <Select.Option value="Pembelian Produk">Pembelian Produk</Select.Option>
        <Select.Option value="Biaya Sewa Ruko">Biaya Sewa Ruko</Select.Option>
        </>

        )}
    </Select>
    </Form.Item>
      <Form.Item label='Tanggal' name='tanggal'>
        <Input type='date' />
      </Form.Item>
      <Form.Item label='Upload Slip Transaksi' name='image'>
      <Input type="file"
      id="image" name="image"
      accept="image/png, image/jpeg" />
      </Form.Item>
      <Form.Item label='Deskripsi' name='deskripsi'>
        <Input type='text' placeholder='Deskripsi' />
      </Form.Item>
    <div className='d-flex justify-content-end'>
      <button className='primary'>Simpan</button>
    </div>
    </Form>
  </Modal>
  )
}

export default addEditTransaction