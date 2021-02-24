import React, { useState } from "react";

import { API_URL } from "../../utils/constants";
import axios from "axios";

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
import { Link } from "react-router-dom";
import loaderListMateri from "components/loader/loaderListMateri";

const ListMateri = () => {
  const [load, setLoad] = useState(true);
  let [lesson, setLesson] = React.useState([]);

  const user = sessionStorage.getItem("token");
  const userid = JSON.parse(user);

  const access_token = userid?.token?.token;

  async function fetchData() {
    axios
      .get(`${API_URL}pelajaran`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setLoad(false);
        setLesson(response.data);
      })
      .catch((error) => {
        setLoad(false);
        let message = error.response;
        return message;
      });
  }

  React.useEffect(() => {
    setLoad(true);
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="section section-tabs">
        <Container>
          <h2>Mulai belajar - ابدا بالتعلم</h2>
          <Row className="d-flex justify-space-between">
            {load === false
              ? lesson?.map((pelajaran, index) => {
                  return (
                    <Col md="6" xl="4" key={index}>
                      <Card>
                        <CardBody className="ml-2">
                          <CardTitle className="pt-0">
                            <span class="badge badge-warning float-right mt-2">
                              {pelajaran.tingkatan}
                            </span>
                            <h3>{pelajaran.pelajaran}</h3>
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
                                  {pelajaran.guru}
                                </h6>{" "}
                                <h6 class="card-title text-left card-trainer-tipe text-info">
                                  Pengajar
                                </h6>
                              </div>
                            </Col>
                          </Row>
                          <Row className="d-flex justify-content-end">
                            <Col xs="auto" className="mt-3">
                              <i class="now-ui-icons files_single-copy-04 "></i>
                              <span>
                                {" "}
                                :{" "}
                                {pelajaran.chapter.length === 0 ? (
                                  <span className="text-danger">
                                    Tidak Ada Materi
                                  </span>
                                ) : (
                                  pelajaran.chapter.length + " Materi"
                                )}{" "}
                              </span>
                            </Col>
                            <Col xs="auto">
                              <Link to={`detail-bab/${pelajaran.id}`}>
                                <Button color="info" className="float-right">
                                  mulai belajar
                                </Button>
                              </Link>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  );
                })
              : loaderListMateri()}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ListMateri;
