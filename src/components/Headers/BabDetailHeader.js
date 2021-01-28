import React from "react";

// reactstrap components
import { Container } from "reactstrap";
// import Col from "reactstrap/lib/Col";

// core components

function LandingPageHeader() {
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
  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/bab-detail-bg.png") + ")",
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <div class="media">
              <div className="align-self-center mr-4 mt-5 ">
                <img
                  width="100rem"
                  alt="..."
                  className="rounded-circle align-self-center"
                  src={require("assets/img/muslim.png")}
                ></img>
                <div>Ahmad kodir</div>
              </div>
              <div class="media-body text-left">
                <h1 className="title">Nahwu</h1>
                <div style={{ fontSize: "0.9rem" }}>
                  Pengertian Ilmu nahwu adalah: Ilmu yang mempelajari tentang
                  jabatan kata dalam kalimat dan harakat akhirnya, baik berubah
                  (i'rab) atau tetap (bina). kaidah-kaidah yang dengannya
                  diketahui hukum-hukum akhir-akhir kata bahasa arab dalam
                  keadaan tersusun.!
                </div>
              </div>
            </div>
            {/* <Row>
              <Col sm="2">

              </Col>
              <Col className="text-left">
              
              </Col>
            </Row> */}
          </Container>
        </div>
      </div>
    </>
  );
}

export default LandingPageHeader;
