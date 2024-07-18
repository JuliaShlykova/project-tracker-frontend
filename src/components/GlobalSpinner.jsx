import React from 'react'
import { Modal, Spinner } from 'react-bootstrap'

const GlobalSpinner = () => {
  return (
    <div className='global-spinner-wrapper w-100 h-100 fixed-top'>
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  )
}

export default GlobalSpinner