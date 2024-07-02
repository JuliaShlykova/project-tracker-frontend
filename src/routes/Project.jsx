import React, { useReducer, useState } from 'react'
import { Button, ButtonGroup, ListGroup, Stack } from 'react-bootstrap';
import { Form, Link, useActionData, useLoaderData } from 'react-router-dom';
import fromISODateToLocale from '../utils/fromISODateToLocale';
import { MdEdit, MdAddTask } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";
import { getUser } from '../services/localStorage';
import { users } from '../../fakedDb';
import ParticipantImg from '../components/ProjectPage/ParticipantImg';
import ProjectTasksTable from '../components/ProjectPage/ProjectTasksTable';
import classNames from 'classnames/bind';
import ModalProjectEdit from '../components/ProjectPage/ModalProjectEdit';
import ModalInvite from '../components/ProjectPage/ModalInvite';

const Project = () => {
  const {project: loadedProject, tasks} = useLoaderData();
  const [showEdit, setShowEdit] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const updatedProject = useActionData();

  let project = updatedProject||loadedProject;

  return (
    <div>
      <h1>{project.name}</h1>
      <ButtonGroup size='sm' className='gap-2'>
      <Button 
        as={Link} 
        to='create-task' 
        variant='outline-success' 
        className={classNames('btn-without-text', {'disabled': project.status!=="In progress"} )}
        title='new task or issue' 
        aria-label='new task or issue'
      >
        <MdAddTask />
      </Button>
      <Button 
        variant='outline-info' 
        className='btn-without-text' 
        title='add participant' 
        aria-label='add participant'
        disabled={project.status!=="In progress"}
        onClick={()=>setShowInvite(true)}
      >
        <IoMdPersonAdd />
      </Button>
      {(project.author._id===getUser()._id)
      ?(<>
          <Button variant='outline-warning' className='btn-without-text' title='edit' aria-label='edit' onClick={()=>setShowEdit(true)}><MdEdit /></Button>
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <Button type="submit" variant='outline-danger' className='btn-without-text' title='delete' aria-label='delete'><AiTwotoneDelete /></Button>
          </Form>
        </>)
      :null}
      </ButtonGroup>
      <ListGroup variant='flush' className='my-2'>
        <ListGroup.Item>
        <b>Author: </b>
        {project.author.profileImgUrl
        ?<img src={project.author.profileImgUrl} alt="profile image" className='profile-img-small me-1' />
        :null}
        {project.author.nickname}
        </ListGroup.Item>
        <ListGroup.Item><b>Deadline: </b>{project.deadline?fromISODateToLocale(project.deadline):'no deadline'}</ListGroup.Item>
        <ListGroup.Item><b>Status: </b>{project.status}</ListGroup.Item>
        {project.link?<ListGroup.Item><b>Link: </b><a href={project.link}>{project.link}</a></ListGroup.Item>:null}
        {(project.participants.length>0)
          ?<ListGroup.Item>
              <b>Paticipants: </b>
              <Stack gap={2} direction="horizontal" className='flex-wrap'>
                {project.participants.map(participant => <ParticipantImg key={participant._id} participant={participant} />)}
              </Stack>
            </ListGroup.Item>
          :null
        }
      </ListGroup>
      <hr />
      <h2>Tasks and issues</h2>
      <ProjectTasksTable tasks={tasks} />
      {showEdit?<ModalProjectEdit showEdit={showEdit} setShowEdit={setShowEdit} project={updatedProject||project} />:null}
      {showInvite?<ModalInvite />:null}
    </div>
    
  )
}

export default Project