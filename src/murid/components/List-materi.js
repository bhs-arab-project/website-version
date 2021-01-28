import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
  Button,
} from "reactstrap";

// core components

function Tabs() {
  return (
    <>
      <div className="section section-tabs">
        <Container>
          <h2>Mulai belajar - ابدا بالتعلم</h2>
          <Row className="d-flex justify-space-between">
            <Col md="6" xl="4">
              <Card>
                <CardBody className="ml-2">
                  <CardTitle className="pt-0">
                    <span class="badge badge-success float-right mt-2">
                      beginner
                    </span>
                    <h3>NAHWU</h3>
                  </CardTitle>
                  <Row>
                    <Col xs="3">
                      <img
                        width="90%"
                        alt="..."
                        className="rounded-circle "
                        src={require("assets/img/muslim.png")}
                      ></img>
                    </Col>
                    <Col xs="auto">
                      <div class="pl-0 pr-0 pb-1">
                        <h6 class="card-title text-left card-trainer-name">
                          Ahmad taufiq
                        </h6>{" "}
                        <h6 class="card-title text-left card-trainer-tipe text-info">
                          Mentor
                        </h6>
                      </div>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-end">
                    <Col xs="auto" className="mt-3">
                      <i class="now-ui-icons files_single-copy-04 "></i>
                      <span> : 10 Materi</span>
                    </Col>
                    <Col xs="auto" className="mt-3">
                      <span class="card-title text-left">Kesulitan : </span>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/star.png")}
                      ></img>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/star.png")}
                      ></img>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/nostar.png")}
                      ></img>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/nostar.png")}
                      ></img>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/nostar.png")}
                      ></img>
                    </Col>
                    <Col xs="auto">
                      <Button
                        color="primary"
                        className="float-right"
                        href="/detail-bab"
                      >
                        mulai belajar
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md="6" xl="4">
              <Card>
                <CardBody className="ml-2">
                  <CardTitle className="pt-0">
                    <span class="badge badge-info float-right mt-2">
                      menengah
                    </span>
                    <h3>SHARAF</h3>
                  </CardTitle>
                  <Row>
                    <Col xs="3">
                      <img
                        width="90%"
                        alt="..."
                        className="rounded-circle "
                        src={require("assets/img/muslim.png")}
                      ></img>
                    </Col>
                    <Col xs="auto">
                      <div class="pl-0 pr-0 pb-1">
                        <h6 class="card-title text-left card-trainer-name">
                          Abdul malik
                        </h6>{" "}
                        <h6 class="card-title text-left card-trainer-tipe text-info">
                          Mentor
                        </h6>
                      </div>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-end">
                    <Col xs="auto" className="mt-3">
                      <i class="now-ui-icons files_single-copy-04 "></i>
                      <span> : 7 Materi</span>
                    </Col>
                    <Col xs="auto" className="mt-3">
                      <span class="card-title text-left">Kesulitan : </span>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/star.png")}
                      ></img>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/star.png")}
                      ></img>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/nostar.png")}
                      ></img>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/nostar.png")}
                      ></img>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/nostar.png")}
                      ></img>
                    </Col>
                    <Col xs="auto">
                      <Button color="primary" className="float-right">
                        mulai belajar
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md="6" xl="4">
              <Card>
                <CardBody className="ml-2">
                  <CardTitle className="pt-0">
                    <span class="badge badge-info float-right mt-2">
                      menengah
                    </span>
                    <h3>PERCAKAPAN</h3>
                  </CardTitle>
                  <Row>
                    <Col xs="3">
                      <img
                        width="90%"
                        alt="..."
                        className="rounded-circle "
                        src={require("assets/img/muslim.png")}
                      ></img>
                    </Col>
                    <Col xs="auto">
                      <div class="pl-0 pr-0 pb-1">
                        <h6 class="card-title text-left card-trainer-name">
                          Abdul malik
                        </h6>{" "}
                        <h6 class="card-title text-left card-trainer-tipe text-info">
                          Mentor
                        </h6>
                      </div>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-end">
                    <Col xs="auto" className="mt-3">
                      <i class="now-ui-icons files_single-copy-04 "></i>
                      <span> : 10 Materi</span>
                    </Col>
                    <Col xs="auto" className="mt-3">
                      <span class="card-title text-left">Kesulitan : </span>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/star.png")}
                      ></img>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/star.png")}
                      ></img>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/nostar.png")}
                      ></img>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/nostar.png")}
                      ></img>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/nostar.png")}
                      ></img>
                    </Col>
                    <Col xs="auto">
                      <Button color="primary" className="float-right">
                        mulai belajar
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md="6" xl="4">
              <Card>
                <CardBody className="ml-2">
                  <CardTitle className="pt-0">
                    <span class="badge badge-success float-right mt-2">
                      pemula
                    </span>
                    <h3>MUFRADAT</h3>
                  </CardTitle>
                  <Row>
                    <Col xs="3">
                      <img
                        width="90%"
                        alt="..."
                        className="rounded-circle "
                        src={require("assets/img/muslim.png")}
                      ></img>
                    </Col>
                    <Col xs="auto">
                      <div class="pl-0 pr-0 pb-1">
                        <h6 class="card-title text-left card-trainer-name">
                          Ahmad Rosid Komarudin
                        </h6>{" "}
                        <h6 class="card-title text-left card-trainer-tipe text-info">
                          Mentor
                        </h6>
                      </div>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-end">
                    <Col xs="auto" className="mt-3">
                      <i class="now-ui-icons files_single-copy-04 "></i>
                      <span> : 10 Materi</span>
                    </Col>
                    <Col xs="auto" className="mt-3">
                      <span class="card-title text-left">Kesulitan : </span>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/star.png")}
                      ></img>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/star.png")}
                      ></img>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/nostar.png")}
                      ></img>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/nostar.png")}
                      ></img>
                      <img
                        width="15px"
                        alt="..."
                        src={require("assets/img/nostar.png")}
                      ></img>
                    </Col>

                    <Col xs="auto">
                      <Button color="primary" className="float-right">
                        mulai belajar
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Tabs;
