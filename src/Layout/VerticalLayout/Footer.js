import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col sm={6}>{new Date().getFullYear()} © EcoMove.</Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
