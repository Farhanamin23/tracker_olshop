import React from 'react'
import { Dropdown, Menu} from 'antd';
import '../style/default-layout.css'
import { useNavigate } from 'react-router-dom';

export default function DefaultLayout(props : any) {
  const user = JSON.parse(localStorage.getItem('farhan-app') || '{}');
  const navigate = useNavigate()
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
          <li onClick={()=> {
            localStorage.removeItem("farhan-app")
            navigate('/login')
          }}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</li>
          ),
        },
        {
          key: '2',
          label: (
          <li onClick={()=> {
            localStorage.removeItem("farhan-app")
            navigate('/setting')
          }}></li>
          ),
        }
      ]}
    />
  );  
  return (
    <div className='layout' > 
      <div className='header d-flex justify-content-between align-content-center'>
      <div className="navbar">
  <ul className="navbar-items">
    <li className="navbar-item">
      <div className="activeCircle" />
      <a href='/'>
        <div className="navbar-item-icon">
          <span className="mdi mdi-cash-multiple" />
        </div>
        <div className="navbar-item-text">Transaksi</div>
      </a>
    </li>
    <li className="navbar-item">
      <div className="activeCircle" />
      <a href='/order'>
        <div className="navbar-item-icon">
          <span className="mdi mdi-cart-outline" />
        </div>
        <div className="navbar-item-text">Order</div>
      </a>
    </li>
    <li className="navbar-item">
      <div className="activeCircle" />
      <a href='/reseller'>
        <div className="navbar-item-icon">
          <span className="mdi mdi-account-multiple-plus" />
        </div>
        <div className="navbar-item-text">Reseller</div>
      </a>
    </li>
  </ul>
</div>
    <div>
        </div>
        <div> 
        <Dropdown overlay={menu} placement="bottomLeft">
        <button className='primary'>
          <i className='fas fa-user-circle fa-lg'></i>  {user.name}</button>
        </Dropdown>
        </div>
      </div>
      <div className='content'>
        {props.children }
      </div>

    </div>
  )
}

