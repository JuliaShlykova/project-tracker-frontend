import React, { useReducer, useState } from 'react'
import { Table, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import ModalTask from '../ModalTask'
import { getUser } from '../../services/localStorage';
import fromISODateToLocale from '../../utils/fromISODateToLocale';
import { Link, useNavigate } from 'react-router-dom';

const ProjectTasksTable = ({tasks=[]}) => {
  const [assigned, toggleAssigned] = useReducer(a=>!a,false);
  const [undone, toggleUndone] = useReducer(a=>!a,false);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [modalTask, setModalTask] = useState(null);

  const handleAssignedToggler = () => {
    toggleAssigned();
    if (!assigned) {
      setFilteredTasks(prevTasks=>prevTasks.filter(task=>task.assignee._id===getUser()._id));
    } else if(undone) {
      setFilteredTasks(tasks.filter(task=>!task.done));
    } else {
      setFilteredTasks(tasks);
    }
  };

  const handleUndoneToggler = () => {
    toggleUndone();
    if (!undone) {
      setFilteredTasks(prevTasks=>prevTasks.filter(task=>!task.done));
    } else if(assigned) {
      setFilteredTasks(tasks.filter(task=>task.assignee._id===getUser()._id));
    } else {
      setFilteredTasks(tasks);
    }
  };

  return (
    <>
    <ToggleButtonGroup type='checkbox' size='sm' className='my-1'>
        <ToggleButton
          id="toggle-assigned"
          variant='outline-primary'
          checked={assigned}
          value="1"
          onChange={handleAssignedToggler} 
        >
          Show only assigned to you
        </ToggleButton>
        <ToggleButton
          id="toggle-undone"
          variant='outline-primary'
          checked={undone}
          value="2"
          onChange={handleUndoneToggler} 
        >
          Show only undone
        </ToggleButton>
      </ToggleButtonGroup>

      <Table borderless hover responsive='md' size='sm'>
      <thead className='border-bottom'>
        <tr>
          <th className='d-none d-lg-table-cell'>Key</th>
          <th>Name</th>
          <th className='d-none d-md-table-cell'>Type</th>
          <th>Due Date</th>
          <th>Assignee</th>
          <th className='d-none d-lg-table-cell'>Done</th>
        </tr>
      </thead>
      <tbody>
        {filteredTasks.map((task) => {
          return (
            <tr 
              key={task._id} 
              onClick={() => { setModalTask(task) }} 
              className='clickable'
            >
              <td className='d-none d-lg-table-cell'>{task._id}</td>
              <td>{task.name}</td>
              <td className='d-none d-md-table-cell'>{task.taskType}</td>
              <td>{fromISODateToLocale(task.dueDate)}</td>
              <td>
                {task.assignee.profileImgUrl
                ?<img src={task.assignee.profileImgUrl} alt="profile image" className='profile-img-small me-1' />
                :null}
                <span style={{overflowWrap: "anywhere"}}>{task.assignee.nickname}</span>
              </td>
              <td className='d-none d-lg-table-cell'>{task.done?'yes':'no'}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
    {modalTask?<ModalTask modalTask={modalTask} setModalTask={setModalTask} />:null}
    </>
  )
}

export default ProjectTasksTable