import PropTypes from "prop-types";
import React from "react";

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";

import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

import * as Yup from "yup";
import { useFormik } from "formik";

import { loginUser } from "../../store/actions";

import EcomoveLogo from "../../assets/images/Ecomove_Logo.png";

import { createSelector } from "reselect";

const Login = (props) => {
  document.title = "Login | Ecomove";

  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "" || "",
      password: "" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
    },
  });

  const loginData = createSelector(
    (state) => state.login,
    (state) => ({
      error: state.error,
    })
  );

  const { error } = useSelector(loginData);

  return (
    <React.Fragment>
      <div className="min-vh-100" style={{ backgroundColor: "#f5f5f5" }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 px-4 shadow-sm">
          <Container fluid>
            <Link className="navbar-brand" to="/">
              <img src={EcomoveLogo} alt="Ecomove Logo" height="30" />{" "}
            </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item me-3">
                  <Link className="nav-link" to="/about-us">
                    About us
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link" to="/shop">
                    Shop
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link" to="/rates">
                    Rates
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="/track"
                    style={{ color: "#007bff" }}
                  >
                    Track
                  </Link>{" "}
                </li>
              </ul>
              <div className="d-flex">
                <Link
                  to="/login"
                  className="btn btn-outline-success me-2"
                  style={{ borderColor: "#66bb6a", color: "#66bb6a" }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-success"
                  style={{ backgroundColor: "#66bb6a", borderColor: "#66bb6a" }}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </Container>
        </nav>
        <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
          <Row className="justify-content-center">
            <Col md={12} lg={12} xl={12}>
              {" "}
              <Card
                className="shadow-lg p-4"
                style={{ borderRadius: "15px", width: "400px" }}
              >
                <CardBody className="p-4">
                  <div className="text-center mb-4">
                    <img
                      src={EcomoveLogo}
                      alt="Ecomove Logo"
                      height="50"
                      className="mb-3"
                    />{" "}
                    <h4 className="fw-bold mb-1" style={{ color: "#333" }}>
                      Welcome, Ecomover!
                    </h4>
                    <p className="text-muted">Log in to book</p>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? (
                        <Alert color="danger">
                          <div>{error}</div>
                        </Alert>
                      ) : null}

                      <div className="mb-3">
                        <Label className="form-label" htmlFor="email">
                          Email
                        </Label>
                        <Input
                          name="email"
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                          style={{ borderRadius: "8px", padding: "10px" }}
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.email}</div>
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3 position-relative">
                        <Label className="form-label" htmlFor="password">
                          Password
                        </Label>
                        <div className="input-group auth-pass-inputgroup">
                          <Input
                            name="password"
                            value={validation.values.password || ""}
                            type="password"
                            className="form-control pe-5"
                            id="password"
                            placeholder="Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.password &&
                              validation.errors.password
                                ? true
                                : false
                            }
                            style={{ borderRadius: "8px", padding: "10px" }}
                          />
                          <button
                            className="btn btn-light shadow-none ms-0 px-2"
                            type="button"
                            id="password-addon"
                            onClick={() => {
                              const passwordInput =
                                document.getElementById("password");
                              if (passwordInput.type === "password") {
                                passwordInput.type = "text";
                              } else {
                                passwordInput.type = "password";
                              }
                            }}
                            style={{
                              position: "absolute",
                              right: "0",
                              height: "100%",
                              borderTopRightRadius: "8px",
                              borderBottomRightRadius: "8px",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                          >
                            <i className="mdi mdi-eye-outline"></i>{" "}
                            {/* Icon mata */}
                          </button>
                          {validation.touched.password &&
                          validation.errors.password ? (
                            <FormFeedback type="invalid">
                              <div> {validation.errors.password} </div>
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="remember-email"
                            defaultChecked
                          />{" "}
                          {/* Default checked */}
                          <label
                            className="form-check-label"
                            htmlFor="remember-email"
                          >
                            Remember email
                          </label>
                        </div>
                        <Link
                          to="/auth-recoverpw"
                          className="text-decoration-none"
                          style={{ color: "#007bff" }}
                        >
                          Forgot password?
                        </Link>{" "}
                        {/* Link forgot password */}
                      </div>

                      <div className="d-grid mt-4">
                        {" "}
                        {/* Menggunakan d-grid untuk tombol penuh lebar */}
                        <button
                          className="btn btn-success"
                          type="submit"
                          style={{
                            backgroundColor: "#66bb6a",
                            borderColor: "#66bb6a",
                            borderRadius: "8px",
                            padding: "12px",
                          }}
                        >
                          Log in
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          Don't have an account?{" "}
                          <Link
                            to="/register"
                            className="fw-medium"
                            style={{ color: "#007bff" }}
                          >
                            Sign up
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
