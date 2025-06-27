import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../Header';

function Layout() {
  return (
    <>
      {/* <Header /> */}
      <Outlet />
    </>
  );
}
export default Layout;
