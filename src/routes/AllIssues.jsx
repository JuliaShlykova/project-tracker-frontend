import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import TasksTable from '../components/TasksTable/Index';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import ToggleButtons from '../components/TasksTable/ToggleButtons';

const AllIssues = () => {
  const tasks = useLoaderData();
  const [state, setState] = useState('all');

  return (
    <>
    <h1>Finished and unfinished tasks and issues</h1>
    <ToggleButtons state={state} setState={setState} />
    <TasksTable tasks={
      (state==='all')
      ?tasks
      :(state==='issues')
      ?tasks.filter(task=>task.taskType==='Issue')
      :tasks.filter(task=>task.taskType==='Task')
      }
    />
    </>
  )
}

export default AllIssues