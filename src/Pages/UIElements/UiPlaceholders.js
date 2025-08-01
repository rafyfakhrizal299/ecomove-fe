import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Import Images
import img1 from "../../assets/images/small/img-1.jpg"
import { Link } from "react-router-dom";

const UiPlaceholders = () => {
  document.title = "Placeholders | Symox - React Admin & Dashboard Template";

  return (
    <React.Fragment>

      <div className="page-content">
        <Container fluid={true}>

          <Breadcrumbs title="UI Elements" breadcrumbItem="Placeholders" />


          <Row>
            <Col xl={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Default Examples</h4>
                  <p className="card-title-desc">In the example below, we take a typical card component and recreate it with placeholders applied to create a “loading card”. Size and proportions are the same between the two.</p>
                </CardHeader>

                <CardBody>
                  <Row className="gap-4">
                    <Col lg={5}>
                      <div className="card mb-0">
                        <img src={img1} className="card-img-top" alt="..." />

                        <CardBody>
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                            content.</p>
                          <Link to="#" className="btn btn-primary">Go somewhere</Link>
                        </CardBody>
                      </div>
                    </Col>

                    <Col lg={5}>
                      <div className="card mb-0" aria-hidden="true">
                        <img src={img1} className="card-img-top" alt="..." />
                        <CardBody>
                          <h5 className="card-title placeholder-glow">
                            <span className="placeholder col-6"></span>
                          </h5>
                          <p className="card-text placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-6"></span>
                            <span className="placeholder col-8"></span>
                          </p>
                          <Link to="#" tabIndex="-1" className="btn btn-primary disabled placeholder col-6"></Link>
                        </CardBody>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Placeholders with Grid column</h4>
                  <p className="card-title-desc">Create placeholders with the <code>.placeholder</code> class and a grid column class (e.g., <code>.col-6</code>) to set the <code>width</code>. They can replace the text inside an element or be added as a modifier class to an existing component.</p>
                </CardHeader>

                <CardBody>
                  <div>
                    <p aria-hidden="true">
                      <span className="placeholder col-6"></span>
                    </p>

                    <Link to="#" tabIndex="-1" className="btn btn-primary disabled placeholder col-4" aria-hidden="true"></Link>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h4 className="card-title">Placeholders Width</h4>
                  <p className="card-title-desc">You can change the <code>width</code> through grid column classes, width utilities, or inline styles.</p>
                </CardHeader>

                <CardBody>
                  <div>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder w-75"></span> <br />
                    <span className="placeholder" style={{width: "25%"}}></span>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Placeholders Color</h4>
                  <p className="card-title-desc">By default, the <code>placeholder</code> uses <code>currentColor</code>. This can be overridden with a custom color or utility class.</p>
                </CardHeader>

                <CardBody>


                  <div>
                    <span className="placeholder col-12"></span>
                    <span className="placeholder col-12 bg-primary"></span>
                    <span className="placeholder col-12 bg-secondary"></span>
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-danger"></span>
                    <span className="placeholder col-12 bg-warning"></span>
                    <span className="placeholder col-12 bg-info"></span>
                    <span className="placeholder col-12 bg-light"></span>
                    <span className="placeholder col-12 bg-dark"></span>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Placeholders Sizing</h4>
                  <p className="card-title-desc">The size of <code>.placeholder</code>s are based on the typographic style of the parent element. Customize them with sizing modifiers: <code>.placeholder-lg</code>, <code>.placeholder-sm</code>, or <code>.placeholder-xs</code>.</p>
                </CardHeader>

                <CardBody>
                  <div>
                    <span className="placeholder col-12 placeholder-lg"></span>
                    <span className="placeholder col-12"></span>
                    <span className="placeholder col-12 placeholder-sm"></span>
                    <span className="placeholder col-12 placeholder-xs"></span>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Animation in Placeholders</h4>
                  <p className="card-title-desc">Animate placeholders with <code>.placeholder-glow</code> or <code>.placeholder-wave</code> to better convey the perception of something being <em>actively</em> loaded.</p>
                </CardHeader>

                <CardBody>
                  <div className="">
                    <p className="placeholder-glow">
                      <span className="placeholder col-12"></span>
                    </p>

                    <p className="placeholder-wave mb-0">
                      <span className="placeholder col-12"></span>
                    </p>
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

export default UiPlaceholders;