import React from "react";
import Notifications from "../components/Notifications";
import Navbar from "../components/Navbar";
import ListPayable from "../components/ListPayable";

const home = () => {
  return (
    <>
      <Navbar />
      <Notifications />
      <ListPayable />
    </>
  );
};

export default home;
