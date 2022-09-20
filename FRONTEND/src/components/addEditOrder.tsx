/* eslint-disable react-hooks/rules-of-hooks */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, InputRef, message, Modal, Select, Space } from 'antd'
import axios from 'axios';
import React, { useRef, useState } from 'react'
import Spinner from './spinner';

type test = {
  value: split;
}

enum split {
  Semua = 'Semua',
  Sabun = 'sabun',
  Parfum = 'parfum'

}
const { Option } = Select;

let index = 0;

function addEditOrder({setShowAddEditOrderModal, showAddEditOrderModal,selectedItemForEdit,setSelectedItemForEdit,getOrder, } : {
  setShowAddEditOrderModal : any;
  showAddEditOrderModal:any;
  selectedItemForEdit:any;
  setSelectedItemForEdit:any;
  getOrder : any ;
}) 
{ 
  const [type , setType]=useState(split.Semua)
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


  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('farhan-app') || '{}');
      setLoading(true);
      if (selectedItemForEdit)
      {
        await axios.post('/api/order/edit-order', {
          payload : {
            ...values, 
          userid: user._id,
          },
          orderId:selectedItemForEdit._id
        });
        getOrder()
        message.success('Order Berhasil Di Edit');
      }else{
        await axios.post('/api/order/add-order', {...values, userid: user._id});
        getOrder()
        message.success('Order Berhasil Di Tambah');
      }
      setShowAddEditOrderModal(false);
      setSelectedItemForEdit(null)
      setLoading(false)
    } catch (error) {
      message.error('Order Gagal Di Tambah')
      setLoading(false)
    }
  }
  

  
  return (
    <>
        <Modal title={selectedItemForEdit ? 'Edit Order' : 'Tambah Order'}  visible={showAddEditOrderModal} onCancel={() => setShowAddEditOrderModal(false)} footer={false} >
        { loading  && <Spinner />}
            <Form layout='vertical' className='transaction-form' onFinish={onFinish} initialValues={selectedItemForEdit}>      
                <Form.Item label='Marketplace' name='marketplace'>
                    <Select dropdownRender={menu => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Space style={{ padding: '0 8px 4px' }}>
                        <Input
                          placeholder="Masukan Marketplace Baru"
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
                    <Select.Option value="shoope">Shope</Select.Option>
                    <Select.Option value="tokopedia">Tokopedia</Select.Option>
                    <Select.Option value="Tiktok">Tiktok</Select.Option>
                    <Select.Option value="offline">Offline</Select.Option>
                    </Select>
                </Form.Item>
              
                <Form.Item label='Nomor Order' name='order'>
                  <Input type='text' />
                </Form.Item>

                <Form.Item label='Name Pembeli' name='pembeli'>
                  <Input type='text' />
                </Form.Item>

                <Form.Item label='Jenis Produk' name='jenis' >
                  <Select placeholder="Masukan Jenis Produk" onChange={(e) => setType(e)} dropdownRender={menu => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Space style={{ padding: '0 8px 4px' }}>
                        <Input
                          placeholder="Masukan Jenis Baru"
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
                    <Select.Option value="sabun">Sabun</Select.Option>
                    <Select.Option value="parfum">Parfum</Select.Option>
                  </Select>
                </Form.Item>
                
                <Form.Item label='Nama Produk' name='katagori'>
                  <Select 
                  placeholder='Pilihan Nama Produk'
                  // mode="multiple"
                  dropdownRender={menu => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Space style={{ padding: '0 8px 4px' }}>
                        <Input
                          placeholder="Masukan Produk Baru"
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
                  {type === split.Sabun && (
                    <>
                    <Select.Option value="pyary kunyit">Sabun Pyary Kunyit</Select.Option>
                    <Select.Option value="pyary nalpamara">Sabun Pyary Nalpamara</Select.Option>
                    <Select.Option value="pyary pepaya">Sabun Pyary Pepaya</Select.Option>
                    <Select.Option value="pyary safron">Sabun Pyary Safron</Select.Option>
                    <Select.Option value="pyary aloevera">Sabun Pyary Aloe Vera</Select.Option> 
                    </>
                  )}
                  {type === split.Parfum && (
                    <>
                    <Select.Option value="daily parfum Aigner Debut Woman">Daily Parfum Aigner Debut Woman</Select.Option>
                    <Select.Option value="daily parfum Angel Alien">Daily Parfum Angel Alien</Select.Option>
                    <Select.Option value="daily parfum Angel Hearth">Daily Parfum Angel Hearth</Select.Option>
                    <Select.Option value="daily parfum Angel Woman">Daily Parfum Angel Woman</Select.Option>
                    <Select.Option value="daily parfum Baby Poweder Floral">Daily Parfum Baby Poweder Floral</Select.Option>
                    <Select.Option value="daily parfum Bacarat">Daily Parfum Bacarat</Select.Option>
                    <Select.Option value="daily parfum Benneton Pink">Daily Parfum Benneton Pink</Select.Option>
                    <Select.Option value="daily parfum Beyonce">Daily Parfum Beyonce</Select.Option>
                    <Select.Option value="daily parfum Bodyshop Coco">Daily Parfum Bodyshop Coco</Select.Option>
                    <Select.Option value="daily parfum Bodyshop White Musk">Daily Parfum Bodyshop White Musk</Select.Option>
                    <Select.Option value="daily parfum Bodyshop Oceanus">Daily Parfum Bodyshop Oceanus</Select.Option>
                    <Select.Option value="daily parfum Britney Fantasy">Daily Parfum Britney Fantasy</Select.Option>
                    <Select.Option value="daily parfum Bulgari Rose">Daily Parfum Bulgari Rose</Select.Option>
                    <Select.Option value="daily parfum Bulgari Rose Goldea">Daily Parfum Bulgari Rose Goldea</Select.Option>
                    <Select.Option value="daily parfum Burbery London Woman">Daily Parfum Burbery London Woman</Select.Option>
                    <Select.Option value="daily parfum Bulgary Omnia Ametyste">Daily Parfum Bulgary Omnia Ametyste</Select.Option>
                    <Select.Option value="daily parfum Bulgary Omnia Cystaline">Daily Parfum Bulgary Omnia Cystaline</Select.Option>
                    <Select.Option value="daily parfum Bulgary Pour Femmer"> Bulgary Pour FemmerDaily Parfum</Select.Option>
                    <Select.Option value="daily parfum CA By Night">Daily Parfum CA By Night</Select.Option>
                    <Select.Option value="daily parfum CH 212 Sexy Woman"> Daily Parfum CH 212 Sexy Woman</Select.Option>
                    </>)}
                  </Select>
                </Form.Item>
                
                <Form.Item label='Quantyti' name='quantyti'>
                  <Input type='text' />
                </Form.Item>
                
                <Form.Item label='Status' name='status'>
                  <Select>
                    <Select.Option value="diterima">Di Terima</Select.Option>
                    <Select.Option value="dikembalikan">Di Kembalikan</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label='total' name='total'>
                  <Input type='text' />
                </Form.Item>
                <Form.Item label='Tanggal' name='tanggal'>
                  <Input type='date' />
                </Form.Item>
            <div className='d-flex justify-content-end'>
              <button className='primary' type='submit'>Simpan</button>
            </div>
            </Form>
      </Modal>
      </>

  )
}

export default addEditOrder