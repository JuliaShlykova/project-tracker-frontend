import { Button, Image, Offcanvas } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router-dom';
import { clearStorage, getUser } from '../../services/localStorage.js';
import SidebarNav from './SidebarNav.jsx';
import removeTokenCookie from '../../utils/removeCookies.js';
import { useState } from 'react';
import { CgMenuLeftAlt } from "react-icons/cg";
import Avatar from '../Avatar.tsx';
import ModalChangeNickname from './ModalChangeNickname.jsx';
import ModalDownloadImg from './ModalDownloadImg.jsx';

const handlelogout = () => {
  clearStorage(); 
  removeTokenCookie();
  window.location.href = '/';
}

function Navigation() {
  const [show, setShow] = useState(false);
  const [profileChange, setProfileChange] = useState(false);

  return (
    <Navbar className="py-0 justify-content-start border-bottom"> 
      <Button variant='white' className='d-md-none btn-without-text' onClick={()=>{setShow(true)}} title='Show side menu' aria-label='Show side menu'>
      <CgMenuLeftAlt />
      </Button>
      <Offcanvas show={show} onHide={() =>{setShow(false)}} onClick={() =>{setShow(false)}}>
        <Offcanvas.Header closeButton>
        <Offcanvas.Title>
        <Image src="/notebook.svg" fluid={true} style={{ height: '30px' }}/>
        Project tracker
        </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SidebarNav />
        </Offcanvas.Body>
      </Offcanvas>
      <Navbar.Brand as={Link} to="/dashboard" className='d-none d-md-block ms-1'>
        <Image src="/notebook.svg" fluid={true} style={{ height: '30px' }}/>
        Project tracker
      </Navbar.Brand>
      <Nav variant="tabs" className='flex-grow-1'>
        
        <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
        <Nav.Link as={NavLink}  to="/projects">Projects</Nav.Link>
        <NavDropdown title={getUser().profileImgUrl
            ?<img src={getUser().profileImgUrl} alt="profile image" className='profile-img-small' />
            :<Avatar name={getUser().nickname} />} drop='down' align='end' className='ms-auto'>
          <NavDropdown.Header>
            {getUser().nickname}
          </NavDropdown.Header>
          <NavDropdown.Divider />
          <NavDropdown.Item as="button" onClick={()=>setProfileChange('name')}>
            Change nickname
          </NavDropdown.Item>
          <NavDropdown.Item as="button" onClick={()=>setProfileChange('img')}>
            New profile Image
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as="button" onClick={handlelogout}>
            Log out
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <ModalChangeNickname profileChange={profileChange} setProfileChange={setProfileChange} />
      <ModalDownloadImg profileChange={profileChange} setProfileChange={setProfileChange} />
    </Navbar>
  );
}

export default Navigation;