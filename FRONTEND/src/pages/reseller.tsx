/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import AddEditResseler from '../components/addEditResseler'
import '../style/transaction.css'
import { message, Table } from 'antd'
import axios from 'axios'
import Spinner from '../components/spinner'

function reseller() {
    const [showAddEditResellerModal, setShowAddEditResellerModal]=useState(false)
    const [loading , setLoadng]=useState(false)
    const [resellerData, setResselerData]=useState([]);
    
    
    const getResseler = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('farhan-app') || '{}');
        setLoadng(true);
        const response = await axios.post(
          '/api/resseler/get-all-resseler',
          {userid: user._id}
        );
        console.log(response.data);
        setResselerData(response.data)
        setLoadng(false)
      } catch (error) {
        setLoadng(false)
        message.error('Gagal Tampil Data')
      }
    }

    useEffect(() =>  {
      getResseler();
    }, []);

    const columns = [
      {
        title : 'Nama Resseler',
        dataIndex : 'nama'
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
        dataIndex : 'email'
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
        title : 'Tanggal Daftar',
        dataIndex : 'tanggal'
      },
    ]
    return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className='filter d-flex justify-content-between align-items-center'>
        <div>

        </div>
        <div>
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
        />
      )}
      </DefaultLayout>
  )
}

export default reseller