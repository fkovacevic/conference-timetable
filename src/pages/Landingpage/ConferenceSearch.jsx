import React, { useEffect, useContext, useState } from "react";
import classes from "./ConferenceSearch.module.css";
import { Input } from "antd";
import ConfrenceCard from "./ConfrenceCard";
import EventFollow from "./EventFollow";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "../../auth_store/auth-context";

const { Search } = Input;

const getConfrences = () => {
  return [
    {
      id: 12,
      title: "Event A pikica",
      description: "Event A Description",
      startAt: "2021-11-11T18:59:06.311058+00:00",
      endAt: "2021-11-16T18:59:06.311058+00:00",
      sectionCount: 2,
    },
    {
      id: 4,
      title: "Event D piki",
      description: "Event D Description",
      startAt: "2021-11-11T18:59:06.311058+00:00",
      endAt: "2021-11-16T18:59:06.311058+00:00",
      sectionCount: 22,
    },
    {
      id: 2,
      title: "Event B fico",
      description: "Event BE Description",
      startAt: "2021-11-11T18:59:06.311058+00:00",
      endAt: "2021-11-16T18:59:06.311058+00:00",
      sectionCount: 7,
    },
    {
      id: 3,
      title: "Event C moki",
      description: "Event CE Description",
      startAt: "2021-11-11T18:59:06.311058+00:00",
      endAt: "2021-11-16T18:59:06.311058+00:00",
      sectionCount: 9,
    },
    {
      id: 5,
      title: "Event 5",
      description: "Event CE Description",
      startAt: "2021-11-11T18:59:06.311058+00:00",
      endAt: "2021-11-16T18:59:06.311058+00:00",
      sectionCount: 9,
    },
    {
      id: 6,
      title: "Event 6",
      description: "Event CE Description",
      startAt: "2021-11-11T18:59:06.311058+00:00",
      endAt: "2021-11-16T18:59:06.311058+00:00",
      sectionCount: 9,
    },
    {
      id: 7,
      title: "Event 7",
      description: "Event CE Description",
      startAt: "2021-11-11T18:59:06.311058+00:00",
      endAt: "2021-11-16T18:59:06.311058+00:00",
      sectionCount: 9,
    },
    {
      id: 8,
      title: "Event 8",
      description: "Event CE Description",
      startAt: "2021-11-11T18:59:06.311058+00:00",
      endAt: "2021-11-16T18:59:06.311058+00:00",
      sectionCount: 9,
    },
    {
      id: 9,
      title: "Event 9",
      description: "Event CE Description",
      startAt: "2021-11-11T18:59:06.311058+00:00",
      endAt: "2021-11-16T18:59:06.311058+00:00",
      sectionCount: 9,
    },
    {
      id: 10,
      title: "Event 10",
      description: "Event CE Description",
      startAt: "2021-11-11T18:59:06.311058+00:00",
      endAt: "2021-11-16T18:59:06.311058+00:00",
      sectionCount: 9,
    },
    {
      id: 11,
      title: "Event 11",
      description: "Event CE Description",
      startAt: "2021-11-11T18:59:06.311058+00:00",
      endAt: "2021-11-16T18:59:06.311058+00:00",
      sectionCount: 9,
    },
  ];
};
function ConferenceSearch(props) {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const addToFollowed = (conf) => {
    if (
      myEvents.filter((item) => {
        return item.id === conf.id;
      }).length > 0
    ) {
      //Event already added
      return;
    } else {
      axios
        .post(
          "http://localhost:5000/api/Users/" +
            //localStorage.getItem("userid") +
            authCtx.userid +
            "/Events",
          {
            id: conf.id, // This is the body part
          },
          {
            headers: {
              Authorization: "Bearer " + authCtx.token, //localStorage.getItem("token"),
            },
          }
        )
        .then((result) => {
          console.log(result.data ?? result);
          setMyEvents((old) => {
            return [...old, conf];
          });
        })
        .catch((err) => {
          console.log(err.message ?? err);
          return;
        });
    }
  };

  const removeFromFollowed = (idev) => {
    axios
      .delete(
        "http://localhost:5000/api/Users/" +
          //localStorage.getItem("userid") +
          authCtx.userid +
          "/Events",

        {
          headers: {
            Authorization: "Bearer " + authCtx.token, //localStorage.getItem("token"),
          },
          data: {
            id: idev, // This is the body part
          },
        }
      )
      .then((result) => {
        console.log(result.data ?? result);
        setMyEvents((old) => {
          return old.filter((item) => {
            return item.id !== idev;
          });
        });
      })
      .catch((err) => {
        console.log(err.message ?? err);
        return;
      });
  };

  const [allConferences, setAllConferences] = useState([]);
  const [filteredConferences, setFilteredConferences] = useState([]);
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Events", {
        headers: {
          Authorization: "Bearer " + authCtx.token, //localStorage.getItem("token"),
        },
      })
      .then((result) => {
        console.log(result.data);
        setAllConferences((konf) => {
          return [...getConfrences(), ...result.data];
        });
        setFilteredConferences((konf) => {
          return [...getConfrences(), ...result.data];
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          //localStorage.clear();
          authCtx.logout();
          history.push("/login");
        }
      });

    axios
      .get(
        "http://localhost:5000/api/Users/" +
          //localStorage.getItem("userid") +
          authCtx.userid +
          "/Events",
        {
          headers: {
            Authorization: "Bearer " + authCtx.token, //localStorage.getItem("token"),
          },
        }
      )
      .then((result) => {
        console.log("ovo je tvoje");
        console.log(result.data ?? result);
        setMyEvents(result.data);
      })
      .catch((err) => {
        console.log(err.message ?? err);
        return;
      });
  }, []);

  const onSearch = (eve) => {
    setFilteredConferences(
      allConferences.filter((conf) => {
        return conf.title.toLowerCase().includes(eve.toLowerCase());
      })
    );
  };

  return (
    <div className={classes.adaptiveFlex}>
      <div className={classes.search}>
        <div className={`${classes.searchWrapper} ${classes.flex}`}>
          <Search
            placeholder="Search for a confrence"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
        <div className={classes.scroll}>
          <div className={classes.searchWrapper}>
            {filteredConferences.map((conf) => {
              return (
                <ConfrenceCard
                  key={conf.id}
                  addToFollowed={addToFollowed}
                  confObj={conf}
                  {...conf}
                ></ConfrenceCard>
              );
            })}
          </div>
        </div>
      </div>

      <div className={classes.followed}>
        <h2>My Events</h2>
        <div className={classes.scroll}>
          {myEvents.length > 0 ? (
            myEvents.map((conf) => {
              return (
                <EventFollow
                  key={conf.id}
                  removeFromFollowed={removeFromFollowed}
                  confObj={conf}
                  {...conf}
                ></EventFollow>
              );
            })
          ) : (
            <p className={classes.noneFollowed}>
              You are not subscribed to any events! Add events you want to
              follow.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConferenceSearch;
