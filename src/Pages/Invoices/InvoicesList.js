import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Modal, TabContent, TabPane, Tooltip, Card, CardBody, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import InvoiceListTable from "./InvoiceTable/invoiceListTable";

const InvoicesList = () => {
    document.title = "Invoices List | Symox - React Admin & Dashboard Template";


    const [modal_invoice, setmodal_invoice] = useState(false);

    function tog_invoice() {
        setmodal_invoice(!modal_invoice);
    }

    // Wizard Modal

    const [tuser, settuser] = useState(false);
    const [tfile, settfile] = useState(false);
    const [tedit, settedit] = useState(false);


    const [activeTab, setactiveTab] = useState(1);

    const [passedSteps, setPassedSteps] = useState([1]);

    function toggleTab(tab) {
        if (activeTab !== tab) {
            var modifiedSteps = [...passedSteps, tab];
            if (tab >= 1 && tab <= 3) {
                setactiveTab(tab);
                setPassedSteps(modifiedSteps);
            }
        }
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Invoices" breadcrumbItem="Invoice List" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>

                                    <div className="position-relative">
                                        <div className="modal-button mt-2">
                                            <Row className="align-items-start">
                                                <Col className="col-sm">
                                                    <div>
                                                        <button type="button" className="btn btn-success mb-4" data-bs-toggle="modal" data-bs-target="#addInvoiceModal" onClick={() => { tog_invoice(); }}><i className="mdi mdi-plus me-1"></i> Add Invoice</button>
                                                    </div>
                                                </Col>
                                                <Col className="col-sm-auto">
                                                    <div className="d-flex gap-1">
                                                        <div className="input-group">
                                                            <Flatpickr
                                                                className="form-control"
                                                                placeholder="dd M, yyyy"
                                                                options={{
                                                                    mode: "range",
                                                                    dateFormat: "Y-m-d"
                                                                }}
                                                                id="datepicker-range"
                                                            />
                                                            <span className="input-group-text"><i className="bx bx-calendar-event"></i>

                                                            </span>
                                                        </div>

                                                        <UncontrolledDropdown className="dropdown">
                                                            <DropdownToggle tag="a" className="btn btn-link text-body shadow-none">
                                                            <i className="bx bx-dots-horizontal-rounded"></i>
                                                            </DropdownToggle>
                                                            <DropdownMenu className="dropdown-menu-end">
                                                                <DropdownItem>Action</DropdownItem>
                                                                <DropdownItem>Another action</DropdownItem>
                                                                <DropdownItem>Something else here</DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div id="table-invoices-list">

                                        <InvoiceListTable />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Invoice List Modal */}

            <Modal size="xl" isOpen={modal_invoice} toggle={() => { tog_invoice(); }} className="addInvoiceModal" centered >
                <div className="modal-header">
                    <h5 className="modal-title" id="addInvoiceModalLabel"> Add Invoice </h5>
                    <button onClick={() => { setmodal_invoice(false); }} type="button" className="btn-close" aria-label="Close" >
                    </button>
                </div>
                <div className="modal-body p-4">
                    <form>
                        <div>
                            <ul className="wizard-nav mb-5">
                                <li className="wizard-list-item">
                                    <div className={activeTab === 1 ? "list-item active" : "list-item"} >
                                        <div className="step-icon" id="customer" data-bs-toggle="tooltip" data-bs-placement="top"
                                            title="Customer Info">
                                            <i className="bx bx-user-circle"></i>
                                        </div>
                                    </div>
                                </li>
                                <li className="wizard-list-item">
                                    <div className={activeTab === 2 ? "list-item active" : "list-item"}>
                                        <div className="step-icon" data-bs-toggle="tooltip" data-bs-placement="top"
                                            id="invoice" title="Invoice Details">
                                            <i className="bx bx-file"></i>
                                        </div>
                                    </div>
                                </li>

                                <li className="wizard-list-item">
                                    <div className={activeTab === 3 ? "list-item active" : "list-item"}>
                                        <div className="step-icon" data-bs-toggle="tooltip" data-bs-placement="top"
                                            id="order" title="Order Summery">
                                            <i className="bx bx-edit"></i>
                                        </div>
                                    </div>
                                </li>
                                <Tooltip placement="top" isOpen={tuser} target="customer" toggle={() => { settuser(!tuser); }}>
                                    Customer Info
                                </Tooltip>

                                <Tooltip placement="top" isOpen={tfile} target="invoice" toggle={() => { settfile(!tfile); }}>
                                    Invoice Details
                                </Tooltip>
                                <Tooltip placement="top" isOpen={tedit} target="order" toggle={() => { settedit(!tedit); }}>
                                    Order Summery
                                </Tooltip>
                            </ul>

                            <TabContent activeTab={activeTab}>
                                <TabPane tabId={1} className="wizard-tab">
                                    <div className="text-center mb-4">
                                        <h5>Customer Information</h5>
                                        <p className="card-title-desc">Fill all information below</p>
                                    </div>
                                    <div>
                                        <Row>
                                            <Col lg={4}>
                                                <div className="mb-3">
                                                    <label htmlFor="customerinfo-name-input" className="form-label">Customer Name :</label>
                                                    <input type="text" className="form-control" placeholder="Enter Name" id="customerinfo-name-input" />
                                                </div>

                                            </Col>
                                            <Col lg={4}>
                                                <div className="mb-3">
                                                    <label htmlFor="customerinfo-email-input" className="form-label">Email :</label>
                                                    <input type="email" className="form-control" placeholder="Enter Email" id="customerinfo-email-input" />
                                                </div>
                                            </Col>
                                            <Col lg={4}>

                                                <div className="mb-3">
                                                    <label htmlFor="customerinfo-phone-input" className="form-label">Phone :</label>
                                                    <input type="text" className="form-control" placeholder="Enter Phone" id="customerinfo-phone-input" />
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="mb-3">
                                            <label htmlFor="customerinfo-address-input" className="form-label">Address :</label>
                                            <textarea className="form-control" placeholder="Enter Address" id="customerinfo-address-input" rows="2"></textarea>
                                        </div>
                                    </div>
                                </TabPane>


                                <TabPane tabId={2} className="wizard-tab">

                                    <div className="text-center mb-4">
                                        <h5>Invoice Details</h5>
                                        <p className="card-title-desc">Fill Invoice Details.</p>
                                    </div>
                                    <div>
                                        <Row>
                                            <Col lg={6}>

                                                <div className="mb-3">
                                                    <label htmlFor="invoicenumberinput" className="form-label">Invoice #</label>
                                                    <input type="text" className="form-control" placeholder="Enter Invoice" id="invoicenumberinput" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Invoice Date</label>
                                                    <input type="text" className="form-control" placeholder="Enter Date" id="datepicker-invoice" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="invoicedescriptioninput" className="form-label">Description (Optional)</label>
                                                    <input type="text" className="form-control" placeholder="Enter Description" id="invoicedescriptioninput" />
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mb-3">
                                                    <label className="form-label">Payment method :</label>
                                                    <select className="form-select">
                                                        <option defaultValue>Select Payment method</option>
                                                        <option defaultValue="CR">Credit / Debit Card</option>
                                                        <option defaultValue="PY">Paypal</option>
                                                    </select>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </TabPane>


                                <TabPane tabId={3} className="wizard-tab">
                                    <div className="text-center mb-4">
                                        <h5>Order Summery</h5>
                                        <p className="card-title-desc">Fill Order Summery Details.</p>
                                    </div>
                                    <div>
                                        <div className="table-responsive">
                                            <table className="table table-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Item name</th>
                                                        <th scope="col">Description</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Total</th>
                                                        <th scope="col" className="text-center">Action</th>
                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>
                                                            <div>
                                                                <input className="form-control" placeholder="Enter Name" type="text" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <textarea className="form-control" placeholder="Enter Description" rows="2"></textarea>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <input className="form-control" placeholder="Enter Price" type="text" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <input className="form-control" placeholder="Enter Quantity" type="text" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <input className="form-control" type="text" defaultValue="0.00" readOnly />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="text-center">
                                                                <Link to="#" className="text-danger p-2 d-inline-block" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fas fa-trash-alt"></i></Link>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>
                                                            <div>
                                                                <input className="form-control" placeholder="Enter Name" type="text" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <textarea className="form-control" placeholder="Enter Description" rows="2"></textarea>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <input className="form-control" placeholder="Enter Price" type="text" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <input className="form-control" placeholder="Enter Quantity" type="text" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <input className="form-control" type="text" defaultValue="0.00" readOnly />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="text-center">
                                                                <Link to="#" className="text-danger p-2 d-inline-block" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fas fa-trash-alt"></i></Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <Row className="justify-content-end">
                                            <Col xl={3} md={4}>
                                                <div>
                                                    <div>
                                                        <h5 className="font-size-14 py-2">Sub Total : <span className="float-end fw-normal text-body">0.00</span></h5>
                                                    </div>
                                                    <div>
                                                        <h5 className="font-size-14 py-2">Discount  : <span className="float-end fw-normal text-body"> - 0.00</span></h5>
                                                    </div>
                                                    <div>
                                                        <h5 className="font-size-14 py-2">Shipping Charge  : <span className="float-end fw-normal text-body"> 0.00</span></h5>
                                                    </div>
                                                    <div>
                                                        <h5 className="font-size-14 py-2">Tax  : <span className="float-end fw-normal text-body"> 0.00</span></h5>
                                                    </div>
                                                    <div>
                                                        <h5 className="font-size-14 py-2">Total  : <span className="float-end"> 0.00</span></h5>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </TabPane>
                            </TabContent>

                            <div className="d-flex align-items-start gap-3 mt-4">
                                <button type="button" id="prevBtn"  className={activeTab === 1 ? "btn btn-primary w-sm d-none" : "btn btn-primary w-sm"} onClick={() => { toggleTab(activeTab - 1); }}>Previous</button>
                                <button type="button" id="nextBtn"  className="btn btn-primary w-sm ms-auto" onClick={() => { toggleTab(activeTab + 1); }}>{activeTab === 3 ? "Add" : "Next"}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>

        </React.Fragment>
    );
};

export default InvoicesList;
