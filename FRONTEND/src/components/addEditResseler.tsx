/* eslint-disable react-hooks/rules-of-hooks */
import { Form, Input, message, Modal, Select } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import Spinner from './spinner';

function addEditResseler ({showAddEditResellerModal , setShowAddEditResellerModal, getResseler}: {
  showAddEditResellerModal: any;
  setShowAddEditResellerModal:any;
  getResseler : any;
}) {
  
  const [loading , setLoading]=useState(false)

  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('farhan-app') || '{}');
      setLoading(true);
      await axios.post('/api/resseler/add-resseler' , {...values , userid:user._id});
      getResseler()
      message.success('Resseler Berhasil Di tambah')
      setShowAddEditResellerModal(false)
      setLoading(false)
    } catch (error) {
        message.error('Gagal Tambah Resseler')
        setLoading(false);
    } 
  }
    
  return (
    <Modal title = 'Tambah Reseller' visible={showAddEditResellerModal}  onCancel={() => setShowAddEditResellerModal(false)} footer={false} >
    {loading && <Spinner />}
    <Form layout='vertical' className='transaction-form' onFinish={onFinish}>
        <Form.Item label='Nama Reseller' name='nama'>
              <Input type='text' />
        </Form.Item>
        
        <Form.Item label='Alamat Reseller' name='alamat'>
              <Input type='text' />
        </Form.Item>

        <Form.Item label='Whatsapp Reseller' name='whatsapp'>
              <Input type='text' />
        </Form.Item>

        <Form.Item label='Email Reseller' name='email'>
              <Input type='text' />
        </Form.Item>

        <Form.Item label='Katagori Reseller' name='katagori'>
          <Select>
          <Select.Option value='sabun'>Resseler Sabun</Select.Option>
          <Select.Option value='parfum'>Resseler Parfum</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label='Status Resseler' name='status'>
          <Select>
          <Select.Option value='aktif'>Aktif</Select.Option>
          <Select.Option value='tidakaktif'>Tidak Aktif</Select.Option>
          </Select>
        </Form.Item>
        
        <Form.Item label='Tanggal Daftar' name='tanggal'>
              <Input type='date' />
        </Form.Item>

        <div className='d-flex justify-content-end'>
          <button className='primary' type='submit'>Simpan</button>
        </div>
    </Form>
  </Modal>
  )
}

export default addEditResseler