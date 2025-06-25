import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Container, Row, Col, Card, CardBody, Nav, NavItem, TabContent, TabPane, Table } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import classnames from 'classnames';


const PricingPage = () => {
    document.title = "Pricing | Symox - React Admin & Dashboard Template";
    const [activeTab, setActiveTab] = useState('monthly');

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Utility" breadcrumbItem="Pricing" />

                    <Row className="justify-content-center">
                        <Col lg={5}>
                            <div className="text-center mb-5">
                                <h4>Choose your Pricing plan</h4>
                                <p className="text-muted mb-4">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo veritatis</p>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col lg={9}>
                            <Row>
                                <Col xl={4}>
                                    <Card className="pricing-box text-center">
                                        <CardBody className="p-4">
                                            <div>
                                                <div className="mt-3 mb-2">
                                                    <h5 className="mb-1">Starter</h5>
                                                    <p className="text-muted pb-2">Starter plans</p>
                                                </div>

                                                <div className="avatar-md mx-auto my-4">
                                                    <div className="avatar-title rounded-circle bg-primary-subtle text-primary font-size-22">
                                                        <i className="bx bx-edit h2 text-primary mb-0"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <ul className="list-unstyled plan-features mt-2">
                                                <li>Users: <span className="text-primary fw-semibold">1</span></li>
                                                <li>Storage: <span className="text-primary fw-semibold">01 GB</span></li>
                                                <li>Domain: <span className="text-primary fw-semibold">No</span></li>
                                                <li>Support: <span className="text-primary fw-semibold">No</span></li>
                                                <li>Setup: <span className="text-primary fw-semibold">No</span></li>
                                            </ul>

                                            <div className="py-4">
                                                <h3><sup><small>$</small></sup> 19/ <span className="font-size-13 text-muted">Per month</span></h3>
                                            </div>
                                            <div className="text-center plan-btn my-2">
                                                <Link to="#" className="btn btn-primary waves-effect waves-light">Sign up Now</Link>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xl={4}>
                                    <Card className="pricing-box product-box text-center">
                                        <div className="product-ribbon">
                                            Popular
                                        </div>
                                        <CardBody className="p-4">
                                            <div>
                                                <div className="mt-3">
                                                    <h5 className="mb-1">Professional</h5>
                                                    <p className="text-muted pb-2">Professional plans</p>
                                                </div>

                                                <div className="avatar-md mx-auto my-4">
                                                    <div className="avatar-title rounded-circle bg-primary-subtle text-primary font-size-22">
                                                        <i className="bx bx-trophy h2 text-primary mb-0"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <ul className="list-unstyled plan-features mt-3">
                                                <li>Users: <span className="text-primary fw-semibold">3</span></li>
                                                <li>Storage: <span className="text-primary fw-semibold">10 GB</span></li>
                                                <li>Domain: <span className="text-primary fw-semibold">1</span></li>
                                                <li>Support: <span className="text-primary fw-semibold">Yes</span></li>
                                                <li>Setup: <span className="text-primary fw-semibold">No</span></li>
                                            </ul>

                                            <div className="py-4">
                                                <h3><sup><small>$</small></sup> 29/ <span className="font-size-13 text-muted">Per month</span></h3>
                                            </div>

                                            <div className="text-center plan-btn my-2">
                                                <Link to="#" className="btn btn-primary waves-effect waves-light">Sign up Now</Link>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col xl={4}>
                                    <Card className="pricing-box text-center">
                                        <CardBody className="p-4">
                                            <div>
                                                <div className="mt-3">
                                                    <h5 className="mb-1">Unlimited</h5>
                                                    <p className="text-muted pb-2">Unlimited plans</p>
                                                </div>

                                                <div className="avatar-md mx-auto my-4">
                                                    <div className="avatar-title rounded-circle bg-primary-subtle text-primary font-size-22">
                                                        <i className="bx bx-layer h2 text-primary mb-0"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <ul className="list-unstyled plan-features mt-3">
                                                <li>Users: <span className="text-primary fw-semibold">5</span></li>
                                                <li>Storage: <span className="text-primary fw-semibold">40 GB</span></li>
                                                <li>Domain: <span className="text-primary fw-semibold">4</span></li>
                                                <li>Support: <span className="text-primary fw-semibold">Yes</span></li>
                                                <li>Setup: <span className="text-primary fw-semibold">Yes</span></li>
                                            </ul>

                                            <div className="py-4">
                                                <h3><sup><small>$</small></sup> 49/ <span className="font-size-13 text-muted">Per month</span></h3>
                                            </div>

                                            <div className="text-center plan-btn my-2">
                                                <Link to="#" className="btn btn-primary waves-effect waves-light">Sign up Now</Link>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12}>
                            <Card>
                                <CardBody>
                                    <div className="text-center">
                                        <div className="mb-4">
                                            <h4>Compare our plans and find your</h4>
                                            <p className="text-muted mb-0">
                                                Simple, transparent pricing that grows with you. Try any plan free for 30 days.
                                            </p>
                                        </div>
                                        <div>
                                            <Nav className="nav nav-pills mb-3 justify-content-center bg-light d-inline-flex p-1 rounded" id="pills-tab" role="tablist">
                                                <NavItem>
                                                    <NavLink
                                                       className={classnames({
                                                        active: activeTab === "monthly",
                                                    })}
                                                        onClick={() => toggleTab('monthly')}
                                                    >
                                                        Monthly
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                       className={classnames({
                                                        active: activeTab === "annually",
                                                    })}
                                                        onClick={() => toggleTab('annually')}
                                                    >
                                                        Annually
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={activeTab}>
                                                <TabPane tabId="monthly">
                                                    <div className="table-responsive">
                                                        {/* Monthly Pricing Table */}
                                                        <Table className="table table-striped">
                                                        <thead>
                                                                <tr>
                                                                    <th scope="col"><span className="fs-5">Pricing Table</span></th>
                                                                    <th scope="col">
                                                                        <span className="text-muted font-size-12">Basic</span>
                                                                        <p className="fs-5 mb-0">Free</p>
                                                                    </th>
                                                                    <th scope="col">
                                                                        <span className="text-muted font-size-12">Starndard</span>
                                                                        <p className="fs-5 mb-0">$5</p>
                                                                    </th>
                                                                    <th scope="col">
                                                                        <span className="text-muted font-size-12">Premium</span>
                                                                        <p className="fs-5 mb-0">$19</p>
                                                                    </th>
                                                                    <th scope="col">
                                                                        <span className="text-muted font-size-12">Special</span>
                                                                        <p className="fs-5 mb-0">$49</p>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row"><span className="font-size-15">Basic features</span></th>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row"><span className="font-size-15">Users</span></th>
                                                                    <td><span className="text-muted">10</span></td>
                                                                    <td><span className="text-muted">20</span></td>
                                                                    <td><span className="text-muted">30</span></td>
                                                                    <td><span className="text-muted">Unlimited</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row"><span className="font-size-15">Individual data</span></th>
                                                                    <td><span className="text-muted">12GB</span></td>
                                                                    <td><span className="text-muted">25GB</span></td>
                                                                    <td><span className="text-muted">40GB</span></td>
                                                                    <td><span className="text-muted">Unlimited</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row"><span className="font-size-15">Support</span></th>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row"><span className="font-size-15">Automated workflows</span></th>
                                                                    <td><span className="text-muted fs-4"><i className="mdi mdi-minus-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row"><span className="font-size-15">200+ integrations</span></th>
                                                                    <td><span className="text-muted fs-4"><i className="mdi mdi-minus-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </TabPane>
                                                <TabPane tabId="annually">
                                                    <div className="table-responsive">
                                                        {/* Annual Pricing Table */}
                                                        <Table className="table table-striped">
                                                        <thead>
                                                                <tr>
                                                                    <th scope="col"><span className="fs-5">Pricing Table</span></th>
                                                                    <th scope="col">
                                                                        <span className="text-muted font-size-12">Basic</span>
                                                                        <p className="fs-5 mb-0">Free</p>
                                                                    </th>
                                                                    <th scope="col">
                                                                        <span className="text-muted font-size-12">Starndard</span>
                                                                        <p className="fs-5 mb-0">$50</p>
                                                                    </th>
                                                                    <th scope="col">
                                                                        <span className="text-muted font-size-12">Premium</span>
                                                                        <p className="fs-5 mb-0">$190</p>
                                                                    </th>
                                                                    <th scope="col">
                                                                        <span className="text-muted font-size-12">Special</span>
                                                                        <p className="fs-5 mb-0">$490</p>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row"><span className="font-size-15">Basic features</span></th>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row"><span className="font-size-15">Users</span></th>
                                                                    <td><span className="text-muted">100</span></td>
                                                                    <td><span className="text-muted">200</span></td>
                                                                    <td><span className="text-muted">300</span></td>
                                                                    <td><span className="text-muted">Unlimited</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row"><span className="font-size-15">Individual data</span></th>
                                                                    <td><span className="text-muted">60GB</span></td>
                                                                    <td><span className="text-muted">250GB</span></td>
                                                                    <td><span className="text-muted">400GB</span></td>
                                                                    <td><span className="text-muted">Unlimited</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row"><span className="font-size-15">Support</span></th>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row"><span className="font-size-15">Automated workflows</span></th>
                                                                    <td><span className="text-muted fs-4"><i className="mdi mdi-minus-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row"><span className="font-size-15">400+ integrations</span></th>
                                                                    <td><span className="text-muted fs-4"><i className="mdi mdi-minus-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                    <td><span className="text-success fs-4"><i className="mdi mdi-checkbox-marked-circle"></i></span></td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </TabPane>
                                            </TabContent>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment >
    );
};

export default PricingPage;