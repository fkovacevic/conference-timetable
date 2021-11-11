import moment from 'moment';

export const sectionInfoToCalendarEventTitle = (section) => `${section.title} (${section.locationName ?? ''})`;

export const sectionsInfoToCalendarEvents = (sections) => sections.map((section) => ({
    title: sectionInfoToCalendarEventTitle(section),
    start: new Date(section.startAt),
    end: new Date(section.endAt),
}));