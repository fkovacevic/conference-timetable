import axios from "axios";
import React, { useEffect, useState } from "react";

import "./_homepage.scss";

const Homepage = () => {
  const [ispis, setIspis] = useState({});
  useEffect(() => {
    axios.get("http://localhost:5000/api/Events").then((result) => {
      console.log(result.data[0]);
      setIspis(result.data[0]);
    });
  }, []);

  return (
    <>
      <div>{ispis.description ?? "nema jos"}</div>
    </>
  );
};

export default Homepage;
