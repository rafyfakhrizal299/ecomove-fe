import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UiColors = () => {
  document.title = "Colors | Symox - React Admin & Dashboard Template";

  return (
    <React.Fragment>

      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="UI Elements" breadcrumbItem="Colors" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader>
                  <h4 className="card-title">Grid options</h4>
                  <p className="card-title-desc">See how aspects of the Bootstrap grid
                    system work across multiple devices with a handy table.</p>
                </CardHeader>

                <CardBody>
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-nowrap align-middle mb-0">
                      <thead>
                        <tr>
                          <th scope="col">
                            Colors
                          </th>
                          <th scope="col" colSpan="2" className="text-center">
                            Background <br /> Gradient
                          </th>
                          <th scope="col" colSpan="2" className="text-center">
                            Background <br /> Color
                          </th>
                          <th scope="col" colSpan="2" className="text-center">
                            Background <br /> Soft
                          </th>
                          <th scope="col" colSpan="2" className="text-center">
                            Border <br /> Colors
                          </th>
                          <th scope="col" colSpan="2" className="text-center">
                            Text <br /> Colors
                          </th>
                        </tr>
                      </thead>
                      <tbody>

                        <tr>
                          <th className="" scope="row">
                            Primary
                          </th>
                          <td style={{width: "100px"}}>
                            <code>.bg-gradient</code>
                          </td>
                          <td style={{width: "180px"}}>
                            <div className="bg-primary bg-gradient p-2"></div>
                          </td>
                          <td style={{width: "100px"}}>
                            <code>.bg-primary</code>
                          </td>
                          <td style={{width: "180px"}}>
                            <div className="bg-primary p-2"></div>
                          </td>
                          <td style={{width: "100px"}}>
                            <code>.bg-primary-subtle</code>
                          </td>
                          <td style={{width: "180px"}}>
                            <div className="bg-primary-subtle p-2"></div>
                          </td>
                          <td style={{width: "100px"}}>
                            <code>.border-primary</code>
                          </td>
                          <td style={{width: "180px"}}>
                            <div className="border border-primary p-2"></div>
                          </td>
                          <td style={{width: "100px"}}>
                            <code>.text-primary</code>
                          </td>
                          <td style={{width: "100px"}}>
                            <div className="text-primary">text-primary</div>
                          </td>
                        </tr>


                        <tr>
                          <th className="" scope="row">
                            Secondary
                          </th>
                          <td>
                            <code>.bg-gradient</code>
                          </td>
                          <td>
                            <div className="bg-secondary bg-gradient p-2"></div>
                          </td>
                          <td>
                            <code>.bg-secondary</code>
                          </td>
                          <td>
                            <div className="bg-secondary p-2"></div>
                          </td>
                          <td>
                            <code>.bg-secondary-subtle</code>
                          </td>
                          <td>
                            <div className="bg-secondary-subtle p-2"></div>
                          </td>
                          <td>
                            <code>.border-secondary</code>
                          </td>
                          <td>
                            <div className="border border-secondary p-2"></div>
                          </td>
                          <td>
                            <code>.text-secondary</code>
                          </td>
                          <td>
                            <div className="text-secondary">text-secondary</div>
                          </td>
                        </tr>

                        <tr>
                          <th className="" scope="row">
                            Success
                          </th>
                          <td>
                            <code>.bg-gradient</code>
                          </td>
                          <td>
                            <div className="bg-success bg-gradient p-2 align-self-center"></div>
                          </td>
                          <td>
                            <code>.bg-success</code>
                          </td>
                          <td>
                            <div className="bg-success p-2"></div>
                          </td>
                          <td>
                            <code>.bg-success-subtle</code>
                          </td>
                          <td>
                            <div className="bg-success-subtle p-2"></div>
                          </td>
                          <td>
                            <code>.border-success</code>
                          </td>
                          <td>
                            <div className="border border-success p-2"></div>
                          </td>
                          <td>
                            <code>.text-success</code>
                          </td>
                          <td>
                            <div className="text-success">text-success</div>
                          </td>
                        </tr>

                        <tr>
                          <th className="" scope="row">
                            Info
                          </th>
                          <td>
                            <code>.bg-gradient</code>
                          </td>
                          <td>
                            <div className="bg-info bg-gradient p-2"></div>
                          </td>
                          <td>
                            <code>.bg-info</code>
                          </td>
                          <td>
                            <div className="bg-info p-2"></div>
                          </td>
                          <td>
                            <code>.bg-info-subtle</code>
                          </td>
                          <td>
                            <div className="bg-info-subtle p-2"></div>
                          </td>
                          <td>
                            <code>.border-info</code>
                          </td>
                          <td>
                            <div className="border border-info p-2"></div>
                          </td>
                          <td>
                            <code>.text-info</code>
                          </td>
                          <td>
                            <div className="text-info">text-info</div>
                          </td>
                        </tr>

                        <tr>
                          <th className="" scope="row">
                            Warning
                          </th>
                          <td>
                            <code>.bg-gradient</code>
                          </td>
                          <td>
                            <div className="bg-warning bg-gradient p-2"></div>
                          </td>
                          <td>
                            <code>.bg-warning</code>
                          </td>
                          <td>
                            <div className="bg-warning p-2"></div>
                          </td>
                          <td>
                            <code>.bg-warning-subtle</code>
                          </td>
                          <td>
                            <div className="bg-warning-subtle p-2"></div>
                          </td>
                          <td>
                            <code>.border-warning</code>
                          </td>
                          <td>
                            <div className="border border-warning p-2"></div>
                          </td>
                          <td>
                            <code>.text-warning</code>
                          </td>
                          <td>
                            <div className="text-warning">text-warning</div>
                          </td>
                        </tr>

                        <tr>
                          <th className="" scope="row">
                            Danger
                          </th>
                          <td>
                            <code>.bg-gradient</code>
                          </td>
                          <td>
                            <div className="bg-danger bg-gradient p-2"></div>
                          </td>
                          <td>
                            <code>.bg-danger</code>
                          </td>
                          <td>
                            <div className="bg-danger p-2"></div>
                          </td>
                          <td>
                            <code>.bg-danger-subtle</code>
                          </td>
                          <td>
                            <div className="bg-danger-subtle p-2"></div>
                          </td>
                          <td>
                            <code>.border-danger</code>
                          </td>
                          <td>
                            <div className="border border-danger p-2"></div>
                          </td>
                          <td>
                            <code>.text-danger</code>
                          </td>
                          <td>
                            <div className="text-danger">text-danger</div>
                          </td>
                        </tr>

                        <tr>
                          <th className="" scope="row">
                            Dark
                          </th>
                          <td>
                            <code>.bg-gradient</code>
                          </td>
                          <td>
                            <div className="bg-dark bg-gradient p-2"></div>
                          </td>
                          <td>
                            <code>.bg-dark</code>
                          </td>
                          <td>
                            <div className="bg-dark p-2"></div>
                          </td>
                          <td>
                            <code>.bg-dark-subtle</code>
                          </td>
                          <td>
                            <div className="bg-dark-subtle p-2"></div>
                          </td>
                          <td>
                            <code>.border-dark</code>
                          </td>
                          <td>
                            <div className="border border-dark p-2"></div>
                          </td>
                          <td>
                            <code>.text-dark</code>
                          </td>
                          <td>
                            <div className="text-dark">text-dark</div>
                          </td>
                        </tr>

                        <tr>
                          <th className="" scope="row">
                            Light
                          </th>
                          <td>
                            <code>.bg-gradient</code>
                          </td>
                          <td>
                            <div className="bg-light bg-gradient p-2"></div>
                          </td>
                          <td>
                            <code>.bg-light</code>
                          </td>
                          <td>
                            <div className="bg-light p-2"></div>
                          </td>
                          <td>
                            <code>.bg-light-subtle</code>
                          </td>
                          <td>
                            <div className="bg-light-subtle p-2"></div>
                          </td>
                          <td>
                            <code>.border-light</code>
                          </td>
                          <td>
                            <div className="border border-light p-2"></div>
                          </td>
                          <td>
                            <code>.text-light</code>
                          </td>
                          <td>
                            <div className="text-light bg-dark">text-light</div>
                          </td>
                        </tr>


                        <tr>
                          <th className="" scope="row">
                            Body
                          </th>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <code>.text-body</code>
                          </td>
                          <td>
                            <div className="text-body">text-body</div>
                          </td>
                        </tr>

                        <tr>
                          <th className="" scope="row">
                            Muted
                          </th>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <code>.text-muted</code>
                          </td>
                          <td>
                            <div className="text-muted">text-muted</div>
                          </td>
                        </tr>

                        <tr>
                          <th className="" scope="row">
                            White
                          </th>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <code>.text-white</code>
                          </td>
                          <td>
                            <div className="text-white bg-dark">text-white</div>
                          </td>
                        </tr>

                        <tr>
                          <th className="" scope="row">
                            White-50
                          </th>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <code>.text-white-50</code>
                          </td>
                          <td>
                            <div className="text-white-50 bg-dark">text-white-50</div>
                          </td>
                        </tr>

                        <tr>
                          <th className="" scope="row">
                            Black-50
                          </th>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <code>.text-black-50</code>
                          </td>
                          <td>
                            <div className="text-black-50">text-black-50</div>
                          </td>
                        </tr>

                        <tr>
                          <th className="" scope="row">
                            Opacity-25
                          </th>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center"><code>.opacity-25</code></div>
                          </td>
                          <td>
                            <div className="text-center">
                              <div className="bg-primary opacity-25 p-2"></div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <code>.text-opacity-25</code>
                          </td>
                          <td>
                            <div className="text-opacity-25 text-primary">text-opacity-25</div>
                          </td>
                        </tr>

                        <tr>
                          <th className="" scope="row">
                            Opacity-50
                          </th>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center"><code>.opacity-50</code></div>
                          </td>
                          <td>
                            <div className="text-center">
                              <div className="bg-primary opacity-50 p-2"></div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <code>.text-opacity-50</code>
                          </td>
                          <td>
                            <div className="text-opacity-50 text-primary">text-opacity-50</div>
                          </td>
                        </tr>

                        <tr>
                          <th className="" scope="row">
                            Opacity-75
                          </th>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center"><code>.opacity-75</code></div>
                          </td>
                          <td>
                            <div className="text-center">
                              <div className="bg-primary opacity-75 p-2"></div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <code>.text-opacity-75</code>
                          </td>
                          <td>
                            <div className="text-opacity-75 text-primary">text-opacity-75</div>
                          </td>
                        </tr>

                        <tr>
                          <th className="" scope="row">
                            Opacity-100
                          </th>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center"><code>.opacity-100</code></div>
                          </td>
                          <td>
                            <div className="text-center">
                              <div className="bg-primary opacity-100 p-2"></div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <div className="text-center">-</div>
                          </td>
                          <td>
                            <code>.text-opacity-100</code>
                          </td>
                          <td>
                            <div className="text-opacity-100 text-primary">text-opacity-100</div>
                          </td>
                        </tr>

                      </tbody>
                    </table>
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

export default UiColors;