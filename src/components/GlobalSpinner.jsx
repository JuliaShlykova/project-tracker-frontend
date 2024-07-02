import React from 'react'
import { Modal, Spinner } from 'react-bootstrap'

const GlobalSpinner = () => {
  return (
    <div className='global-spinner-wrapper w-100 h-100 fixed-top'>
    {/* <Modal fullscreen show>
    <Modal.Body className='bg-gray d-flex align-items-center justify-content-center'> */}
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    {/* </Modal.Body>
    </Modal> */}
    </div>
  )
}

export default GlobalSpinner