import { useRouter } from 'next/router';
import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import client from '../../lib/client';
import RoomCard from '../rooms/Card';
import Wrapper from './Wrapper';

const Bookings = ({ bookings, accessToken }) => {
  const router = useRouter();
  const handleClick = async (id) => {
    const result = await client
      .delete(`/bookings/${id}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res)
      .catch((error) => console.log('error', error));
    if (result.status === 200) {
      router.reload(window.location.pathname);
    }
  };
  return (
    <>
      {bookings &&
        bookings.map((booking, key) => {
          return (
            <Wrapper>
              <h3>{booking.title}</h3>
              <p>{booking.description}</p>
              <RoomCard
                room={booking.room}
                index={key}
                link={`/booking/${booking.id}?room=${booking.room.id}`}
              />
              <div className="bookings-badge">
                <Badge bg="success"> Start at </Badge>
                <span>{booking.startTime}</span>
              </div>
              <div className="bookings-badge">
                <Badge bg="danger"> End at </Badge> <span>{booking.endTime}</span>
              </div>
              <Button variant="danger" size="sm" onClick={() => handleClick(booking.id)}>
                Delete
              </Button>
            </Wrapper>
          );
        })}
    </>
  );
};
export default Bookings;
