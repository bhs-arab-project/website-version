import IndexNavbar from "components/Navbars/IndexNavbar";
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DetailHeader(props) {
  let pageHeader = React.createRef();
  return (
    <>
      <IndexNavbar />
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + props.img + ")",
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <h1 className="title">{props.header}</h1>
            <div className="text-center">{props.subHeader}</div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default DetailHeader;
