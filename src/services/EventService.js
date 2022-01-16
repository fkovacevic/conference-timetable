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

export const addEventLocation = ({eventId, name}) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return axios.post(`${apiPath}/locations`, { eventId, name }, config);
};

export const updateEventLocation = (id, {eventId, name}) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return axios.put(`${apiPath}/locations/${id}`, { eventId, name }, config);
};

export const deleteEventLocation = (id) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return axios.delete(`${apiPath}/locations/${id}`, config);
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
  
  return axios.post(`${apiPath}/sections`, section, config);
};

export const updateEventSection = async (id, section) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const { data } = await axios.put(`${apiPath}/sections/${id}`, section, config);
  return data;
};

export const deleteEventSection = async id => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  return await axios.delete(`${apiPath}/sections/${id}`, config);
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
  
  return axios.post(`${apiPath}/presentations`, presentation, config);
};

export const updateSectionPresentation = async (id, presentation) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  return axios.put(`${apiPath}/presentations/${id}`, presentation, config);
};

export const deleteSectionPresentation = async (id) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  return axios.delete(`${apiPath}/presentations/${id}`, config);
};

// Presentation attachment

export const getPresentationAttachment = async (id, file) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const { data } = await axios.get(`${apiPath}/presentations/${id}/attachments`, file, config);
  return data;
}

export const addPresentationAttachment = async (id, attachment) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  return axios.post(`${apiPath}/presentations/${id}/attachments`, attachment, config);
};

export const deletePresentationAttachment = async (id) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  return axios.delete(`${apiPath}/presentations/${id}/attachments`, config);
};


// Presentation main author photo

export const getPresentationAuthorPhoto = async (id) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const { data } = await axios.get(`${apiPath}/presentations/${id}/photos`, config);
  return data;
}

export const addPresentationAuthorPhoto = async (id, attachment) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  return axios.post(`${apiPath}/presentations/${id}/photos`, attachment, config);
};

export const deletePresentationAuthorPhoto = async (id) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  return axios.delete(`${apiPath}/presentations/${id}/photos`, config);
};



// Data

export const importData = async (formData) => {
  const token = localStorage.getItem('token');
  const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      }
  };

  return axios.post(`${apiPath}/data`, formData, config);
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