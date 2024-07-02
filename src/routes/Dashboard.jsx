import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Modal, Table, ToggleButton } from 'react-bootstrap';

import { Link, useLoaderData, useRouteLoaderData } from 'react-router-dom';
import fromISODateToLocale from '../utils/fromISODateToLocale';
import getTimeRemaining from '../utils/getTimeRemaining';
import TasksTable from '../components/TasksTable/Index';
import ToggleButtons from '../components/TasksTable/ToggleButtons';

const Dashboard = () => {
  const tasks = useLoaderData();
  const [state, setState] = useState('all');

  return (
    <>
    <h1>Tasks and issues in progress</h1>
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

export default Dashboard