import React from "react";
import { Row, Col, Card, CardBody, Container } from "reactstrap";

// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import ShopsTable from "./EcomTable/shopsTable";

const Shops = () => {
    document.title = "Shops | Symox - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Ecommerce" breadcrumbItem="Shops" />
                    <Row>
                        <Col xl={12}>
                            <Card>
                                <CardBody>
                                    <div id="table-ecommerce-shops">
                                        <ShopsTable/>
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

export default Shops;


