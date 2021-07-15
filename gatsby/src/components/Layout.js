import React from 'react';
import styled from 'styled-components';

import stripes from '../assets/images/stripes.svg';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Footer from './Footer';
import Nav from './Nav';

const SiteBorderStyles = styled.div`
  background: var(--white) url(${stripes});
  background-size: 1500px;
  max-width: 1000px;
  margin: 12rem auto 4rem;
  margin-top: clamp(2rem, 10vw, 12rem);
  padding: 5px;
  padding: clamp(5px, 1vw, 25px);
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);
  border: 5px solid var(--white);

  @media (max-width: 1100px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

const ContentStyles = styled.div`
  background-color: var(--white);
  padding: 2rem;
`;

const Layout = ({ children }) => (
  <>
    <GlobalStyles />
    <Typography />
    <SiteBorderStyles>
      <ContentStyles>
        <Nav />
        {children}
        <Footer />
      </ContentStyles>
    </SiteBorderStyles>
  </>
);

export default Layout;
