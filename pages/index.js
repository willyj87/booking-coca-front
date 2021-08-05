import React from 'react';
import client from '../src/lib/client';
import Rooms from '../src/modules/rooms';

export default function Home({ rooms }) {
  return <div>{rooms && <Rooms rooms={rooms} />}</div>;
}

export async function getServerSideProps() {
  const { data } = await client
    .get('/rooms')
    .then((response) => response)
    .catch((error) => console.log('error', error));
  return {
    props: { rooms: data },
  };
}
