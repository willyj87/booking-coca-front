import React from 'react';
import { Button } from 'react-bootstrap';
import CardStyled from './CardStyled';

const RoomCard = ({ room, index }) => {
  const imageId = `2${index}`;
  return (
    <CardStyled style={{ width: '18rem' }}>
      <CardStyled.Img variant="top" src={`https://picsum.photos/id/${imageId}/200/75`} />
      <CardStyled.Body>
        <CardStyled.Title>{room.name}</CardStyled.Title>
        <Button variant="secondary" href={`/room/${room.id}?image=${imageId}`}>
          See Avaibilities
        </Button>
      </CardStyled.Body>
    </CardStyled>
  );
};
export default RoomCard;
