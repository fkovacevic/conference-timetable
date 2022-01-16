import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import './admin-conferences-page.scss';
import { CSVLink } from "react-csv";

import { getConferences, deleteConference, importData, exportData } from '../../../services/EventService';

import { Table, Tooltip, Button, Modal, Input, Form, Upload } from 'antd';
import { EditFilled, NotificationFilled, DeleteFilled, UploadOutlined, ExportOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const displayFormat = 'DD.MM.YYYY. HH:mm';
const dateTimeFormat = 'YYYY-MM-DDTHH:mm:ss[Z]';

const Conferences = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [conferences, setConferences] = useState([]);
  const [fetchingConferences, setFetchingConferences] = useState(false);
  const [isNotificaionModalVisible, setIsNotificationModalVisible] = useState(false);

  const openNotificationModal = () => {
    setIsNotificationModalVisible(true);
  };

  const sendNotification = (notification) => {
    // TODO make API call to send notification
    form.resetFields();
    setIsNotificationModalVisible(false);
  };

  const closeNotificationModal = () => {
    form.resetFields();
    setIsNotificationModalVisible(false);
  };

  const onRedirectToConferencePage = (conferenceId) => {
    let conferenceRoute = `conferences/${conferenceId}`; 
    history.push(conferenceRoute);
  }

  const onCreateNewConference = () => {
    let newConferenceRoute = `conferences/new`; 
    history.push(newConferenceRoute);
  }

  const onImportData = () => {
    // TODO import
  }

  const onExportData = () => {
    exportData()
    .then((data) => {
      exportToJson(data)
    })
  }

  const fetchConferences = () => {
    setFetchingConferences(true);
    getConferences().then(conferences => {
      setConferences(conferences);
      setFetchingConferences(false);
    })
  }

  const onDeleteConference = (conferenceId) => {
    deleteConference(conferenceId).then(() => fetchConferences());
  }

  const exportToJson = (objectData) => {
    let filename = "export.json";
    let contentType = "application/json;charset=utf-8;";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var a = document.createElement('a');
      a.download = filename;
      a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  const columns = [
    {
      title: "Title",
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (title, conference) => <Button onClick={() => onRedirectToConferencePage(conference.id)}>{title}</Button>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: 'Starts',
      dataIndex: 'startAt',
      key: 'startAt',
      render: (start) => moment(start).format(displayFormat),
      sorter: (a, b) =>moment(a.startAt, dateTimeFormat).diff(moment(b.startAt, dateTimeFormat))

    },
    {
      title: 'Ends',
      dataIndex: 'endAt',
      key: 'endAt',
      render: (end) => moment(end).format(displayFormat),
      sorter: (a, b) =>moment(a.endAt, dateTimeFormat).diff(moment(b.endAt, dateTimeFormat))
    },
    {
      width: '150px',
      render: (_, conference) => {
        return (
          <div className='buttons-container'>
            <Tooltip title="Edit conference">
              <EditFilled type="message" style={{ fontSize: '20px', color: '#72bcd4' }} onClick={() => onRedirectToConferencePage(conference.id)}/>
            </Tooltip>
            <Tooltip title="Notify subscribers">
              <NotificationFilled style={{ fontSize: '20px', color: '#ffbf00' }} onClick={openNotificationModal}/>
            </Tooltip>
            <Tooltip title="Delete conference" onClick={() => onDeleteConference(conference.id)}>
              <DeleteFilled style={{ fontSize: '20px', color: '#ff0040' }} />
            </Tooltip>
          </div>
        )
      }
    }
  ];

  useEffect(() => {
    fetchConferences();
  }, [])


return (
  <div>
    <Button type="primary" className='btn' onClick={onCreateNewConference}>Add new conference</Button>
    <Upload name="import" action="/upload.do" className='btn'><Button icon={<UploadOutlined />}>Import conferences data</Button></Upload>
    <Button icon={<ExportOutlined />} type="primary" className='btn' onClick={onExportData}>Export conferences data</Button>

    <div className='table-container'>
      <Table columns={columns} dataSource={conferences} loading={fetchingConferences} />
    </div>   
    <Modal 
      title="Notify subscribers" 
      visible={isNotificaionModalVisible} 
      onCancel={closeNotificationModal}
      onOk={form.submit}
    >
      <Form
        id="notification-form"
        form={form}
        onFinish={sendNotification}
      >
        <Form.Item 
          label="Notification" 
          name="notification" 
          rules={[{ required: true, message: 'Notification text is required' }]}
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  </div>
);
}
export default Conferences;
