import React, { useReducer } from 'react'
import { Button, Card, CardGroup, Col, Container, Row, Stack, ToggleButton } from 'react-bootstrap';
import { Link, ScrollRestoration, useLoaderData, useRouteLoaderData } from 'react-router-dom'
import fromISODateToLocale from '../utils/fromISODateToLocale';
import ProjectCard from '../components/ProjectCard.tsx';
import { getUser } from '../services/localStorage';

const Projects = () => {
  const projects = useLoaderData();
  const [owned, toggleOwned] = useReducer(owned=>!owned,false);

  return (
    <>
    <h1>Projects in progress</h1>
    {/* <Button size='sm m-2' variant='outline-primary' onClick={toggleOwned}>{owned?'Show all projects':'Show projects owned by you'}</Button> */}
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
    <Row xs={1} sm={2} lg={3} xl={4} xxl={5} className="g-3">
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

export default Projects