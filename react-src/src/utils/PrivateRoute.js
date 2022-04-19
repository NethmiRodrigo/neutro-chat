import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import firebase from "firebase/compat/app";

export default function PrivateRoute(props) {
  console.log(firebase.auth().currentUser);
  return firebase.auth().currentUser != null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
