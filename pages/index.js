import Head from 'next/head';
import React, { useEffect } from 'react';
import client from '../src/lib/client';
import Rooms from '../src/modules/rooms';

export default function Home({ rooms }) {
  return <div>{rooms && <Rooms rooms={rooms} />}</div>;
}

export async function getServerSideProps() {
  const { data } = await client
    .get('/rooms')
    .then((res) => res)
    .catch((error) => console.log('error', error));
  return {
    props: { rooms: data }, // will be passed to the page component as props
  };
}
