import React, { useState } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './create-conference.scss';
import moment from 'moment';

import { createEvent } from '../../services/EventService';

import { addEventLocation } from '../../services/LocationService';

import { Form, Input, DatePicker, Button, Select, InputNumber } from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

const { Header, Content } = Layout;
const dateTimeFormat = 'YYYY-MM-DDTHH:mm:ss[Z]';

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const dateRangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Please select time and date'
    }
  ]
};

const emptyPresentationForm = {
  title: '',
  authors: [''],
  description: '',
  position: '',
  durationMinutes: 0,
  attachment: null,
  mainAuthorPhoto: null
};

const emptySectionForm = {
  title: '',
  chairs: [''],
  startAt: null,
  endAt: null,
  backgroundColor: ''
};

const CreateConference = () => {
  const [locations, setLocations] = useState(['']);
  const [chairmen, setChairmen] = useState(['']);
  const [presentations, setPresentations] = useState([emptyPresentationForm]);
  const [sections, setSections] = useState([emptySectionForm]);

  const addLocation = () => {
    setLocations([...locations, '']);
  };

  const addChairman = () => {
    setChairmen([...chairmen, '']);
  };

  const addPresentation = () => {
    setPresentations([...presentations, emptyPresentationForm]);
  };

  const addSection = () => {
    setSections([...sections, emptySectionForm]);
  };

  const onSubmit = async ({ title, description, eventDateRange }) => {
    const requestData = {
      title,
      description,
      startAt: moment(eventDateRange[0]).format(dateTimeFormat),
      endAt: moment(eventDateRange[1]).format(dateTimeFormat)
    };

    createEvent(requestData).then(response => {
      const id = response.id;
      console.log(locations);
      locations.forEach(location => {
        location && addEventLocation(id, location);
      });

      // TODO endpoint not implemented
      // chairmen.forEach(chairman => {
      //   chairman && addEventChairman(id, chairman);
      // });
    });
  };

  const updateLocation = (newLocationValue, index) => {
    const updatedLocations = locations.map((location, i) => {
      if (i == index) {
        return newLocationValue;
      }
      return location;
    });
    setLocations(updatedLocations);
  };

  const updateChairman = (newChairmanValue, index) => {
    const updatedChairmen = chairmen.map((chairman, i) => {
      if (i == index) {
        return newChairmanValue;
      }
      return chairman;
    });
    setChairmen(updatedChairmen);
  };

  return (
    <Layout>
      <Header style={{ color: 'white' }}>Add new conference</Header>
      <Layout>
        <Content>
          <Form name="validate_other" {...formItemLayout} onFinish={onSubmit}>
            <Form.Item
              name="title"
              label="Event name"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Event description"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item
              name="eventDateRange"
              label="Event start and end time"
              {...dateRangeConfig}
            >
              <RangePicker showTime format="DD-MM-YYYY HH:mm" />
            </Form.Item>
            <Form.Item label="Event location">
              {locations.map((location, index) => (
                <div>
                  {index + 1}. Location
                  <Input
                    key={index}
                    value={location}
                    onChange={event => {
                      updateLocation(event.target.value, index);
                    }}
                  />
                </div>
              ))}
              <Button type="button" onClick={addLocation}>
                Add event location
              </Button>
            </Form.Item>
            <Form.Item label="Event chairman">
              {chairmen.map((chairman, index) => (
                <div>
                  {index + 1}. Chairman
                  <Input
                    value={chairman}
                    onChange={event => {
                      updateChairman(event.target.value, index);
                    }}
                  />
                </div>
              ))}
              <Button type="button" onClick={addChairman}>
                Add event chairman
              </Button>
            </Form.Item>
            <Form.Item label="Presentations">
              {presentations.map((presentation, index) => {
                return (
                  <div style={{ marginTop: '50px' }}>
                    <div>{index + 1}. Presentation </div>
                    Presentation title
                    <Input value={presentation.title} />
                    Authors
                    {presentation.authors.map(author => {
                      return <Input value={author} />;
                    })}
                    Summary
                    <TextArea value={presentation.description} />
                    Presentation duration
                    <div>
                      <InputNumber
                        min={0}
                        value={presentation.durationMinutes}
                      />
                      minutes
                    </div>
                    Presentation file
                    <Input type="file" value={presentation.attachment} />
                    Main author photo
                    <Input
                      type="file"
                      accept="image/png, image/jpeg"
                      value={presentation.mainAuthorPhoto}
                    />
                  </div>
                );
              })}
              <Button type="button" onClick={addPresentation}>
                Add event presentation
              </Button>
            </Form.Item>
            <Form.Item label="Sections">
              {sections.map((section, index) => {
                return (
                  <div>
                    <div>{index + 1}. Section </div>
                    Section title
                    <Input value={section.title} />
                    Section location
                    <Select>
                      {locations.map(
                        location =>
                          location && (
                            <Option value={location}>{location}</Option>
                          )
                      )}
                    </Select>
                    Section presentations
                    <Select mode="multiple">
                      {presentations.map(
                        presentation =>
                          presentation.title && (
                            <Option value={presentation.title}>
                              {presentation.title}
                            </Option>
                          )
                      )}
                    </Select>
                    Section chairmen
                    <Select mode="multiple">
                      {chairmen.map(
                        chairman =>
                          chairman && (
                            <Option value={chairman}>{chairman}</Option>
                          )
                      )}
                    </Select>
                  </div>
                );
              })}
              <Button type="button" onClick={addSection}>
                Add event section
              </Button>
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CreateConference;
