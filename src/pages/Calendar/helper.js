import moment from 'moment';

export const sectionInfoToCalendarEventTitle = (section) =>
    `${section.title} (${section.locationName ?? ''})
     ${moment(section.startAt).format('hh:mm A')}-${moment(section.endAt).format('hh:mm A')}`;

export const sectionsInfoToCalendarEvents = (sections) => sections.map((section) => ({
    title: sectionInfoToCalendarEventTitle(section),
    start: new Date(section.startAt),
    end: new Date(section.endAt),
    color: section.backgroundColor,
    chairs: section.chairs,
    id: section.id,
}));
