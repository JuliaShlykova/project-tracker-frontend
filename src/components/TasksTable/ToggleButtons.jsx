import React from 'react'
import { ButtonGroup, ToggleButton } from 'react-bootstrap'

const ToggleButtons = ({state, setState}) => {
  return (
    <ButtonGroup className='my-2'>
    <ToggleButton
      id='tasks-and-issues'
      type="radio"
      variant='outline-primary'
      name="radio"
      value='all'
      checked={state === 'all'}
      onChange={(e) => setState(e.currentTarget.value)}
    >
      All
    </ToggleButton>
    <ToggleButton
      id='issues'
      type="radio"
      variant='outline-danger'
      name="radio"
      value='issues'
      checked={state === 'issues'}
      onChange={(e) => setState(e.currentTarget.value)}
    >
      Issues
    </ToggleButton>
    <ToggleButton
      id='tasks'
      type="radio"
      variant='outline-success'
      name="radio"
      value='tasks'
      checked={state === 'tasks'}
      onChange={(e) => setState(e.currentTarget.value)}
    >
      Tasks
    </ToggleButton>
  </ButtonGroup>
  )
}

export default ToggleButtons