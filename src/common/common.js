import axios from "axios";

export const numberToHexColor = (numberColor) => {
  return numberColor.toString(16);
};

export const subscribeAfterLogin = (userId, token, subscription) => {
  var config = {
    method: "post",
    url: `http://localhost:5000/api/Users/${userId}/Subscriptions`,
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
      localStorage.setItem("subId", res.data.id);
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message ?? err);
    });
};

export const eraseSubscribtionOnLogout = (userId, token) => {};
