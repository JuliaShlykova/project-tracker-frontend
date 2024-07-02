import React from 'react'
import { Button, ListGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import fromISODateToLocale from '../utils/fromISODateToLocale';
import { getUser } from '../services/localStorage';

const ModalTask = ({modalTask, setModalTask}) => {
  const navigate = useNavigate();

  return (
    <Modal show={Boolean(modalTask)} animation={false} onHide={() => setModalTask(null)} fullscreen='sm-down'>
    <Modal.Header closeButton>
      <Modal.Title>{modalTask?.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <ListGroup variant='flush'>
      <ListGroup.Item className='px-0'><b>Key: </b>{modalTask._id}</ListGroup.Item>
      <ListGroup.Item className='px-0'><b>Type: </b>{modalTask.taskType}</ListGroup.Item>
      <ListGroup.Item className='px-0'>
      <b>Assignee: </b>
      {modalTask.assignee?.nickname?modalTask.assignee.nickname:getUser().nickname}
      </ListGroup.Item>
      <ListGroup.Item className='px-0'><b>Description: </b><p style={{whiteSpace: "pre-wrap"}}>{modalTask.description}</p></ListGroup.Item>
      <ListGroup.Item className='px-0'><b>dueDate: </b>{fromISODateToLocale(modalTask.dueDate)}</ListGroup.Item>
      {modalTask.completedDate?<ListGroup.Item className='px-0'><b>Completed date: </b>{fromISODateToLocale(modalTask.completedDate)}</ListGroup.Item>:null}
      <ListGroup.Item className='px-0'>
        {modalTask.done?<span className='bg-success-subtle p-1 rounded-5'>Done</span>:<span className='bg-danger-subtle p-1 rounded-5'>Undone</span>}
      </ListGroup.Item>
    </ListGroup>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setModalTask(null)}>
        Close
      </Button>
      <Button variant="primary" onClick={() => {navigate("/tasks/" + modalTask._id + "/edit"); setModalTask(null)}}>
      {/* <Button as={Link} to={"/tasks/" + modalTask._id + "/edit"} variant="primary" onClick={() => setModalTask(null)}> */}
        Edit
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalTask