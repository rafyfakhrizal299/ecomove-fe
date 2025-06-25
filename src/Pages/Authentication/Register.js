import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";

import { registerUser, apiError } from "../../store/actions";

import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import EcomoveLogo from "../../assets/images/Ecomove_Logo.png";

import { createSelector } from "reselect";

const Register = (props) => {
  document.title = "Register | Ecomove";

  const dispatch = useDispatch();
  const [passwordShown, setPasswordShown] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      serviceType: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      password: "",
      agreeToTerms: false,
    },
    validationSchema: Yup.object({
      serviceType: Yup.string().required("Please select a service type"),
      firstName: Yup.string().required("Please enter your First Name"),
      lastName: Yup.string().required("Please enter your Last Name"),
      mobileNumber: Yup.string()
        .matches(/^[0-9]{8,15}$/, "Mobile Number must be 8-15 digits")
        .required("Please enter your Mobile Number"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Please Enter Your Email"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Please Enter Your Password"),
      agreeToTerms: Yup.boolean().oneOf(
        [true],
        "You must agree to the terms and conditions"
      ),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  const selectRegisterState = (state) => state.account;
  const registerdatatype = createSelector(selectRegisterState, (accounts) => ({
    user: accounts.user,
    registrationError: accounts.registrationError,
  }));
  const { registrationError, user } = useSelector(registerdatatype);

  useEffect(() => {
    dispatch(apiError(""));
  }, [dispatch]);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

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
            <Col md={12} lg={12} xl={12} style={{ paddingTop: "5px" }}>
              <Card
                className="shadow-lg p-4"
                style={{ borderRadius: "15px", width: "450px" }}
              >
                <CardBody className="p-4">
                  <div className="text-center mb-4">
                    <img
                      src={EcomoveLogo}
                      alt="Ecomove Logo"
                      height="50"
                      className="mb-3"
                    />
                    <h4 className="fw-bold mb-3" style={{ color: "#333" }}>
                      Sign up for FREE
                    </h4>
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
                      {user && user ? (
                        <Alert color="success">
                          Register User Successfully
                        </Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">
                          <div>{registrationError}</div>
                        </Alert>
                      ) : null}

                      <div className="mb-3">
                        <Label className="form-label mb-2">
                          How do you plan to use Ecomove's services?*
                        </Label>
                        <div className="form-check">
                          <Input
                            type="radio"
                            name="serviceType"
                            id="businessNonFood"
                            value="Business Deliveries (Non-food)"
                            className="form-check-input"
                            onChange={validation.handleChange}
                            checked={
                              validation.values.serviceType ===
                              "Business Deliveries (Non-food)"
                            }
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="businessNonFood"
                          >
                            Business Deliveries (Non-food)
                          </Label>
                        </div>
                        <div className="form-check">
                          <Input
                            type="radio"
                            name="serviceType"
                            id="businessFood"
                            value="Business Deliveries (Food)"
                            className="form-check-input"
                            onChange={validation.handleChange}
                            checked={
                              validation.values.serviceType ===
                              "Business Deliveries (Food)"
                            }
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="businessFood"
                          >
                            Business Deliveries (Food)
                          </Label>
                        </div>
                        <div className="form-check">
                          <Input
                            type="radio"
                            name="serviceType"
                            id="personalBusiness"
                            value="Personal and Business"
                            className="form-check-input"
                            onChange={validation.handleChange}
                            checked={
                              validation.values.serviceType ===
                              "Personal and Business"
                            }
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="personalBusiness"
                          >
                            Personal and Business
                          </Label>
                        </div>
                        <div className="form-check mb-2">
                          <Input
                            type="radio"
                            name="serviceType"
                            id="personalDelivery"
                            value="Personal Delivery"
                            className="form-check-input"
                            onChange={validation.handleChange}
                            checked={
                              validation.values.serviceType ===
                              "Personal Delivery"
                            }
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="personalDelivery"
                          >
                            Personal Delivery
                          </Label>
                        </div>
                        {validation.touched.serviceType &&
                        validation.errors.serviceType ? (
                          <FormFeedback type="invalid" className="d-block">
                            <div>{validation.errors.serviceType}</div>
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="firstName">
                          First Name*
                        </Label>
                        <Input
                          name="firstName"
                          className="form-control"
                          id="firstName"
                          placeholder="First Name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.firstName || ""}
                          invalid={
                            validation.touched.firstName &&
                            validation.errors.firstName
                              ? true
                              : false
                          }
                          style={{ borderRadius: "8px", padding: "10px" }}
                        />
                        {validation.touched.firstName &&
                        validation.errors.firstName ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.firstName}</div>
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="lastName">
                          Last Name*
                        </Label>
                        <Input
                          name="lastName"
                          className="form-control"
                          id="lastName"
                          placeholder="Last Name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.lastName || ""}
                          invalid={
                            validation.touched.lastName &&
                            validation.errors.lastName
                              ? true
                              : false
                          }
                          style={{ borderRadius: "8px", padding: "10px" }}
                        />
                        {validation.touched.lastName &&
                        validation.errors.lastName ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.lastName}</div>
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="mobileNumber">
                          Mobile Number* (9XXXXXXXXX)
                        </Label>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={{
                              backgroundColor: "#e9ecef",
                              borderColor: "#ced4da",
                              borderRadius: "8px 0 0 8px",
                            }}
                          >
                            +63
                          </span>
                          <Input
                            name="mobileNumber"
                            className="form-control"
                            id="mobileNumber"
                            placeholder="9123456789"
                            type="tel"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.mobileNumber || ""}
                            invalid={
                              validation.touched.mobileNumber &&
                              validation.errors.mobileNumber
                                ? true
                                : false
                            }
                            style={{
                              borderRadius: "0 8px 8px 0",
                              padding: "10px",
                            }}
                          />
                          {validation.touched.mobileNumber &&
                          validation.errors.mobileNumber ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.mobileNumber}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="email">
                          Email*
                        </Label>
                        <Input
                          name="email"
                          className="form-control"
                          id="email"
                          placeholder="sample@gmail.com"
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
                          Password*
                        </Label>
                        <div className="input-group auth-pass-inputgroup">
                          <Input
                            name="password"
                            value={validation.values.password || ""}
                            type={passwordShown ? "text" : "password"}
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
                            onClick={togglePasswordVisibility}
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
                            <i
                              className={
                                passwordShown
                                  ? "mdi mdi-eye"
                                  : "mdi mdi-eye-outline"
                              }
                            ></i>
                          </button>
                          {validation.touched.password &&
                          validation.errors.password ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.password}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>

                      <div className="mb-4 form-check">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          id="agreeToTerms"
                          name="agreeToTerms"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          checked={validation.values.agreeToTerms}
                          invalid={
                            validation.touched.agreeToTerms &&
                            validation.errors.agreeToTerms
                              ? true
                              : false
                          }
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="agreeToTerms"
                        >
                          I agree to the terms of service
                        </Label>
                        {validation.touched.agreeToTerms &&
                        validation.errors.agreeToTerms ? (
                          <FormFeedback type="invalid" className="d-block">
                            <div>{validation.errors.agreeToTerms}</div>
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="d-grid mt-2">
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
                          Sign Up
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          Already have an account?{" "}
                          <Link
                            to="/login"
                            className="fw-medium"
                            style={{ color: "#007bff" }}
                          >
                            Log in
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

export default Register;
