import React from 'react'
import { MutatingDots } from 'react-loader-spinner'

export default function Loading() {
  return <>
    <div className="loading d-flex justify-content-center align-items-center position-fixed top-0 end-0 bottom-0 start-0">
    <MutatingDots
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  secondaryColor="#4fa94d"
  radius="17"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  </>
}
