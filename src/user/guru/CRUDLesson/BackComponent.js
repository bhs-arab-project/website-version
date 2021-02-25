import React from "react";
import { Link } from "react-router-dom";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";

const BackComponent = () => {
  return (
    <Row>
      <Col>
        <Link to="/">
          <button type="button" rel="tooltip" class="btn btn-danger">
            <i class="now-ui-icons arrows-1_minimal-left"></i> Kembali
          </button>
        </Link>
      </Col>
    </Row>
  );
};

export default BackComponent;
