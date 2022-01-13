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