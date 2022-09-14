import React from 'react';
import './App.css';
import 'antd/dist/antd.min.css'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Home from "./pages/home"
import Order from "./pages/order"
import Reseller from './pages/reseller';
import Login from "./pages/login"
import Register from "./pages/register"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectionRouter><Home /></ProtectionRouter>}/> 
          <Route path='/order' element={<ProtectionRouter><Order/></ProtectionRouter>} />
          <Route path='/reseller' element={<ProtectionRouter><Reseller/></ProtectionRouter>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export function ProtectionRouter(props: any) {
  
  if(localStorage.getItem('farhan-app'))
  {
    return props.children
  }else{
    return <Navigate to='/login' />
  }
}

export default App;
