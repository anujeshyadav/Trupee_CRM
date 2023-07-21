import React, { useEffect, useState } from "react";
import UserContext from "./Context";
import axiosConfig from "./../axiosConfig";

const State = (props) => {
  const [notification, setNotification] = useState([]);
  const [UserRole, setUserRole] = useState([]);
  const [viewOneAstro, setviewOneAstro] = useState({});
  useEffect(() => {
    const formdata = new FormData();
    formdata.set("user_id", 1);
    axiosConfig
      .post(`/getroleapi`, formdata)
      .then((res) => {
        setUserRole(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const User = { name: "Tania", loggedIn: true };

  return (
    <UserContext.Provider value={{ User, UserRole }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default State;
