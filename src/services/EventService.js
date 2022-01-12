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

export const getConferences = async() => {
  const token = localStorage.getItem('token');
  const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      }
  };

  const { data } = await axios.get(`${apiPath}/events`, config);
  return data;
}

export const deleteConference = async(id) => {
  const token = localStorage.getItem('token');
  const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      }
  };

  const { data } = await axios.delete(`${apiPath}/events/${id}`, config);
  return data;
}