import axios from "axios";
import apiPath from "../constants/api/apiPath";
export const numberToHexColor = (numberColor) => {
  return numberColor.toString(16);
};

export const hexToNumber = (hexString) => {
    const parsedHexStrig = hexString.replace('#', '');
    return parseInt(parsedHexStrig, 16);
}

export const subscribeAfterLogin = (userId, token, subscription) => {
  var config = {
    method: "post",
    url: `${apiPath}/Users/${userId}/Subscriptions`,
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    data: { endpoint: subscription.endpoint, keys: subscription.keys },
  };
  console.log(config.data);
  axios(config)
    .then((res) => {
      console.log("Response je " + res.status);
      console.log("Id suba je " + res.data.id);
      // localStorage.setItem("subId", res.data.id);
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message ?? err);
    });
};

export const clearCacheAtLogout = () => {
  const createdCaches = ["calendar", "eventovi", "userEvents", "sections"];
  caches.keys().then((keys) => {
    for (let name of createdCaches) {
      caches.delete(name);
    }
  });
};

export const unsubscribeUser = () => {
  // caches.delete()
  return navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    return serviceWorkerRegistration.pushManager
      .getSubscription()
      .then((subscription) => subscription.unsubscribe());
  });
};

export const unsubscribeUserReturnSubscription = () => {
  return navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    return serviceWorkerRegistration.pushManager
      .getSubscription()
      .then((subscription) => subscription);
  });
};
