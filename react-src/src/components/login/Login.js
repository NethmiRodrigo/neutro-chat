import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Container, Form, Row, Col, Spinner, Button } from "react-bootstrap";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

import { db } from "../../firebase-service";

import "./login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const authentication = getAuth();

  onAuthStateChanged(authentication, (user) => {
    if (user) setRedirect("/");
  });

  const handleLogout = async () => {
    sessionStorage.removeItem("Auth Token");
    try {
      await signOut(authentication);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserDetails = async (email) => {
    const docRef = doc(db, "users", email);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        toast.error("User not found");
        handleLogout();
      }
    } catch (error) {
      toast.error(error);
      handleLogout();
    }
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await signInWithEmailAndPassword(
          authentication,
          email,
          password
        );
        sessionStorage.setItem(
          "Auth Token",
          response._tokenResponse?.refreshToken
        );
        const user = await fetchUserDetails(email);
        if (user.isAdmin) {
          sessionStorage.setItem("User", JSON.stringify(user));
          setRedirect(true);
        }
      } catch (error) {
        console.log(error);
        if (error.code === "auth/wrong-password") {
          toast.error("Please check your password");
        }
        if (error.code === "auth/user-not-found") {
          toast.error("Please check your email");
        } else {
          toast.error(error.message);
        }
      }
    }
    setValidated(true);
    setLoading(false);
  };

  return (
    <Container fluid className="login-container">
      {loading && <Spinner Spinner centered size="400" animation="grow" />}
      {!loading && redirect && <Navigate to="/" />}
      <Row className="justify-content-md-center">
        <h2 className="text-center">Login</h2>
        <Col xs lg="4">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="justify-content-md-center"
          >
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please type in your email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your password
              </Form.Control.Feedback>
            </Form.Group>
            <div className="text-center">
              <Button type="submit" disabled={loading}>
                Submit
              </Button>
            </div>
            <div>
              <p>
                <Link to="/register">Don't have an account yet?</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
