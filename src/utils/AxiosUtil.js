import axios from 'axios';

import StorageUtil from './StorageUtil';
import { baseUrl } from '../config';

const { getToken } = StorageUtil;

const headers = {
  'Content-Type': 'application/json',
};

const getRequest = async (endpoint) => {
  const token = getToken();
  try {
    const finalHeaders = token ? { ...headers, token } : headers;
    const res = await axios.get(baseUrl + endpoint, { headers: finalHeaders });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const putRequest = async (endpoint, payload) => {
  const token = getToken();
  try {
    const finalHeaders = token ? { ...headers, token } : headers;
    const res = await axios.put(baseUrl + endpoint, payload, { headers: finalHeaders });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const postRequest = async (endpoint, payload) => {
  const token = getToken();
  const finalHeaders = token ? { ...headers, token } : headers;
  const res = await axios.post(baseUrl + endpoint, payload, { headers: finalHeaders });
  return res.data;
};

const patchRequest = async (endpoint, payload) => {
  const token = getToken();
  const finalHeaders = token ? { ...headers, token } : headers;
  try {
    const res = await axios.patch(baseUrl + endpoint, payload, { headers: finalHeaders });
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
