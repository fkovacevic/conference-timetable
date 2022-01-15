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

export const addEventChairman = async chairman => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const { data } = await axios.post(`${apiPath}/chairmen`, chairman, config);
  return data;
};

export const addEventSection = async section => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const { data } = await axios.post(`${apiPath}/sections`, section, config);
  return data;
};

export const addSectionPresentation = async presentation => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const { data } = await axios.post(`${apiPath}/presentations`, presentation, config);
  return data;
};