import React, { useState } from 'react'
import { Button, ButtonGroup, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const SidebarNav = () => {

  return (
    <Navbar>
    <Nav defaultActiveKey='/dashboard' className="flex-column">
      <Nav.Link as={NavLink} end to="/dashboard">Current issues and tasks</Nav.Link>
      <Nav.Link as={NavLink} to="/dashboard/all">All your issues and tasks</Nav.Link>
      <hr />
      <Nav.Link as={NavLink} end to="/projects">Current projects</Nav.Link>
      <Nav.Link as={NavLink} to="/projects/all">All projects</Nav.Link>
      <hr />
      <Nav.Link as={NavLink} to="/projects/create-task">New Task/Issue</Nav.Link>
      <Nav.Link as={NavLink} to="/projects/create">New Project</Nav.Link>
    </Nav>
    </Navbar>
  )
}

export default SidebarNav