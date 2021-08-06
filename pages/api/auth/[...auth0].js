import { handleAuth, handleCallback, handleLogin } from '@auth0/nextjs-auth0';
import client from '../../../src/lib/client';

const updateUser = async (req, res, sessions) => {
  const userBooker = await client
    .get('/bookers/find/byUser', {
      headers: {
        authorization: `Bearer ${sessions.accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log('error', error));
  if (userBooker.length === 0) {
    await client
      .post(
        '/bookers',
        {
          compagny: sessions.user.family_name,
        },
        {
          headers: {
            authorization: `Bearer ${sessions.accessToken}`,
          },
        }
      )
      .then((response) => response)
      .catch((error) => console.log('error', error));
  }
  return sessions;
};

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          audience: process.env.AUTH0_AUDIENCE,
          scope: 'openid profile email',
        },
      });
    } catch (error) {
      res.status(error.status || 400).end(error.message);
    }
  },
  async callback(req, res) {
    try {
      await handleCallback(req, res, {
        afterCallback: updateUser,
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
