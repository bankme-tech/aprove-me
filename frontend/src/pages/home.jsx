import React from "react";
import Notifications from "../components/Notifications";
import Navbar from "../components/Navbar";
import ListPayable from "../components/ListPayable";
import FormAssignor from "@/components/FormAssignor";

const home = () => {
  return (
    <>
      <Navbar />
      <FormAssignor />
      {/* <Notifications /> */}
      <ListPayable />
    </>
  );
};

export default home;
