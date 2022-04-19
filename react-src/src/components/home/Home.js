import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./home.css";

export const Home = () => {
  const [redirect, setRedirect] = useState();
  const [user, setUser] = useState();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      setRedirect(true);
    }
  });
  return (
    <Container fluid className="home-container">
      {redirect && <Navigate to="/login" />}
      <Row>
        <Col xs lg={2} className="sidebar">
          Hello there
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
