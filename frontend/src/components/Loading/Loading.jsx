import React from 'react'
import logo from '../../assets/images/logo.png'
export default function Loading() {
  return <>
    <div className="loading d-flex justify-content-center align-items-center position-fixed top-0 end-0 bottom-0 start-0 ">
      <img src={logo} width={300} alt="" />
    </div>
  </>
}
