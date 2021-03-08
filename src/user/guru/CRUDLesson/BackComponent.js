import React from "react";
import { Link } from "react-router-dom";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";

const BackComponent = () => {
  return (
    <Row>
      <Col>
        <Link to="/">
          <button type="button" rel="tooltip" className="btn btn-danger">
            <i className="now-ui-icons arrows-1_minimal-left"></i> Kembali
          </button>
        </Link>
      </Col>
    </Row>
  );
};

export default BackComponent;
