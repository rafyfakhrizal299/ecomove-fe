import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, Container } from "reactstrap"

// Import Image
import logosm from "../../assets/images/logo-sm.png";

// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const InvoicesDetail = () => {
    document.title = "Invoice Detail | Symox - React Admin & Dashboard Template";

    const printInvoice = () => {
        window.print();
      };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Invoices" breadcrumbItem="Invoice Detail" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <div className="invoice-title">
                                        <h4 className="float-end font-size-15">Invoice #DS0204 <span className="badge bg-success font-size-12 ms-2">Paid</span></h4>
                                        <div className="mb-4">
                                            <img src={logosm} alt="logo" height="28" />
                                        </div>
                                        <div className="text-muted">
                                            <p className="mb-1">3184 Spruce Drive Pittsburgh, PA 15201</p>
                                            <p className="mb-1"><i className="mdi mdi-email-outline me-1"></i> xyz@987.com</p>
                                            <p><i className="mdi mdi-phone-outline me-1"></i> 012-345-6789</p>
                                        </div>
                                    </div>

                                    <hr className="my-4" />

                                    <Row>
                                        <Col sm={6}>
                                            <div className="text-muted">
                                                <h5 className="font-size-16 mb-3">Billed To:</h5>
                                                <h5 className="font-size-15 mb-2">Preston Miller</h5>
                                                <p className="mb-1">4068 Post Avenue Newfolden, MN 56738</p>
                                                <p className="mb-1">PrestonMiller@armyspy.com</p>
                                                <p>001-234-5678</p>
                                            </div>
                                        </Col>
                                        <Col sm={6}>
                                            <div className="text-muted text-sm-end">
                                                <div>
                                                    <h5 className="font-size-15 mb-1">Invoice No:</h5>
                                                    <p>#DZ0112</p>
                                                </div>
                                                <div className="mt-4">
                                                    <h5 className="font-size-15 mb-1">Invoice Date:</h5>
                                                    <p>12 Oct, 2020</p>
                                                </div>
                                                <div className="mt-4">
                                                    <h5 className="font-size-15 mb-1">Order No:</h5>
                                                    <p>#1123456</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className="py-2">
                                        <h5 className="font-size-15">Order Summary</h5>

                                        <div className="table-responsive">
                                            <table className="table align-middle table-nowrap table-centered mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="fw-bold" style={{ width: "70px" }}>No.</th>
                                                        <th className="fw-bold">Item</th>
                                                        <th className="fw-bold">Price</th>
                                                        <th className="fw-bold">Quantity</th>
                                                        <th className="text-end fw-bold" style={{ width: "120px" }}>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">01</th>
                                                        <td>
                                                            <div>
                                                                <h5 className="text-truncate font-size-14 mb-1">Black Strap A012</h5>
                                                                <p className="text-muted mb-0">Watch, Black</p>
                                                            </div>
                                                        </td>
                                                        <td>$ 245.50</td>
                                                        <td>1</td>
                                                        <td className="text-end">$ 245.50</td>
                                                    </tr>

                                                    <tr>
                                                        <th scope="row">02</th>
                                                        <td>
                                                            <div>
                                                                <h5 className="text-truncate font-size-14 mb-1">Stainless Steel S010</h5>
                                                                <p className="text-muted mb-0">Watch, Gold</p>
                                                            </div>
                                                        </td>
                                                        <td>$ 245.50</td>
                                                        <td>2</td>
                                                        <td className="text-end">$491.00</td>
                                                    </tr>

                                                    <tr>
                                                        <th scope="row" colSpan="4" className="text-end fw-bold">Sub Total</th>
                                                        <td className="text-end">$732.50</td>
                                                    </tr>

                                                    <tr>
                                                        <th scope="row" colSpan="4" className="border-0 text-end fw-bold">
                                                            Discount :</th>
                                                        <td className="border-0 text-end">- $25.50</td>
                                                    </tr>

                                                    <tr>
                                                        <th scope="row" colSpan="4" className="border-0 text-end fw-bold">
                                                            Shipping Charge :</th>
                                                        <td className="border-0 text-end">$20.00</td>
                                                    </tr>

                                                    <tr>
                                                        <th scope="row" colSpan="4" className="border-0 text-end fw-bold">
                                                            Tax</th>
                                                        <td className="border-0 text-end">$12.00</td>
                                                    </tr>

                                                    <tr>
                                                        <th scope="row" colSpan="4" className="border-0 text-end fw-bold">Total</th>
                                                        <td className="border-0 text-end"><h4 className="m-0 fw-semibold">$739.00</h4></td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="d-print-none mt-4">
                                            <div className="float-end">
                                                <Link to="#"  onClick={printInvoice} className="btn btn-success me-2"><i className="fa fa-print"></i></Link>
                                                <Link to="#" className="btn btn-primary w-md">Send</Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default InvoicesDetail;
