import axios from 'axios';

import apiPath from '../constants/api/apiPath';

export const fetchLocations = async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const { data } = await axios.get(`${apiPath}/locations`, config);
  return data;
};

export const addEventLocation = async (eventId, name) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const { data } = await axios.post(
    `${apiPath}/locations`,
    { eventId, name },
    config
  );
  return data;
};
