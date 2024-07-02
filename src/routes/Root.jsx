import React from 'react'
import { Outlet, useNavigation } from 'react-router-dom';
import GlobalSpinner from '../components/GlobalSpinner';

const Root = () => {
  const navigation = useNavigation();

  return (
    <>
    {navigation.state !== "idle" && <GlobalSpinner />}
    <Outlet />
    </>
  )
}

export default Root