import React from 'react';
import { Container, Row } from 'react-bootstrap';
import RoomCard from './Card';

const Rooms = ({ rooms }) => {
  return (
    <Container className="sub-container">
      <Row>{rooms && rooms.map((room, key) => <RoomCard room={room} index={key} />)}</Row>
    </Container>
  );
};
export default Rooms;
