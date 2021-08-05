import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import client from '../../src/lib/client';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default function RoomPage({ room, imageId }) {
  const { name, description, booking } = room;

  const events = booking.map((book) => {
    const today = moment().format();
    const start = new Date(`${today.toString().split('T')[0]}T${book.startTime}+0200`);
    const end = new Date(`${today.toString().split('T')[0]}T${book.endTime}+0200`);
    return {
      id: book.id,
      title: book.title,
      start,
      end,
    };
  });
  const onEventDrop = (data) => {
    console.log(data);
  };
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
      <DnDCalendar
        selectable
        events={events}
        step={60}
        timeslots={1}
        min={new Date(0, 0, 0, 8, 0, 0)}
        max={new Date(0, 0, 0, 19, 0, 0)}
        views={['day']}
        defaultView={Views.DAY}
        defaultDate={new Date()}
        localizer={localizer}
        onEventDrop={onEventDrop}
        resizable
        onSelecting={(range) => {
          // console.log('range', range);
        }}
        onSelectEvent={(data) => {
          console.log('data', data);
        }}
      />
    </Container>
  );
}

export async function getServerSideProps(req) {
  const data = await client
    .get(`/rooms/${req.query.id}`)
    .then((response) => response.data)
    .catch((error) => console.log('error', error));
  return {
    props: { room: data, imageId: req.query.image }, // will be passed to the page component as props
  };
}
