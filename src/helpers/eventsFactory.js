import moment from 'moment';

const eventFactory = (bookings) =>
  bookings.map((book) => {
    const today = moment().format();
    const utcStartTime = new Date(
      `${today.toString().split('T')[0]}T${book.startTime}`
    ).toUTCString();
    const start = new Date(utcStartTime);
    const utcEndTime = new Date(`${today.toString().split('T')[0]}T${book.endTime}`).toUTCString();
    const end = new Date(utcEndTime);
    return {
      id: book.id,
      title: book.title,
      start,
      end,
    };
  });
export default eventFactory;
