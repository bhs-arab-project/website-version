import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function Quote() {
  return (
    <>
      <div className="section">
        <Container>
          <blockquote class="blockquote text-center text-info border-0">
            <p id="arab"></p>
            <i id="latin"></i>
            <p id="arti"></p>
          </blockquote>
        </Container>
      </div>
    </>
  );
}

export default Quote;
