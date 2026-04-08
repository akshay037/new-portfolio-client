import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login";

const Protected = ({ compo }) => {
  const admin = useSelector((state) => state.admin.admin);
  return admin ? compo : <Login />;
};

export default Protected;
