import React from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import eventFactory from '../../helpers/eventsFactory';

const localizer = momentLocalizer(moment);

const BookingsCalender = ({ bookings }) => {
  const events = eventFactory(bookings);
  return (
    <Calendar
      events={events}
      step={60}
      timeslots={1}
      min={new Date(0, 0, 0, 8, 0, 0)}
      max={new Date(0, 0, 0, 19, 0, 0)}
      views={['day']}
      defaultView={Views.DAY}
      defaultDate={new Date()}
      localizer={localizer}
    />
  );
};
export default BookingsCalender;
