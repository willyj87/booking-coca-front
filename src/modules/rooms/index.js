import React from 'react';
import { Container, Row } from 'react-bootstrap';
import RoomCard from './Card';

const Rooms = ({ rooms }) => {
  return (
    <Container className="sub-container">
      <Row>
        {rooms &&
          rooms.map((room, key) => <RoomCard room={room} index={key} link={`/room/${room.id}`} />)}
      </Row>
    </Container>
  );
};
export default Rooms;
