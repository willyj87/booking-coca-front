import { getAccessToken, withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import client from '../../src/lib/client';
import Bookings from '../../src/modules/bookings';

const BookingsPage = ({ booker: { booking }, accessToken }) => {
  return (
    <Container className="sub-container">
      <Row style={{ justifyContent: 'center' }} lg={4}>
        {booking.length > 0 && <Bookings bookings={booking} accessToken={accessToken} />}
      </Row>
      <Button variant="primary" href="/booking/create" size="lg">
        Book a room
      </Button>
    </Container>
  );
};

export default BookingsPage;

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/',
  async getServerSideProps({ req, res }) {
    const { accessToken } = await getAccessToken(req, res);
    const data = await client
      .get('/bookers/find/byuser', {
        headers: { authorization: `bearer ${accessToken}` },
      })
      .then((response) => response.data)
      .catch((error) => console.log('error', error));

    return { props: { booker: data[0], accessToken } };
  },
});
