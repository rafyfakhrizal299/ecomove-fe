import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, Container } from "reactstrap";

// Import Images
import img1 from "../../assets/images/product/img-1.png";
import img2 from "../../assets/images/product/img-2.png";
import img3 from "../../assets/images/product/img-3.png";

// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Cart = () => {
    document.title = "Cart | Symox - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Ecommerce" breadcrumbItem="Cart" />
                    <Row>
                        <Col xl={8}>
                            <Card className="card border shadow-none">
                                <CardBody>
                                    <div className="d-flex align-items-start border-bottom pb-3">
                                        <div className="me-4">
                                            <img src={img1} alt="" className="avatar-lg" />
                                        </div>
                                        <div className="flex-grow-1 align-self-center overflow-hidden">
                                            <div>
                                                <h5 className="text-truncate font-size-16"><Link to="/ecommerce-product-detail" className="text-dark">Nike N012 Running Shoes</Link></h5>
                                                <p className="mb-1">Color : <span className="fw-medium">Gray</span></p>
                                                <p>Size : <span className="fw-medium">08</span></p>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 ms-2">
                                            <ul className="list-inline mb-0 font-size-16">
                                                <li className="list-inline-item">
                                                    <Link to="#" className="text-muted px-1">
                                                        <i className="mdi mdi-trash-can-outline"></i>
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item">
                                                    <Link to="#" className="text-muted px-1">
                                                        <i className="mdi mdi-heart-outline"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div>
                                        <Row>
                                            <Col md={4}>
                                                <div className="mt-3">
                                                    <p className="text-muted mb-2">Price</p>
                                                    <h5 className="font-size-16">$260</h5>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className="mt-3">
                                                    <p className="text-muted mb-2">Quantity</p>
                                                    <div className="d-inline-flex">
                                                        <select className="form-select form-select-sm w-lg">
                                                            <option value="1">1</option>
                                                            <option value="2" defaultValue>2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className="mt-3">
                                                    <p className="text-muted mb-2">Total</p>
                                                    <h5 className="font-size-16">$520</h5>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                </CardBody>
                            </Card>

                            <Card className="card border shadow-none">
                                <CardBody>

                                    <div className="d-flex align-items-start border-bottom pb-3">
                                        <div className="me-4">
                                            <img src={img2} alt="" className="avatar-lg" />
                                        </div>
                                        <div className="flex-grow-1 align-self-center overflow-hidden">
                                            <div>
                                                <h5 className="text-truncate font-size-16"><Link to="/ecommerce-product-detail" className="text-dark">Sport Running Shoes</Link></h5>
                                                <p className="mb-1">Color : <span className="fw-medium">Gray And Red</span></p>
                                                <p>Size : <span className="fw-medium">08</span></p>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 ms-2">
                                            <ul className="list-inline mb-0 font-size-16">
                                                <li className="list-inline-item">
                                                    <Link to="#" className="text-muted px-1">
                                                        <i className="mdi mdi-trash-can-outline"></i>
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item">
                                                    <Link to="#" className="text-muted px-1">
                                                        <i className="mdi mdi-heart-outline"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div>
                                        <Row>
                                            <Col md={4}>
                                                <div className="mt-3">
                                                    <p className="text-muted mb-2">Price</p>
                                                    <h5 className="font-size-16">$540</h5>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className="mt-3">
                                                    <p className="text-muted mb-2">Quantity</p>
                                                    <div className="d-inline-flex">
                                                        <select className="form-select form-select-sm w-lg">
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3" defaultValue>3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className="mt-3">
                                                    <p className="text-muted mb-2">Total</p>
                                                    <h5 className="font-size-16">$1620</h5>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                </CardBody>
                            </Card>

                            <Card className="card border shadow-none">
                                <CardBody>

                                    <div className="d-flex align-items-start border-bottom pb-3">
                                        <div className="me-4">
                                            <img src={img3} alt="" className="avatar-lg" />
                                        </div>
                                        <div className="flex-grow-1 align-self-center overflow-hidden">
                                            <div>
                                                <h5 className="text-truncate font-size-16"><Link to="/ecommerce-product-detail" className="text-dark">Adidas Running Shoes</Link></h5>
                                                <p className="mb-1">Color : <span className="fw-medium">Purple</span></p>
                                                <p>Size : <span className="fw-medium">09</span></p>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 ms-2">
                                            <ul className="list-inline mb-0 font-size-16">
                                                <li className="list-inline-item" data-toggle="tooltip" data-placement="top" title="Remove">
                                                    <Link to="#" className="text-muted px-1">
                                                        <i className="mdi mdi-trash-can-outline"></i>
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item" data-toggle="tooltip" data-placement="top" title="Add Wishlist">
                                                    <Link to="#" className="text-muted px-1">
                                                        <i className="mdi mdi-heart-outline"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div>
                                        <Row>
                                            <Col md={4}>
                                                <div className="mt-3">
                                                    <p className="text-muted mb-2">Price</p>
                                                    <h5 className="font-size-16">$1120</h5>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className="mt-3">
                                                    <p className="text-muted mb-2">Quantity</p>
                                                    <div className="d-inline-flex">
                                                        <select className="form-select form-select-sm w-lg">
                                                            <option value="1" defaultValue>1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className="mt-3">
                                                    <p className="text-muted mb-2">Total</p>
                                                    <h5 className="font-size-16">$1120</h5>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                </CardBody>
                            </Card>

                            <Row className="my-4">
                                <Col sm={6}>
                                    <Link to="/ecommerce-products" className="btn btn-link text-muted">
                                        <i className="mdi mdi-arrow-left me-1"></i> Continue Shopping </Link>
                                </Col>
                                <Col sm={6}>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        <Link to="/ecommerce-checkout" className="btn btn-success">
                                            <i className="mdi mdi-cart-outline me-1"></i> Checkout </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        <Col xl={4}>
                            <div className="mt-5 mt-lg-0">
                                <Card className="card border shadow-none">
                                    <div className="card-header bg-transparent border-bottom py-3 px-4">
                                        <h5 className="font-size-16 mb-0">Order Summary <span className="float-end">#MN0124</span></h5>
                                    </div>
                                    <CardBody className="p-4">

                                        <div className="table-responsive">
                                            <table className="table mb-0">
                                                <tbody>
                                                    <tr>
                                                        <td>Sub Total :</td>
                                                        <td className="text-end">$ 780</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Discount : </td>
                                                        <td className="text-end">- $ 78</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Shipping Charge :</td>
                                                        <td className="text-end">$ 25</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Estimated Tax : </td>
                                                        <td className="text-end">$ 18.20</td>
                                                    </tr>
                                                    <tr className="bg-light">
                                                        <th>Total :</th>
                                                        <td className="text-end">
                                                            <span className="fw-bold">
                                                                $ 745.2
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Cart;
