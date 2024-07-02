import React from 'react'
import { Card, Col } from 'react-bootstrap'
import fromISODateToLocale from '../utils/fromISODateToLocale'
import { Link } from 'react-router-dom'

interface User {
  _id: string;
  nickname: string;
}

interface Project {
  _id: string;
  name: string;
  link: string|undefined;
  deadline: string;
  status: string;
  author: User;
}

const ProjectCard = ({project}: {project: Project}) => {

  return (
    <Col>
    <Card>
      <Card.Header>{project.name}</Card.Header>
      <Card.Body>
        <Card.Text><b>Author:</b> {project.author.nickname}</Card.Text>
        <Card.Text><b>Deadline:</b> {project.deadline?fromISODateToLocale(project.deadline):'no deadline'}</Card.Text>
        <Card.Text><b>Status</b>: {project.status}</Card.Text>
        <Card.Link as={Link} to={'/projects/'+project._id}>Details</Card.Link>
        {project.link?<Card.Link href={project.link}>Link</Card.Link>:null}
      </Card.Body>
    </Card>
    </Col>
  )
}

export default ProjectCard
