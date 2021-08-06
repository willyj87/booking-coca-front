import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const client = () => {
  return axios.create({
    baseURL: publicRuntimeConfig.apiEndpoint,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export default client();
