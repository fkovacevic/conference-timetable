import axios from 'axios';

import apiPath from '../constants/api/apiPath';


export const getPresentationAttachments = async (presentationId) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            	Authorization: `Bearer ${token}`,
       		}
	};
    const { data } =  await axios.get(`${apiPath}/presentations/${presentationId}/attachments`, config);
    return data;
}