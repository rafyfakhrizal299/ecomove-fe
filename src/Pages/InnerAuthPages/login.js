import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Card, CardBody } from 'reactstrap';

import logosm from "../../assets/images/logo-sm.svg";

const Login = () => {
    document.title = "Login | Symox - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="authentication-bg min-vh-100">
                <div className="bg-overlay"></div>
                <Container>
                    <div className="d-flex flex-column min-vh-100 px-3 pt-4">
                        <Row className="justify-content-center my-auto">
                            <Col md={8} lg={6} xl={5}>
                                <div className="text-center mb-4">
                                    <Link to="/">
                                        <img src={logosm} alt="" height="22" /> <span className="logo-txt">Symox</span>
                                    </Link>
                                </div>
                                <Card>
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className="text-muted">Sign in to continue to Symox.</p>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <form action="/">

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="username">Username</label>
                                                    <input type="text" className="form-control" id="username" placeholder="Enter username" />
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                        <Link to="/auth-recoverpw" className="text-muted">Forgot password?</Link>
                                                    </div>
                                                    <label className="form-label" htmlFor="userpassword">Password</label>
                                                    <input type="password" className="form-control" id="userpassword" placeholder="Enter password" />
                                                </div>

                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="auth-remember-check" />
                                                    <label className="form-check-label" htmlFor="auth-remember-check">Remember me</label>
                                                </div>

                                                <div className="mt-3 text-end">
                                                    <button className="btn btn-primary w-sm waves-effect waves-light" type="submit">Log In</button>
                                                </div>

                                                <div className="mt-4 text-center">
                                                    <div className="signin-other-title">
                                                        <h5 className="font-size-14 mb-3 title">Sign in with</h5>
                                                    </div>
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item">
                                                            <Link to="#" className="social-list-item bg-primary text-white border-primary">
                                                                <i className="mdi mdi-facebook"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <Link to="#" className="social-list-item bg-info text-white border-info">
                                                                <i className="mdi mdi-twitter"></i>
                                                            </Link>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <Link to="#" className="social-list-item bg-danger text-white border-danger">
                                                                <i className="mdi mdi-google"></i>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="mt-4 text-center">
                                                    <p className="mb-0">Don't have an account ? <Link to="/auth-register" className="fw-medium text-primary"> Signup now </Link> </p>
                                                </div>
                                            </form>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center text-muted p-4">
                                    <p className="text-white-50">© {new Date().getFullYear()} Symox. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Login;
// 4.14.1
