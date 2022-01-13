import moment from 'moment';

export const sectionInfoToCalendarEventTitle = (section, locationName) =>
    `${section.title} [${locationName ?? ''}]
     ${moment(section.startAt).format('HH:mm')}-${moment(section.endAt).format('HH:mm')}`;

export const sectionsInfoToCalendarEvents = (sections, locationsMap) => sections.map((section) => {
    return {
        title: sectionInfoToCalendarEventTitle(section, locationsMap[section.locationId]),
        start: new Date(section.startAt),
        end: new Date(section.endAt),
        color: section.backgroundColor,
        chairs: section.chairs,
        id: section.id,
    }
});

export const locationsToMap = (locations) => locations?.reduce((locationsMap, location) => {
    locationsMap[location.id] = location.name;
    return locationsMap;
}, {});
