import axios from 'axios';

import apiPath from '../constants/api/apiPath';

export const createEvent = async event => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const { data } = await axios.post(`${apiPath}/events`, event, config);
  return data;
};
