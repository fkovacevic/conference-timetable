import React, { useState } from 'react';
import './admin-conference-page.scss';
import 'antd/dist/antd.css';
import moment from 'moment';
import { BlockPicker } from 'react-color';

import { createEvent, addEventLocation, addEventChairman, addEventSection, addSectionPresentation } from '../../../services/EventService';

import { Collapse } from 'antd';
import { Form, Input, DatePicker, Button, Select, InputNumber, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { hexToNumber } from '../../../common/common';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const dateTimeFormat = 'YYYY-MM-DDTHH:mm:ss[Z]';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const dateRangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Time and date are required'
    }
  ]
};

const AdminConferencePage = () => {
  const [eventId, setEventId] = useState(null)
  const [eventForm] = Form.useForm();
  const [locationsForm] = Form.useForm();
  const [chairmenForm] = Form.useForm();
  const [presentationsForm] = Form.useForm();
  const [sectionsForm] = Form.useForm();

  const sectionsOptions = [{ id: 0, title: 'test1' }, { id: 1, title: 'test2' }];
  const locationsOptions = [{id: 0, name: 'test1'}, {id: 1, name: 'test2'}];
  const chairmenOptions = ['test1', 'test2'];

  const emptySectionForm = {
    title: '',
    location: null,
    sectionDateRange: null,
    chairmen: [],
    backgroundColor: {}
  }

  const emptyPresentationForm = {
    section: null,
    title: '',
    authors: [''],
    description: '',
    durationMinutes: null,
  }

  const onCreateEvent = (values) => {
    const requestData = {
      title: values.title,
      description: values.description,
      startAt: moment(values.eventDateRange[0]).format(dateTimeFormat),
      endAt: moment(values.eventDateRange[1]).format(dateTimeFormat)
    };

    createEvent(requestData).then(response => { setEventId(response.id) })
  }

   
  const onSubmitLocations = ({locations}) => {
    locations.forEach(location => {location && addEventLocation({eventId, name: location})})
  }

  const onSubmitChairmen = ({chairmen}) => {
    chairmen.forEach(chairman => {chairman && addEventChairman({eventId, name: chairman})})
  }
  
  const onSubmitSections = ({sections}) => {
    sections.forEach(section => {
      const requestData = {
        eventId,
        title: section.title,
        locationId: section.location,
        chairs: section.chairmen,
        startAt: moment(section.sectionDateRange[0]).format(dateTimeFormat),
        endAt: moment(section.sectionDateRange[1]).format(dateTimeFormat),
        backgroundColor: hexToNumber(section.backgroundColor)
      }

      section && addEventSection(requestData)
      }
    )
  }

  const onSubmitPresentations = ({presentations}) => {
    presentations.forEach(presentation => {
      const requestData = {
        sectionId: presentation.section,
        title: presentation.title,
        authors: presentation.authors,
        description: presentation.description,
        position: 0,
        durationMinutes: presentation.durationMinutes
      }

      presentation && addSectionPresentation(requestData);
    })

  }

  const uploadAttachment = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const uploadAuthorPhoto = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Event" key="1">
          <Form form={eventForm}  onFinish={onCreateEvent}>
            <Form.Item 
              label="Event name"
              name="title"
              rules={[{ required: true, message: 'Event title is required' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Event description"
              name="description"
              rules={[{ required: true, message: 'Event description is required' }]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item
              label="Event start and end time"
              name="eventDateRange"
              {...dateRangeConfig}
            >
              <RangePicker showTime format="DD-MM-YYYY HH:mm" />
            </Form.Item>
            <Button htmlType="submit">Create event</Button>
          </Form>
        </Panel>

        {eventId && (
          <>
          <Panel header="Locations" key="2">
            <Form form={locationsForm} {...formItemLayoutWithOutLabel} initialValues={{ locations:[''] }} onFinish={onSubmitLocations} >
              <Form.List label="Event locations" name="locations">
                {(locations, { add, remove }, { errors }) => (
                <>
                  {locations.map((location, index) => (
                    <Form.Item
                      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                      label={index === 0 ? 'Locations' : ''}
                      required={false}
                      key={location.key}
                    >
                      <Form.Item
                        {...location}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Location name is required",
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="Location name" style={{ width: '60%' }} />
                      </Form.Item>
                      {locations.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(location.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: '60%' }}
                      icon={<PlusOutlined />}
                    >
                      Add location
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
              </Form.List>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit locations
                </Button>
              </Form.Item>
            </Form>
          </Panel>


          <Panel header="Chairmen" key="3">
            <Form form={chairmenForm} {...formItemLayoutWithOutLabel} initialValues={{chairmen: ['']}} onFinish={onSubmitChairmen} >
              <Form.List label="Chairmen" name="chairmen">
                {(chairmen, { add, remove }, { errors }) => (
                <>
                  {chairmen.map((chairman, index) => (
                    <Form.Item
                      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                      label={index === 0 ? 'Chairmen' : ''}
                      required={false}
                      key={chairman.key}
                    >
                      <Form.Item
                        {...chairman}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Chairman's name is required",
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="Chairman" style={{ width: '60%' }} />
                      </Form.Item>
                      {chairmen.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(chairman.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: '60%' }}
                      icon={<PlusOutlined />}
                    >
                      Add chairman
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
              </Form.List>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit chairmen
                </Button>
              </Form.Item>
            </Form>
          </Panel>

          <Panel header="Sections" key="5" {...formItemLayoutWithOutLabel} >
            <Form form={sectionsForm} initialValues={{sections: [emptySectionForm]}} onFinish={onSubmitSections}>
              <Form.List label="Sections" name="sections">
                {(sections, { add, remove }, { errors }) => (
                  <>
                    {sections.map((section, index) => (
                      <>
                        <Form.Item
                          {...formItemLayoutWithOutLabel}
                          label={`${index + 1}. Section`}
                          required={false}
                          key={section.key}
                        >
                          <Form.Item
                            label="Title"
                            name={[index, "title"]}
                            rules={[{ required: true, message: "Section name is required" }]}
                          >
                            <Input value={section.title} />
                          </Form.Item>
                          <Form.Item
                            label="Location"
                            name={[index, "location"]}
                            rules={[{ required: true, message: "Section location is required" }]}
                          >
                            <Select>
                              {locationsOptions.map(
                                location =>
                                  location && (
                                    <Option value={location.id}>{location.name}</Option>
                                  )
                              )}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            label="Start and end time"
                            name={[index, "sectionDateRange"]}
                            {...dateRangeConfig}
                          >
                            <RangePicker showTime format="DD-MM-YYYY HH:mm" />
                          </Form.Item>
                          <Form.Item
                            label="Chairmen"
                            name={[index, "chairmen"]}
                            rules={[{ required: true, message: "Chairmen are required" }]}
                          >
                            <Select mode="multiple">
                              {chairmenOptions.map(
                                chairman =>
                                  chairman && (
                                    <Option value={chairman}>{chairman}</Option>
                                  )
                              )}
                            </Select>
                          </Form.Item>
                          <Form.Item label="Background color" name={[index, "backgroundColor"]}>
                            <BlockPicker
                              value={sectionsForm.getFieldValue().sections[index]?.backgroundColor}
                              color={sectionsForm.getFieldValue().sections[index]?.backgroundColor}
                              triangle="hide"
                              onChangeComplete={(color) => {
                                console.log(color)
                                const fields = sectionsForm.getFieldValue();
                                const {sections} = fields;
                                Object.assign(sections[index], {...sections[index], backgroundColor: color.hex})
                                sectionsForm.setFieldsValue({sections})
                              }}
                          />
                          </Form.Item>
                        </Form.Item>
                        {sections.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(section.name)}
                          />
                        ) : null}
                      </>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: '60%' }}
                        icon={<PlusOutlined />}
                      >
                        Add section
                      </Button>
                      <Form.ErrorList errors={errors} />
                  </Form.Item>
                  </>
                )}
              </Form.List>
              <Button type="button"  htmlType="submit">
                Add event section
              </Button>
            </Form>
          </Panel>

          <Panel header="Presentations" key="4" >
            <Form form={presentationsForm} {...formItemLayoutWithOutLabel} initialValues={{presentations: [emptyPresentationForm]}} onFinish={onSubmitPresentations}>
              <Form.List label="Presentations" name="presentations">
                {(presentations, { add, remove }, { errors }) => (
                  <>
                    {presentations.map((presentation, index) => (
                      <>
                        <Form.Item
                          {...formItemLayoutWithOutLabel}
                          label={`${index + 1}. Presentation`}
                          required={false}
                          key={presentation.key}
                        >
                          <Form.Item
                            label="Title"
                            name={[index, "title"]}
                            rules={[{ required: true, message: "Presentation title is required" }]}
                          >
                            <Input value={presentation.title} />
                          </Form.Item>
                          <Form.Item
                            label="Section"
                            name={[index, "section"]}
                            rules={[{ required: true, message: "Section is required" }]}
                          >
                            <Select>
                              {sectionsOptions.map(
                                section =>
                                  section.title && (
                                    <Option value={section.id}>
                                      {section.title}
                                    </Option>
                                  )
                              )}
                            </Select>
                          </Form.Item>
                          <Form.List label="Authors"  name={[index, "authors"]}>
                            {(authors, { add, remove: removeAuthor }, { errors }) => (
                              <>
                                {authors.map((author, index) => (
                                  <>
                                    <Form.Item
                                      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                      label={index === 0 ? 'Authors' : ''}
                                      required={false}
                                      key={author.key}
                                    >
                                      <Form.Item
                                        {...author}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                          {
                                            required: true,
                                            whitespace: true,
                                            message: "Author is required",
                                          },
                                        ]}
                                        noStyle
                                      >
                                        <Input placeholder="Author" style={{ width: '60%' }} />
                                      </Form.Item>
                                      {authors.length > 1 ? (
                                        <MinusCircleOutlined
                                          className="dynamic-delete-button"
                                          onClick={() => removeAuthor(author.name)}
                                        />
                                      ) : null}
                                    </Form.Item>
                                  </>
                                ))}
                                <Form.Item>
                                  <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '60%' }}
                                    icon={<PlusOutlined />}
                                  >
                                    Add author
                                  </Button>
                                  <Form.ErrorList errors={errors} />
                                </Form.Item>
                              </>
                            )}
                          </Form.List>
                          <Form.Item
                            label="Summary"
                            name={[index, "description"]}
                            rules={[{ required: true, message: "Description is required" }]}
                          >
                            <TextArea  value={presentation.description} />
                          </Form.Item>
                          <Form.Item 
                            label="Duration in minutes"
                            name={[index, "durationMinutes"]}
                            rules={[{ required: true, message: "Duration is required" }]}
                          >
                            <InputNumber
                              min={0}
                              value={presentation.durationMinutes}
                            />
                          </Form.Item>
                          <Form.Item 
                            label="Attachment"
                            name={[index, "attachment"]}
                            valuePropName="file"
                            getValueFromEvent={uploadAttachment}
                          >
                            <Upload name="attachment" action="/upload.do" listType="picture">
                              <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                          </Form.Item>
                          <Form.Item 
                            label="Main author photo"
                            name={[index, "authorPhoto"]}
                            valuePropName="file"
                            getValueFromEvent={uploadAuthorPhoto}
                          >
                            <Upload name="authorPhoto" action="/upload.do" listType="picture">
                              <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                          </Form.Item>
                        </Form.Item>
                        {presentations.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(presentation.name)}
                          />
                        ) : null}
                      </>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: '60%' }}
                        icon={<PlusOutlined />}
                      >
                        Add presentation
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit presentations
                </Button>
              </Form.Item>
            </Form>
          </Panel>
          </>
        )}
      </Collapse>
    </div>
  );
};

export default AdminConferencePage;
