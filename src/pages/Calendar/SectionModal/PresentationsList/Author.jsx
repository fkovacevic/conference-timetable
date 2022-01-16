import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons'

import apiPath from '../../../../constants/api/apiPath';

const Author = ({ authorName, hasPicture, presentationId }) => {
    return (hasPicture ?
            <div>
                <Avatar src={`${apiPath}/presentations/${presentationId}/photos`} style={{marginRight: '5px', marginBottom: '3px'}}/>
                <b>{authorName}</b>
            </div> :
            <div>
               <Avatar icon={<UserOutlined className="presentation-list__author"/>} style={{marginRight: '5px', marginBottom: '3px'}}/>
                {authorName}
            </div>
    );
}

export default Author;