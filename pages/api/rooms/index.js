import client from '../../../src/lib/client';

export default async function handler(req, res) {
  const { data } = await client
    .get('/rooms')
    .then((res) => res)
    .catch((error) => console.log('error', error));
  return data;
}
