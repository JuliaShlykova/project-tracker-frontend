import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import compressedImg from '../../utils/imageResizer';
import isFileImage from '../../utils/isFileImg';
import { getUser, setUser } from '../../services/localStorage';
import { updateProfileImg } from '../../api/users';
import { useNavigate } from 'react-router-dom';

const ModalDownloadImg = ({profileChange, setProfileChange}) => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedFile) {
        setPreview(undefined)
        return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl)
}, [selectedFile])

  const updateImg = async(e) => {
    let img = e.target.files[0];
    if (!img||!isFileImage(img)) {
      setSelectedFile(null);
      setErrors([{msg: 'please choose img'}]);
      return;
    }
    setSelectedFile(img);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    if(!selectedFile){
      setErrors([{msg: 'please choose img'}]);
      return;
    }
    setLoading(true);
    try {
      const cmprImg = await compressedImg(selectedFile);
      const newprofileImgUrl = await updateProfileImg(cmprImg);
      setUser({...getUser(), profileImgUrl: newprofileImgUrl});
      setProfileChange(false);
    } catch(err) {
      if (err.response?.status===422) {
        setErrors(err.response.data.errors);
      } else {
        navigate('/error-page', { state: { error: {message: err.response?.data?.message||err.message} } });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal show={profileChange==='img'} animation={false} onHide={() => setProfileChange(false)} fullscreen='sm-down'>
    <Modal.Header closeButton>
      <Modal.Title>Change profile image</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={handleSubmit} id='form-upload-img'>
      <Form.Group controlId='upload-img'>
        <Form.Label>New img: </Form.Label>
        <Form.Control type='file' onChange={updateImg} />
      </Form.Group>
    </Form>
    {selectedFile?<img className='profile-img-big my-3' src={preview} alt='' />:null}
      {errors
        ?errors.map((error, i)=><p className='text-danger' key={i}>* {error.msg}</p>)
        :null
      }
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setProfileChange(false)}>
        Close
      </Button>
      <Button
        variant="primary" 
        type='submit' 
        form='form-upload-img'
        disabled={isLoading}
      >
        {isLoading ? 'Loading…' : "Save Changes"}
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalDownloadImg

