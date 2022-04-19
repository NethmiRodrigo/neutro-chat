import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Container, Form, Row, Col, Spinner, Button } from "react-bootstrap";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { toast } from "react-toastify";

import "./register.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState("");
  const authentication = getAuth();

  onAuthStateChanged(authentication, (user) => {
    if (user) setRedirect("/");
  });

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await createUserWithEmailAndPassword(
          authentication,
          email,
          password
        );
        setRedirect("/");
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
      {loading && <Spinner centered size="400" animation="grow" />}
      {!loading && redirect && <Navigate to={redirect} />}
      <Row className="justify-content-md-center">
        <h2 className="text-center">Register</h2>
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
                Please type in an email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
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
                <Link to="/login">Already have an account?</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
