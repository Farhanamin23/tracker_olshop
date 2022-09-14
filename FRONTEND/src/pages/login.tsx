/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player';
import '../style/authentication.css'
import Spinner from '../components/spinner'
import axios from 'axios'

const login = () => {
  const [loading , setLoading] = useState(false)
  const [email, setEmail]=useState<string>("") 
  const [password, setPassword]=useState<string>("")
  const navigate = useNavigate();

  const onFinish = async(values:any) => {
      try {
      setLoading(true)
      const response = await axios.post('/api/user/login', values)
      localStorage.setItem("farhan-app",JSON.stringify({...response.data , password:''}));
      setLoading(false)
      message.success("Selamat Datang ")
      navigate("/")
      } catch (error) {
        setLoading(false)
        message.error('Maaf , Login Gagal')
      }
  }

  useEffect(() => {
    if (localStorage.getItem("farhan-app")){
      navigate("/")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='register'>
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-4">
          <Form layout='vertical' onFinish={onFinish}>
            <h1>LOGIN </h1>
  
            <Form.Item label='Email' name='email'>
                <Input placeholder='Masukan Email Anda' required value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item label='Password' name='password' >
                <Input type='password' placeholder='Masukan Pasword Anda' required value={password} onChange={e => setPassword(e.target.value)}/>
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to={'/register'}>Belum Punya Akun, Silahkan <u>Register</u></Link>
              <button className='primary' type='submit'>LOGIN</button>
            </div>
          </Form>
        </div>
        <div className="col-md-5">
          <Player src='https://assets9.lottiefiles.com/packages/lf20_06a6pf9i.json'className="lottie" loop autoplay/>
        </div>
      </div>
    </div>
  )
}

export default login