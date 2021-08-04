import React from 'react';
import client from '../../src/lib/client';

export default function RoomPage({ bookings }) {
  return <h1> Hello World</h1>;
}

export async function getServerSideProps(req) {
  const { data } = await client
    .get(`/bookings/byRoom/${req.query.id}`)
    .then((response) => response)
    .catch((error) => console.log('error', error));
  return {
    props: { bookings: data }, // will be passed to the page component as props
  };
}
