import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import BookingsCalender from '../../src/components/bookingsCalendar';
import client from '../../src/lib/client';

export default function RoomPage({ room, imageId }) {
  const { name, description, booking } = room;
  return (
    <Container className="sub-container">
      {' '}
      <Card>
        <Card.Img
          src={`https://picsum.photos/id/${imageId}/1200/300`}
          alt="Card image"
          variant="top"
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
      <BookingsCalender bookings={booking} />
      <Button variant="secondary" href="/booking">
        Edit My Bookings
      </Button>
    </Container>
  );
}

export async function getServerSideProps(req) {
  const data = await client
    .get(`/rooms/${req.query.id}`)
    .then((response) => response.data)
    .catch((error) => console.log('error', error));
  return {
    props: { room: data[0], imageId: req.query.image },
  };
}
