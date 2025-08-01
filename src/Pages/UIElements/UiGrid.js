import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UiGrid = () => {
  document.title = "Grid | Symox - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="UI Elements" breadcrumbItem="Grid" />
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader>
                  <h4 className="card-title">Grid Options</h4>
                  <p className="card-title-desc">See how aspects of the Bootstrap grid
                    system work across multiple devices with a handy table.</p>
                </CardHeader>

                <CardBody>
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col" className="text-center">
                            xs<br />
                            <span className="fw-normal">&lt;576px</span>
                          </th>
                          <th scope="col" className="text-center">
                            sm<br />
                            <span className="fw-normal">≥576px</span>
                          </th>
                          <th scope="col" className="text-center">
                            md<br />
                            <span className="fw-normal">≥768px</span>
                          </th>
                          <th scope="col" className="text-center">
                            lg<br />
                            <span className="fw-normal">≥992px</span>
                          </th>
                          <th scope="col" className="text-center">
                            xl<br />
                            <span className="fw-normal">≥1200px</span>
                          </th>
                          <th scope="col" className="text-center">
                            xxl<br />
                            <span className="fw-normal">≥1400px</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th className="text-nowrap" scope="row">Grid behavior</th>
                          <td>Horizontal at all times</td>
                          <td colSpan="5">Collapsed to start, horizontal above breakpoints</td>
                        </tr>
                        <tr>
                          <th className="text-nowrap" scope="row">Max container width</th>
                          <td>None (auto)</td>
                          <td>540px</td>
                          <td>720px</td>
                          <td>960px</td>
                          <td>1140px</td>
                          <td>1320px</td>
                        </tr>
                        <tr>
                          <th className="text-nowrap" scope="row">Class prefix</th>
                          <td><code>.col-</code></td>
                          <td><code>.col-sm-</code></td>
                          <td><code>.col-md-</code></td>
                          <td><code>.col-lg-</code></td>
                          <td><code>.col-xl-</code></td>
                          <td><code>.col-xxl-</code></td>
                        </tr>
                        <tr>
                          <th className="text-nowrap" scope="row"># of columns</th>
                          <td colSpan="6">12</td>
                        </tr>
                        <tr>
                          <th className="text-nowrap" scope="row">Gutter width</th>
                          <td colSpan="6">24px (12px on each side of a column)</td>
                        </tr>
                        <tr>
                          <th className="text-nowrap" scope="row">Custom gutters</th>
                          <td colSpan="6">Yes</td>
                        </tr>
                        <tr>
                          <th className="text-nowrap" scope="row">Nestable</th>
                          <td colSpan="6">Yes</td>
                        </tr>
                        <tr>
                          <th className="text-nowrap" scope="row">Offsets</th>
                          <td colSpan="6">Yes</td>
                        </tr>
                        <tr>
                          <th className="text-nowrap" scope="row">Column ordering</th>
                          <td colSpan="6">Yes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader>
                  <h4 className="card-title">Grid Example</h4>
                  <p className="card-title-desc">Use flexbox alignment utilities to vertically and horizontally align columns</p>
                </CardHeader>

                <CardBody>
                  <div className="grid-structure">
                    <Row>
                      <Col lg={12}>
                        <div className="grid-container">
                          <code>col-lg-12</code>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={11}>
                        <div className="grid-container">
                          <code>col-lg-11</code>
                        </div>
                      </Col>
                      <Col lg={1}>
                        <div className="grid-container">
                          <code>col-lg-1</code>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={10}>
                        <div className="grid-container">
                          <code>col-lg-10</code>
                        </div>
                      </Col>
                      <Col lg={2}>
                        <div className="grid-container">
                          <code>col-lg-2</code>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={9}>
                        <div className="grid-container">
                          <code>col-lg-9</code>
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div className="grid-container">
                          <code>col-lg-3</code>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={8}>
                        <div className="grid-container">
                          <code>col-lg-8</code>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="grid-container">
                          <code>col-lg-4</code>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={7}>
                        <div className="grid-container">
                          <code>col-lg-7</code>
                        </div>
                      </Col>
                      <Col lg={5}>
                        <div className="grid-container">
                          <code>col-lg-5</code>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <div className="col-lg-6">
                        <div className="grid-container">
                          <code>col-lg-6</code>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="grid-container">
                          <code>col-lg-6</code>
                        </div>
                      </div>
                    </Row>
                    <Row>
                      <Col lg={5}>
                        <div className="grid-container">
                          <code>col-lg-5</code>
                        </div>
                      </Col>
                      <Col lg={7}>
                        <div className="grid-container">
                          <code>col-lg-7</code>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <div className="grid-container">
                          <code>col-lg-4</code>
                        </div>
                      </Col>
                      <Col lg={8}>
                        <div className="grid-container">
                          <code>col-lg-8</code>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={3}>
                        <div className="grid-container">
                          <code>col-lg-3</code>
                        </div>
                      </Col>
                      <Col lg={9}>
                        <div className="grid-container">
                          <code>col-lg-9</code>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={2}>
                        <div className="grid-container">
                          <code>col-lg-2</code>
                        </div>
                      </Col>
                      <Col lg={10}>
                        <div className="grid-container">
                          <code>col-lg-10</code>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={1}>
                        <div className="grid-container">
                          <code>col-lg-1</code>
                        </div>
                      </Col>
                      <Col lg={11}>
                        <div className="grid-container">
                          <code>col-lg-11</code>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={2}>
                        <div className="grid-container">
                          <code>col-lg-2</code>
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div className="grid-container">
                          <code>col-lg-3</code>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="grid-container">
                          <code>col-lg-4</code>
                        </div>
                      </Col>
                      <Col lg={2}>
                        <div className="grid-container">
                          <code>col-lg-2</code>
                        </div>
                      </Col>
                      <Col lg={1}>
                        <div className="grid-container">
                          <code>col-lg-1</code>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Alignment</h4>
                  <p className="card-title-desc">Use flexbox alignment utilities to vertically and horizontally align columns</p>
                </CardHeader>

                <CardBody>
                  <div>
                    <h5 className="font-size-13 mb-3">Vertical alignment (align-items-start)</h5>
                    <div className="bg-light-subtle p-3 text-center">
                      <Row className="align-items-start" style={{minHeight: "6rem"}}>
                        <Col sm={4}>
                          <div className="grid-example">
                            <code>col-sm-4</code>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className="grid-example mt-2 mt-sm-0">
                            <code>col-sm-4</code>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className="grid-example mt-2 mt-sm-0">
                            <code>col-sm-4</code>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="font-size-13 mb-2">Align Items Center</h5>
                    <div className="bg-light-subtle p-3 text-center">
                      <div className="row align-items-center" style={{minHeight: "6rem"}}>
                        <Col sm={4}>
                          <div className="grid-example">
                            <code>col-sm-4</code>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className="grid-example mt-2 mt-sm-0">
                            <code>col-sm-4</code>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className="grid-example mt-2 mt-sm-0">
                            <code>col-sm-4</code>
                          </div>
                        </Col>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="font-size-13 mb-2">Align Items End</h5>
                    <div className="bg-light-subtle p-3 text-center">
                      <div className="row align-items-end" style={{minHeight: "6rem"}}>
                        <Col sm={4}>
                          <div className="grid-example">
                            <code>col-sm-4</code>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className="grid-example mt-2 mt-sm-0">
                            <code>col-sm-4</code>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className="grid-example mt-2 mt-sm-0">
                            <code>col-sm-4</code>
                          </div>
                        </Col>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="font-size-13 mb-2">Align Self</h5>
                    <div className="bg-light-subtle p-3 text-center">
                      <Row style={{minHeight: "9rem"}}>
                        <Col className="col-4 align-self-start">
                          <div className="grid-example">
                            <code>align-self-start</code>
                          </div>
                        </Col>
                        <div className="col-4 align-self-center">
                          <div className="grid-example mt-2 mt-sm-0">
                            <code>align-self-center</code>
                          </div>
                        </div>
                        <Col className="col-4 align-self-end">
                          <div className="grid-example mt-2 mt-sm-0">
                            <code>align-self-end</code>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="font-size-13 mb-2">Horizontal Alignment</h5>
                    <div className="bg-light-subtle p-3 text-center">
                      <Row className="justify-content-start">
                        <Col className="col-4">
                          <div className="grid-example">
                            <code>justify-content-start</code>
                          </div>
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <Col className="col-4">
                          <div className="grid-example mt-2 mt-sm-0">
                            <code>justify-content-center</code>
                          </div>
                        </Col>
                      </Row>
                      <Row className="justify-content-end">
                        <Col className="col-4">
                          <div className="grid-example mt-2 mt-sm-0">
                            <code>justify-content-end</code>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Stacks</h4>
                  <p className="card-title-desc">Shorthand helpers that build on top of our flexbox utilities to make component layout faster and easier than ever.</p>
                </CardHeader>

                <CardBody>
                  <div>
                    <h5 className="font-size-13 mb-3">Vertical Stacks (<code>.vstack</code>)</h5>
                    <div className="bg-light-subtle p-3 text-center">
                      <div className="vstack gap-3">
                        <div className="grid-example">First item</div>
                        <div className="grid-example">Second item</div>
                        <div className="grid-example">Third item</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="font-size-13 mb-3">Horizontal Stacks (<code>.hstack</code>)</h5>
                    <div className="bg-light-subtle p-3 text-center">
                      <div className="hstack gap-3">
                        <div className="grid-example">First item</div>
                        <div className="grid-example">Second item</div>
                        <div className="grid-example">Third item</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="font-size-13 mb-3">Horizontal Stacks (<code>.hstack</code>) with Vertical Rule (<code>.vr</code>)</h5>
                    <div className="bg-light-subtle p-3 text-center">
                      <div className="hstack gap-3">
                        <div className="grid-example">First item</div>
                        <div className="vr"></div>
                        <div className="grid-example">Second item</div>
                        <div className="vr"></div>
                        <div className="grid-example">Third item</div>
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

export default UiGrid;