import React, { useLayoutEffect, useReducer, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation, useNavigation } from 'react-router-dom'
import Navigation from '../components/Navigation/Index';
import SidebarNav from '../components/Navigation/SidebarNav';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import GlobalSpinner from '../components/GlobalSpinner';


const PrivateRoot = () => {
  const location = useLocation();
  const mRef = useRef(null);

  useLayoutEffect(() => {
    mRef.current.scrollTo({ top:0, left:0, behavior: "instant" });
  }, [location.pathname]);
  
  return (
    <>
    <Stack className='vh-100'>
      <Navigation />
      <Stack direction='horizontal' className='flex-grow-1 align-items-stretch' style={{overflow: 'hidden'}}>
        <aside className='d-none d-md-block'>
          <SidebarNav />
        </aside>
        <main ref={mRef} className='flex-grow-1 p-1 p-md-4'>
          <Outlet />
        </main>
      </Stack>
    </Stack>
    </>
  )
}

export default PrivateRoot