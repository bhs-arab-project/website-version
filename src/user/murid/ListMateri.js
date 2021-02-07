import React, { Component } from "react";

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

export default class ListMateri extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "pelajaran")
      .then((res) => {
        const list = res.data;
        this.setState({ list });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    console.log("list", this.state.list);
    const { list } = this.state;
    return (
      <div>
        <div className="section section-tabs">
          <Container>
            <h2>Mulai belajar - ابدا بالتعلم</h2>
            <Row className="d-flex justify-space-between">
              {list &&
                list.map((pelajaran) => (
                  <Col md="6" xl="4" key={pelajaran.id}>
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
                            <span> : {pelajaran.jumlah_materi} Materi</span>
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
                ))}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
