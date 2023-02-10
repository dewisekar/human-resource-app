import axios from 'axios';

import { baseUrl } from '../config';

const headers = {
  'Content-Type': 'application/json',
};

const getRequest = async (endpoint) => {
  try {
    const res = await axios.get(baseUrl + endpoint, { headers });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const putRequest = async (endpoint, payload) => {
  try {
    const res = await axios.put(baseUrl + endpoint, payload, { headers });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const postRequest = async (endpoint, payload) => {
  const res = await axios.post(baseUrl + endpoint, payload, { headers });
  return res.data;
};

const patchRequest = async (endpoint, payload) => {
  try {
    const res = await axios.patch(baseUrl + endpoint, payload, { headers });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default {
  getRequest,
  putRequest,
  postRequest,
  patchRequest,
};
