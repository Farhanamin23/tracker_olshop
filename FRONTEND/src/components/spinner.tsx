import React from 'react'
import { Spin } from 'antd'
import '../style/default-layout.css'
const spinner = () => {
  return (
    <div className='spinner'> 
      <Spin size='large' style={{color : 'gray'}} /> 
    </div>
  )
}

export default spinner