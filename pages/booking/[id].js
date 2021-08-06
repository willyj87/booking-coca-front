import { getAccessToken, withPageAuthRequired } from '@auth0/nextjs-auth0';
import React, { useEffect, useState } from 'react';
import { Col, Container, Toast } from 'react-bootstrap';
import { useRouter } from 'next/router';
import BookingsCalender from '../../src/components/bookingsCalendar';
import BookingForm from '../../src/components/form/bookingForm';
import formatTime from '../../src/helpers/formatTime';
import client from '../../src/lib/client';

const BookingPage = ({
  booking: { description, title, id, startTime, endTime, room: bookingRoom },
  accessToken,
}) => {
  const [room, setRoom] = useState(null);
  const [roomId, setRoomId] = useState(bookingRoom.id);
  const [rooms, setRooms] = useState([]);
  const [displayToast, setDisplayToast] = useState(false);
  const [booking, setBooking] = useState({
    startTime,
    endTime,
    description,
    title,
    id,
    roomId,
  });
  const router = useRouter();
  useEffect(() => {
    async function fecthRooms() {
      const data = await client
        .get('/rooms')
        .then((response) => response.data)
        .catch((error) => console.log('error', error));
      setRooms(data);
    }
    fecthRooms();
  }, []);
  useEffect(() => {
    async function fecthRoom() {
      const data = await client
        .get(`/rooms/${roomId}`)
        .then((response) => response.data)
        .catch((error) => console.log('error', error));
      setRoom(data[0]);
    }
    fecthRoom();
  }, [roomId]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === 'room') {
      setRoomId(value);
    } else {
      setBooking({
        ...booking,
        [name]: value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await client
      .patch(
        `/bookings/${booking.id}`,
        {
          startTime: formatTime(booking.startTime),
          endTime: formatTime(booking.endTime),
          room: roomId,
          description: booking.description,
          title: booking.title,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            'content-type': 'application/json',
          },
        }
      )
      .then((res) => res)
      .catch((error) => console.log('errors', error));
    if (response.status === 200) {
      setDisplayToast(true);
      router.reload(window.location.pathname);
    }
  };
  return (
    <Container className="sub-container">
      <Toast
        className="d-inline-block m-1"
        bg="success"
        show={displayToast}
        delay={3000}
        onClose={() => setDisplayToast(false)}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Booking updated!</strong>
          <small>now</small>
        </Toast.Header>
        <Toast.Body className="success">Your booking is updated ! </Toast.Body>
      </Toast>
      <BookingForm
        booking={booking}
        handleChange={handleChange}
        rooms={rooms}
        handleSubmit={handleSubmit}
      />
      {room && (
        <Col>
          <h2>{room.name}</h2>
          <p>{room.description}</p>
          <BookingsCalender bookings={room.booking} />
        </Col>
      )}
    </Container>
  );
};

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/',
  async getServerSideProps({ req, res, query }) {
    const { accessToken } = await getAccessToken(req, res);
    const booking = await client
      .get(`/bookings/${query.id}`, {
        headers: { authorization: `bearer ${accessToken}` },
      })
      .then((response) => response.data)
      .catch((error) => console.log('error', error));

    return { props: { booking, idRoom: query.room, accessToken } };
  },
});

export default BookingPage;
