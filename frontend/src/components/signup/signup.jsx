import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'

import * as Yup from 'yup';
export default function Signup() {
    let navigate = useNavigate();
    let [errMsg , setErrMsg] = useState("");
    let [Loading , setLoading] = useState(true);

    let validationSchema = Yup.object({
        userName:Yup.string().required('username is required'),
        password:Yup.string().required('password is required')
    })

    let formik = useFormik({
        initialValues: {
            userName: '',
            password: ''
        },
        validationSchema,
        onSubmit:registerSubmit
    })
    async function registerSubmit(values){
        setLoading(false);
        let {data} = await axios.post('http://localhost:5000/user/signup',values).catch((err)=>{            
            setErrMsg(err.response.data.message)
            setLoading(true)
        })        
        if(data.success === true){
            setLoading(true);
            navigate('/login')
        }
    }
  return <>
    <div className="mx-auto py-4">
        <h2 className='mb-4'>register</h2>
        {errMsg !== '' ? <div className='alert alert-danger'>{errMsg}</div> : ''}
        <form onSubmit={formik.handleSubmit}>

            <label htmlFor="userName">Username : </label>
            <input className='form-control mb-2' type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.userName} id='userName' name='userName' />
            {formik.errors.userName && formik.touched.userName ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.userName}</div> : ''}

            <label htmlFor="password">password : </label>
            <input className='form-control mb-2' type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id='password' name='password' />
            {formik.errors.password && formik.touched.password ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.password}</div> : ''}

            {Loading ? <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-primary text-white mt-2' type='submit'>Submit</button> : <><button type='button' className='btn bg-primary text-white mt-2'>
        <ThreeDots
            visible={true}
            height="20"
            width="40"
            color="#fff"
            radius="5"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </button> </>}
        </form>
    </div>
  </>
}
