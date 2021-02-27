import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

// core components
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import IndexNavbar from "components/Navbars/IndexNavbar";
import PaginationSection from "./../template/index-sections/Pagination";
import TransparentFooter from "components/Footers/TransparentFooter";
const user = localStorage.getItem("token");
const userJson = JSON.parse(user);
const roleUser = userJson?.user?.role;
const userName = userJson?.user?.name;

function ProfilePage() {
  // const [pills, setPills] = React.useState("2");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <ProfilePageHeader name={userName} roleUser={roleUser} />
        <div className="section">
          <Container>
            <div className="button-container">
              <Button className="btn-round" color="info" size="lg">
                Edit Profil
              </Button>
            </div>
          </Container>
          <PaginationSection />
          <Container>
            <h2>Sertifikat</h2>
            <Row>
              <Col md="6" xl="4">
                <div class="media">
                  <img
                    width="35%"
                    alt="..."
                    className="rounded align-self-center mr-3"
                    src={require("assets/img/cert-icon.png")}
                  ></img>
                  <div class="media-body mt-2">
                    <h5>Nahwu</h5>
                    <div class="date">Lulus : 18 April, 2020</div>
                    <div class="download">
                      Download :
                      <Button className="btn-link" color="primary">
                        PDF
                      </Button>
                      |
                      <Button className="btn-link" color="primary">
                        Image
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" xl="4">
                <div class="media">
                  <img
                    width="35%"
                    alt="..."
                    className="rounded align-self-center mr-3"
                    src={require("assets/img/cert-icon.png")}
                  ></img>
                  <div class="media-body mt-2">
                    <h5>Nahwu</h5>
                    <div class="date">Lulus : 18 April, 2020</div>
                    <div class="download">
                      Download :
                      <Button className="btn-link" color="primary">
                        PDF
                      </Button>
                      |
                      <Button className="btn-link" color="primary">
                        Image
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" xl="4">
                <div class="media">
                  <img
                    width="35%"
                    alt="..."
                    className="rounded align-self-center mr-3"
                    src={require("assets/img/cert-icon.png")}
                  ></img>
                  <div class="media-body mt-2">
                    <h5>Nahwu</h5>
                    <div class="date">Lulus : 18 April, 2020</div>
                    <div class="download">
                      Download :
                      <Button className="btn-link" color="primary">
                        PDF
                      </Button>
                      |
                      <Button className="btn-link" color="primary">
                        Image
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" xl="4">
                <div class="media">
                  <img
                    width="35%"
                    alt="..."
                    className="rounded align-self-center mr-3"
                    src={require("assets/img/cert-icon.png")}
                  ></img>
                  <div class="media-body mt-2">
                    <h5>Nahwu</h5>
                    <div class="date">Lulus : 18 April, 2020</div>
                    <div class="download">
                      Download :
                      <Button className="btn-link" color="primary">
                        PDF
                      </Button>
                      |
                      <Button className="btn-link" color="primary">
                        Image
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default ProfilePage;
