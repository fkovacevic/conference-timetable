import React, { useState, useEffect } from 'react';
import './admin-conference-page.scss';
import 'antd/dist/antd.css';
import moment from 'moment';
import { BlockPicker } from 'react-color';
import { useParams, useHistory } from 'react-router-dom';

import { 
  createEvent,
  addEventLocation,
  addEventSection,
  addSectionPresentation,
  getEvent,
  getEventSections,
  getEventLocations,
  updateEvent,
  updateEventLocation,
  deleteEventLocation,
  updateEventSection,
  deleteEventSection,
  updateSectionPresentation,
  deleteSectionPresentation,
  addPresentationAttachment,
  addPresentationAuthorPhoto,
} from '../../../services/EventService';

import { Collapse } from 'antd';
import { Form, Input, DatePicker, Button, Select, InputNumber, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { hexToNumber, numberToHexColor } from '../../../common/common';
import { getSectionPresentations } from '../../../services/SectionService';

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

const emptySectionForm = {
  id: null,
  title: '',
  location: null,
  sectionDateRange: null,
  backgroundColor: {}
}

const emptyPresentationForm = {
  id: null,
  section: null,
  title: '',
  description: '',
  durationMinutes: null,
}

const AdminConferencePage = () => {
  const { conferenceId: eventId } = useParams();
  const history = useHistory();
  const actionText = eventId ? 'Update' : 'Submit'
  const editMode = Boolean(eventId);

  const [eventForm] = Form.useForm();
  const [locationsForm] = Form.useForm();
  const [presentationsForm] = Form.useForm();
  const [sectionsForm] = Form.useForm();

  const [locationsOptions, setLocationsOptions] = useState([]);
  const [sectionsOptions, setSectionsOptions] = useState([]);
  const [presentationsOptions, setPresentationsOptions] = useState([]);


  useEffect(() => {
    if (eventId) {
      getEvent(eventId).then((event) => setEventForm(event));
      getEventLocations(eventId).then((locations) => {
        setLocationsForm(locations);
        setLocationsOptions(locations)
      })
      getEventSections(eventId).then((sections) => {
        setSectionsForm(sections);
        setSectionsOptions(sections);
        sections.forEach((section) => {
          getSectionPresentations(section.id).then((presentations) => {
            // TODO should fetch all event presentations
            setPresentationsOptions([...presentationsOptions, ...presentations]);
            updatePresentationsForm(section.id, presentations);
          })
        })
      })
      

    }
  }, [])

  const setEventForm = (event) => {
    eventForm.setFieldsValue({
      title: event.title,
      description: event.description,
      eventDateRange: [moment(event.startAt).utc(), moment(event.endAt).utc()]
    })
  }
  
  const setSectionsForm = (sections) => {
    if (sections.length > 0) {
      sectionsForm.setFieldsValue({
        sections: sections.map((section) => {
          return {
            id: section.id,
            title: section.title,
            location: section.locationId,
            chairmen: section.chairs,
            sectionDateRange: [moment(section.startAt).utc(), moment(section.endAt).utc()],
            backgroundColor: numberToHexColor(section.backgroundColor)
          }
        })
      })
    }
  }

  const setLocationsForm = (locations) => {
    if (locations.length) {
      locationsForm.setFieldsValue({ locations })
    }
  }

  const updatePresentationsForm = (sectionId, presentations) => {
    const { presentations: currentPresentations } = presentationsForm.getFieldsValue();
    if (presentations.length > 0) {
      presentationsForm.setFieldsValue({presentations: [...(currentPresentations || []), ...presentations.map(presentation => {
        return {
          id: presentation.id,
          section: sectionId,
          title: presentation.title,
          authors: presentation.authors,
          description: presentation.description,
          durationMinutes: presentation.durationMinutes,
          position: 1
        }
      })]})
    }
  }
  
  const onSubmitEvent = (values) => {
    const requestData = {
      title: values.title,
      description: values.description,
      startAt: moment(values.eventDateRange[0]).format(dateTimeFormat),
      endAt: moment(values.eventDateRange[1]).format(dateTimeFormat)
    };

    editMode ? 
    updateEvent(eventId, requestData)
    : createEvent(requestData).then(({id}) => { history.push(`/conferences/${id}`); window.location.reload() })
  }

   
  const onSubmitLocations = async ({locations}) => {
    const locationIds = locations.map(location => location.id);
    const locationsToRemove = locationsOptions.filter(l => !locationIds.includes(l.id));
    Promise.all([...locations.map(location => {
      return location && location.id ?
      updateEventLocation(location.id, {eventId, name: location.name})
      : addEventLocation({eventId, name: location.name})
    }), ...locationsToRemove.map((location) => deleteEventLocation(location.id))]
    ).then(() =>
      getEventLocations(eventId).then((locations) => {
        setLocationsOptions(locations)
        setLocationsForm(locations)
    }))
  }
  
  const onSubmitSections = ({sections}) => {
    const sectionsIds = sections.map(section => section.id);
    const sectionsToRemove = sectionsOptions.filter(s => !sectionsIds.includes(s.id));
    Promise.all([...sections.map(section => {
      const requestData = {
        eventId,
        title: section.title,
        locationId: section.location,
        chairs: section.chairmen,
        startAt: moment(section.sectionDateRange[0]).format(dateTimeFormat),
        endAt: moment(section.sectionDateRange[1]).format(dateTimeFormat),
        backgroundColor: hexToNumber(section.backgroundColor)
      }

      return section && section.id ? 
        updateEventSection(section.id, requestData)
        : addEventSection(requestData)
      }),
      ...sectionsToRemove.map((section) => deleteEventSection(section.id))
    ]).then(() => getEventSections(eventId)).then((sections) => {
      setSectionsOptions(sections);
      setSectionsForm(sections);
    })
  }

  const submitPresentationFiles = (presentationId, presentation) => {
    return Promise.all([
      addPresentationAttachment(presentationId, presentation.attachment), 
      addPresentationAuthorPhoto(presentationId, presentation.authorPhoto)
    ])
  }

  const onSubmitPresentations = ({presentations}) => {
    const presentationsToRemove = presentationsOptions.filter(p => !presentationsIds.includes(p.id));
    Promise.all([...presentations.map(presentation => {
        const requestData = {
          sectionId: presentation.section,
          title: presentation.title,
          authors: presentation.authors,
          description: presentation.description,
          position: 1,
          durationMinutes: presentation.durationMinutes
        }

        return presentation && presentation.id ?
          updateSectionPresentation(presentation.id, requestData).then(() => submitPresentationFiles(presentation.id, presentation))
          : addSectionPresentation(requestData).then(({id}) => submitPresentationFiles(id, presentation));
        }
      ),
        ...presentationsToRemove.map((presentation) => deleteSectionPresentation(presentation.id))
    ]).then(() => {
      setPresentationsOptions([]);
      // TODO should fetch all event presentations
      sectionsOptions.forEach((section) => {
        getSectionPresentations(section.id).then((presentations) => {
          setPresentationsOptions([...presentationsOptions, ...presentations]);
          updatePresentationsForm(section.id, presentations);
        })
      })
    })
  }

  const onUploadAttachment = ({file}) => {
    const formData = new FormData();

    formData.append(
      "attachment",
      file,
      file.name
    );

    return formData;
  };

  const onUploadAuthorPhoto = ({file}) => {
    const formData = new FormData();
    formData.append(
      "photo",
      file,
      file.name
    );

   return formData;
  };

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Event" key="1">
          <Form form={eventForm}  onFinish={onSubmitEvent}>
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
            <Button type="primary" htmlType="submit">{actionText} event</Button>
          </Form>
        </Panel>

        {eventId && (
          <>
          <Panel header="Locations" key="2">
            <Form form={locationsForm} {...formItemLayoutWithOutLabel} initialValues={{ locations:[{ id: null, name: '' }] }} onFinish={onSubmitLocations} >
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
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Location name is required",
                          },
                        ]}
                        noStyle
                        name={[index, "name"]}
                      >
                        <Input value={location.name} placeholder="Location name" style={{ width: '60%' }} />
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
                  {locationsOptions.length == 0 ? 'Submit' : 'Update'} locations
                </Button>
              </Form.Item>
            </Form>
          </Panel>

          <Panel header="Sections" key="3" {...formItemLayoutWithOutLabel} >
            <Form form={sectionsForm} initialValues={{sections: [emptySectionForm]}} onFinish={onSubmitSections}>
              <Form.List label="Sections" name="sections">
                {(sections, { add, remove }, { errors }) => (
                  <>
                    {sections.map((section, index) => (
                      <>
                        {sections.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(section.name)}
                          />
                        ) : null}
                        <Form.Item
                          {...formItemLayout}
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
                          <Form.List label="Chairmen" initialValue={['']} name={[index, "chairmen"]}>
                            {(chairmen, { add, remove }, { errors }) => (
                              <>
                                {chairmen.map((chairman, index) => (
                                  <>
                                    <Form.Item
                                      {...formItemLayoutWithOutLabel}
                                      label={index === 0 ? 'Chairmen' : ''}
                                      required={true}
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
                                  </>
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
                          <Form.Item 
                            label="Background color" 
                            name={[index, "backgroundColor"]}
                            rules={[{ required: true }]}
                          >
                            <BlockPicker
                              value={sectionsForm.getFieldValue().sections[index]?.backgroundColor}
                              color={sectionsForm.getFieldValue().sections[index]?.backgroundColor}
                              triangle="hide"
                              onChangeComplete={(color) => {
                                const fields = sectionsForm.getFieldValue();
                                const { sections } = fields;
                                Object.assign(sections[index], {...sections[index], backgroundColor: color.hex})
                                sectionsForm.setFieldsValue({sections})
                              }}
                          />
                          </Form.Item>
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
                        Add section
                      </Button>
                      <Form.ErrorList errors={errors} />
                  </Form.Item>
                  </>
                )}
              </Form.List>
              <Button type="primary" htmlType="submit">
                {actionText} sections
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
                          <Form.List label="Authors" initialValue={['']}  name={[index, "authors"]}>
                            {(authors, { add, remove: removeAuthor }, { errors }) => (
                              <>
                                {authors.map((author, index) => (
                                  <>
                                    <Form.Item
                                      {...formItemLayoutWithOutLabel}
                                      label={index === 0 ? 'Authors' : ''}
                                      required={true}
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
                            getValueFromEvent={onUploadAttachment}
                          >
                            <Upload name="attachment" listType="picture" multiple={false} beforeUpload={() => false} maxCount={1}>
                              <Button icon={<UploadOutlined />}>Upload presentation file</Button>
                            </Upload>
                          </Form.Item>
                          <Form.Item 
                            label="Main author photo"
                            name={[index, "authorPhoto"]}
                            getValueFromEvent={onUploadAuthorPhoto}
                          >
                            <Upload name="authorPhoto" listType="picture" beforeUpload={() => false} maxCount={1}>
                              <Button icon={<UploadOutlined />}>Upload main author photo</Button>
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
                  {actionText} presentations
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
