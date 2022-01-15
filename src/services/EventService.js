import axios from 'axios';

import apiPath from '../constants/api/apiPath';

// Event

export const getEvent = async (id) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const { data } = await axios.get(`${apiPath}/events/${id}`, config);
  return data;
};

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

export const updateEvent = async (id, event) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const { data } = await axios.put(`${apiPath}/events/${id}`, event, config);
  return data;
};

// Conferences

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

// Locations

export const getEventLocations = async (id) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const { data } = await axios.get(`${apiPath}/events/${id}/locations`, config);
  return data;
};

export const addEventLocation = async ({eventId, name}) => {
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

export const updateEventLocation = async (id, {eventId, name}) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const { data } = await axios.put(
    `${apiPath}/locations/${id}`,
    { eventId, name },
    config
  );
  return data;
};


// Section

export const getEventSections = async (id) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const { data } = await axios.get(`${apiPath}/events/${id}/sections`, config);
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


// Presentations

export const getSectionPresentations = async (id) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const { data } = await axios.get(`${apiPath}/sections/${id}/presentations`, config);
  return data;
}

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


export const importData = async () => {
  const token = localStorage.getItem('token');
  const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      }
  };

  const { data } = await axios.post(`${apiPath}/data`, config);
  return data;
}

export const exportData = async () => {
  const token = localStorage.getItem('token');
  const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      }
  };

  const { data } = await axios.get(`${apiPath}/data`, config);
  return data;
}