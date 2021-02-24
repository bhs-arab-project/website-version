import IndexNavbar from "components/Navbars/IndexNavbar";
import IndexNavbarAdmin from "components/Navbars/IndexNavbarAdmin";
import IndexNavbarGuru from "components/Navbars/IndexNavbarGuru";
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DetailHeader(props) {
  let pageHeader = React.createRef();
  const user = sessionStorage.getItem("token");
  const userJson = JSON.parse(user);
  const roleUser = userJson?.user?.role;
  // React.useEffect(() => {
  //   if (window.innerWidth > 991) {
  //     const updateScroll = () => {
  //       let windowScrollTop = window.pageYOffset / 3;
  //       pageHeader.current.style.transform =
  //         "translate3d(0," + windowScrollTop + "px,0)";
  //     };
  //     window.addEventListener("scroll", updateScroll);
  //     return function cleanup() {
  //       window.removeEventListener("scroll", updateScroll);
  //     };
  //   }
  // });
  return (
    <>
      {roleUser === "user" ? (
        <IndexNavbar />
      ) : roleUser === "teacher" ? (
        <IndexNavbarGuru />
      ) : (
        <IndexNavbarAdmin />
      )}
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
