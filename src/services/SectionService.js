import axios from 'axios';

import apiPath from '../constants/api/apiPath';


export const getSectionPresentations = async (sectionId) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            	Authorization: `Bearer ${token}`,
       		}
	};
    const { data } =  await axios.get(`${apiPath}/sections/${sectionId}/presentations`, config);
    return data;
}
