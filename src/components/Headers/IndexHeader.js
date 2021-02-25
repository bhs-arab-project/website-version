import React from "react";
import { Container } from "reactstrap";

function IndexHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  const user = localStorage.getItem("token");
  const userName = JSON.parse(user);

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/header2.jpg") + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="content-center brand text-left">
            <h1>
              Selamat Datang{" "}
              <span className="text-capitalize">{userName?.user?.name}</span>!
            </h1>
            <h3>كيف حالك؟</h3>
          </div>
          <h6 className="category category-absolute">Scroll ke bawah</h6>
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
