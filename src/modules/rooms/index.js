import React from 'react';
import { Row } from 'react-bootstrap';
import RoomCard from './Card';
import ContainerStyled from './ContainerStyled';

const Rooms = ({ rooms }) => {
  return (
    <ContainerStyled>
      <Row>{rooms && rooms.map((room, key) => <RoomCard room={room} index={key} />)}</Row>
    </ContainerStyled>
  );
};
export default Rooms;
