import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) { 
  if(localStorage.getItem('userToken') !== null){
    return props.children
  }else{
    return <Navigate to={'/login'}></Navigate>
  }
  return <>
    <h1>ProtectedRoute</h1>
  </>
}
