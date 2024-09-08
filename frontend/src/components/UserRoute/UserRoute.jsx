import React, { Children, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

export default function UserRoute(props) {
  let {userToken} = useContext(UserContext)
  let navigate = useNavigate()
  if(userToken){
    navigate('/')
  }else{
    return props.children
  }
}
