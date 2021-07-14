import React from 'react';

import Footer from './Footer';

import Nav from './Nav';

const Layout = ({ children }) => (
  <>
    <Nav />
    {children}
    <Footer />
  </>
);

export default Layout;
