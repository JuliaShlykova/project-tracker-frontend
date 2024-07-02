import React, { useReducer, useState } from 'react'
import { Button, Card, Col, Container, Row, ToggleButton } from 'react-bootstrap';
import { Link, useLoaderData } from 'react-router-dom'
import fromISODateToLocale from '../utils/fromISODateToLocale';
import ProjectCard from '../components/ProjectCard';
import { getUser } from '../services/localStorage';

const AllProjects = () => {
  const projects = useLoaderData();
  const [owned, toggleOwned] = useReducer(owned=>!owned,false);

  return (
    <>
    <h1>All projects</h1>
    <Container>
      <Row>
        <Col>
          <ToggleButton
            id="toggle-check"
            className='my-1'
            type="checkbox"
            variant='outline-primary'
            checked={owned}
            value="1"
            onChange={toggleOwned} 
          >
          Show only owned by you
          </ToggleButton>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-3">
      {projects.map(project => {
        if (owned) {
          if (project.author._id===getUser()._id) {
            return <ProjectCard key={project._id} project={project} />
          } else {
          return null;
          }
        } else {
        return (
          <ProjectCard key={project._id} project={project} />
        )}
      })}
      </Row>
    </Container>
    </>
  )
}

export default AllProjects
