/* eslint-disable react-hooks/rules-of-hooks */
import { Form, Input, message, Modal, Select } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import Spinner from './spinner';

function addEditResseler ({showAddEditResellerModal , setShowAddEditResellerModal, getResseler , selectItemForEdit , setSelectItemForEdit}: {
  showAddEditResellerModal: any;
  setShowAddEditResellerModal:any;
  getResseler : any;
  selectItemForEdit : any;
  setSelectItemForEdit : any;
}) {
  
  const [loading , setLoading]=useState<boolean>(false)

  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('farhan-app') || '{}');
      setLoading(true);
      if(selectItemForEdit)
      {
      await axios.post('/api/resseler/edit-resseler' , { payload : {...values , userid:user._id} , resellerId : selectItemForEdit._id});
      getResseler()
      message.success('Resseler Berhasil Di Update')
      }else{
      await axios.post('/api/resseler/add-resseler' , {...values , userid:user._id});
      getResseler()
      message.success('Resseler Berhasil Di tambah')
      }
      setShowAddEditResellerModal(false)
      setSelectItemForEdit(null)
      setLoading(false)
    } catch (error) {
        message.error('Gagal Tambah Resseler')
        setLoading(false);
    } 
  }
    
  return (
    <Modal title = {selectItemForEdit  ? 'Edit Ressler' : 'Tambah Resseler'} visible={showAddEditResellerModal}  onCancel={() => setShowAddEditResellerModal(false)} footer={false} >
    {loading && <Spinner />}
    <Form layout='vertical' className='transaction-form' onFinish={onFinish} initialValues={selectItemForEdit}>
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
          <Select.Option value='Resseler Sabun Pyary'>Resseler Sabun</Select.Option>
          <Select.Option value='Resseler Parfum Daily'>Resseler Parfum</Select.Option>
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