import axios from 'axios';

import apiPath from '../constants/api/apiPath';


export const getUserNotifications = async (userId) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            	Authorization: `Bearer ${token}`,
       		}
	};
    const { data } =  await axios.get(`${apiPath}/users/${userId}/notifications`, config);
    return data;
}
