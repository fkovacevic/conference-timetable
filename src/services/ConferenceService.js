import axios from 'axios';

import apiPath from '../constants/api/apiPath';


export const getConference = async (conferenceId) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const { data } =  await axios.get(`${apiPath}/events/${conferenceId}`, config);
    return data;
}

export const getConferenceSections = async(conferenceId) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const { data } = await axios.get(`${apiPath}/events/${conferenceId}/sections`, config);
    return data;
}