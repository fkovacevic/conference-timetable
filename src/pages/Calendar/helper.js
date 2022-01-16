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

// const unSub = () => {
//     const subId = localStorage.getItem("subId");
//     axios
//       .delete(
//         `http://localhost:5000/api/Users/${authCtx.userid}/Subscriptions`,
//         {
//           headers: {
//             Authorization: "Bearer " + authCtx.token, //localStorage.getItem("token"),
//           },
//           data: {
//             id: subId, // This is the body part
//           },
//         }
//       )
//       .then(async (res) => {
//         const sub = await unsubscribeUserReturnSubscription();
//         console.log(sub);
//         console.log("endpoint je " + sub.endpoint);
//         console.log("Uspio si deletat s --> ", res.status);
//       })
//       .catch((err) => {
//         console.log(err.message ?? err);
//       });
//   };
