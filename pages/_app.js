import { UserProvider, useUser } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import NavbarLayout from '../src/layout/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider session={pageProps.session}>
      <Head>
        <title>Book your room</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
      </Head>
      <Container fluid>
        <NavbarLayout />
        <Component {...pageProps} />
      </Container>
    </UserProvider>
  );
}
