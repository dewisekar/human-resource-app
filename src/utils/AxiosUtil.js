import axios from 'axios';

import StorageUtil from './StorageUtil';
import { baseUrl } from '../config';

const { getToken } = StorageUtil;

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const getRequest = async (endpoint) => {
  const token = getToken();
  try {
    const finalHeaders = token ? { ...defaultHeaders, token } : defaultHeaders;
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
    const finalHeaders = token ? { ...defaultHeaders, token } : defaultHeaders;
    const res = await axios.put(baseUrl + endpoint, payload, { headers: finalHeaders });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const postRequest = async (endpoint, payload) => {
  const token = getToken();
  const finalHeaders = token ? { ...defaultHeaders, token } : defaultHeaders;
  const res = await axios.post(baseUrl + endpoint, payload, { headers: finalHeaders });
  return res.data;
};

const patchRequest = async (endpoint, payload) => {
  const token = getToken();
  const finalHeaders = token ? { ...defaultHeaders, token } : defaultHeaders;
  try {
    const res = await axios.patch(baseUrl + endpoint, payload, { headers: finalHeaders });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const postMultipartRequest = async (endpoint, payload) => {
  const token = getToken();
  const headers = {
    'Content-type': 'multipart/form-data', token,
  };
  const res = await axios.post(baseUrl + endpoint, payload, { headers });
  return res.data;
};

export default {
  getRequest,
  putRequest,
  postRequest,
  patchRequest,
  postMultipartRequest,
};
