import React, { useState } from 'react';

import { Modal } from 'antd';


const SectionModal = ({ visible, setVisibility, sectionInfo }) => {
    const { title } = sectionInfo;

    const onClose = () => setVisibility(false);

    return <div>
        <Modal
            visible={visible}
            title={title}
            onCancel={onClose}
            okText={undefined}
        />
    </div>
}

export default SectionModal;
