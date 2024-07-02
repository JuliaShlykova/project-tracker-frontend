import React, { useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap';
import fromISODateToLocale from '../../utils/fromISODateToLocale';
import getTimeRemaining from '../../utils/getTimeRemaining';
import { Link, useNavigate } from 'react-router-dom';
import ModalTask from '../ModalTask';
import classNames from 'classnames';
import DoneIcon from './DoneIcon';

const TasksTable = ({tasks=[]}) => {
  const [modalTask, setModalTask] = useState(null);

  return (
    <>
    <Table borderless hover responsive='md' size='sm'>
      <thead className='border-bottom'>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Due Date</th>
          <th className='d-none d-md-table-cell'>Time left</th>
          <th>Project</th>
          <th className='d-none d-lg-table-cell'>Type</th>
          <th className='d-none d-lg-table-cell'>Key</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => {
          const {total, minutes, hours, days} = getTimeRemaining(task.dueDate);
          let dateStr = '';
          if (total<=0) {
            dateStr = '0 seconds left';
          } else if (days) {
            dateStr = `${days} days ${hours} hours left`;
          } else {
            dateStr = `${hours} hours ${minutes} minutes left`;
          }
          return (
            <tr onClick={() => { setModalTask(task) }} key={task._id} className='clickable verical-middle-row'>
              <td onClick={e=>{e.stopPropagation()}} className='p-0 border-end'>
                <DoneIcon task={task} />
              </td>
              <td>{task.name}</td>
              <td className={classNames({
                'bg-danger-subtle': (!task.done)&&(total<=0), 
                'bg-warning-subtle': (!task.done)&&(total>0)&&(total<24*60*60*1000)})}
              >{fromISODateToLocale(task.dueDate)}</td>
              <td className='d-none d-md-table-cell'>{dateStr}</td>
              <td onClick={e=>{e.stopPropagation()}}>
                <Link to={'/projects/'+task.project._id}>{task.project.name}</Link>
              </td>
              <td className='d-none d-lg-table-cell'>{task.taskType}</td>
              <td className='d-none d-lg-table-cell'>{task._id}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
    {modalTask?<ModalTask modalTask={modalTask} setModalTask={setModalTask} />:null}
    </>
    
  )
}

export default TasksTable