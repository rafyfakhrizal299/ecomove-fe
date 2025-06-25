import React from "react";

import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";

const Users = () => {
  document.title = "EcoMove";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col>
              <Breadcrumbs title="PAGES" breadcrumbItem="USER" />
            </Col>
          </Row>
          <Row style={{ paddingTop: "15px", marginBottom: "15px" }}>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Card className="mb-3">
                <CardHeader>
                  <Row>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      <span style={{ fontSize: "1rem" }}> User Managment </span>
                      <span className="text-secondary"> List </span>
                    </Col>
                    <Col
                      xs={6}
                      sm={6}
                      md={6}
                      lg={6}
                      style={{
                        textAlign: "right",
                        alignSelf: "center",
                        borderColor: "#66bb6a",
                        color: "#66bb6a",
                      }}
                    >
                      <a
                        // onClick={(e) =>
                        //   dispatch(
                        //     openForm({
                        //       state: "add",
                        //       open: true,
                        //       // id: row.id,
                        //       // data: row,
                        //     })
                        //   )
                        // }
                        className="btn btn-outline-theme"
                      >
                        <i className="dripicons-plus" /> Add New
                      </a>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* <DatatableComponent
                    data={dataUser}
                    page={page}
                    countPerPage={countPerPage}
                    columns={columns}
                    setPage={setPage}
                  /> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Users;
