import React, { useState } from 'react'
import { Form, Input, message } from 'antd'
import { Link } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player';
import '../style/authentication.css'
import Spinner from '../components/spinner'
import axios from 'axios'

const Register = () => {
  const [loading , setLoading] = useState(false)
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword]=useState<string>("")

  const onFinish = async(values:any) => {
      try {
        setLoading(true)
        await axios.post('/api/user/register', values)
        message.success('register berhasil')
        setLoading(false)
      } catch (error) {
        setLoading(false)
        message.error('Register gagal')
      }
  }
  return (
    <div className='register'>
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
      <div className="col-md-5">
          <Player src='https://assets9.lottiefiles.com/packages/lf20_06a6pf9i.json'className="lottie" loop autoplay/>
        </div>
        <div className="col-md-4">
          <Form layout='vertical' onFinish={onFinish}>
            <h1 className='list'>REGISTER </h1>
  
            <Form.Item label='Nama' name='name'>
                <Input  placeholder='Nama Lengkap Anda' required value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Item>
            <Form.Item label='Email' name='email'>
                <Input placeholder='Masukan Email Anda' required value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item label='Password' name='password'>
                <Input type='password' placeholder='password'  required value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to={'/login'}>Sudah Punya Akun, Silahkan <u>Login</u></Link>
              <button className='primary' type='submit'>REGISTER</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register