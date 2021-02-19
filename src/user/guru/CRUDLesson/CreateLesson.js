import DefaultFooter from "components/Footers/DefaultFooter";
import DetailHeader from "components/Headers/DetailHeader";
import React, { useState } from "react";
import BackComponent from "./BackComponent";
import { Form } from "react-bootstrap";
import axios from "axios";
// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import Spinner from "reactstrap/lib/Spinner";
import { API_URL } from "utils/constants";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

export default function CreateLesson() {
  const history = useHistory();
  const alert = useAlert();
  const guru = sessionStorage.getItem("token");
  const guruToken = JSON.parse(guru);
  const access_token = guruToken?.token?.token;

  const [pelajaran, setPelajaran] = useState();
  const [kesulitan, setKesulitan] = useState("mudah");
  const [deskripsi, setDeskripsi] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  let bodyFormData = new FormData();
  bodyFormData.set("pelajaran", pelajaran);
  bodyFormData.set("tingkatan", kesulitan);
  bodyFormData.set("deskripsi", deskripsi);
  bodyFormData.set("guru", guruToken?.user?.name);
  bodyFormData.set("user_id", JSON.stringify(guruToken?.user?.id));

  for (var pair of bodyFormData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  const handleSubmit = async (e) => {
    setLoggedIn(true);

    axios({
      method: "post",
      url: `${API_URL}pelajaran`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then(function (response) {
        setLoggedIn(false);
        alert.success(
          <div className="alertError">Berhasil membuat pelajaran!</div>
        );
        history.push("/guru");
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        setLoggedIn(false);
        console.log(response);
      });

    e.preventDefault();
  };

  return (
    <>
      <DetailHeader
        header="Buat Pelajaran"
        subHeader="buat pelajaran yang anda inginkan sekarang!"
        img={require("assets/img/my-bab.jpg")}
      />
      <div className="section ">
        <Container>
          <BackComponent />
          <br />
          <div clasName="mt-2">
            <h2>Buat Pelajaran</h2>
            <hr />
            <Form className="form" onSubmit={handleSubmit}>
              <Row>
                <Col lg="5" sm="10">
                  <FormGroup>
                    <Label>Nama Pelajaran</Label>
                    <Input
                      defaultValue=""
                      placeholder="Nama Pelajaran"
                      type="text"
                      onInput={(e) => setPelajaran(e.target.value)}
                    ></Input>
                  </FormGroup>
                </Col>
                <Label>Tingkat Kesulitan : </Label>
                <Row className="mt-4">
                  <FormGroup check className="form-check-radio ">
                    <Label check>
                      <Input
                        defaultValue="option1"
                        type="radio"
                        label="mudah"
                        checked={kesulitan === "mudah"}
                        value="mudah"
                        onClick={() => setKesulitan("mudah")}
                      ></Input>
                      <span className="form-check-sign "></span>
                      Mudah
                    </Label>
                  </FormGroup>
                  <FormGroup check className="form-check-radio ml-2">
                    <Label check>
                      <Input
                        defaultChecked
                        defaultValue="option2"
                        type="radio"
                        label="menengah"
                        checked={kesulitan === "menengah"}
                        value="menengah"
                        onClick={() => setKesulitan("menengah")}
                      ></Input>
                      <span className="form-check-sign"></span>
                      Menengah
                    </Label>
                  </FormGroup>
                  <FormGroup check className="form-check-radio ml-2">
                    <Label check>
                      <Input
                        defaultChecked
                        defaultValue="option2"
                        name="level"
                        type="radio"
                        label="sulit"
                        checked={kesulitan === "sulit"}
                        value="sulit"
                        onClick={() => setKesulitan("sulit")}
                      ></Input>
                      <span className="form-check-sign"></span>
                      Sulit
                    </Label>
                  </FormGroup>
                </Row>
              </Row>
              <Col>
                <FormGroup>
                  <Label>Deskripsi Pelajaran</Label>
                  <textarea
                    onInput={(e) => setDeskripsi(e.target.value)}
                    class="form-control"
                    rows="5"
                  ></textarea>
                </FormGroup>
              </Col>
              <div>
                {loggedIn === true ? (
                  <Spinner></Spinner>
                ) : (
                  <Button
                    className="btn-round"
                    color="info"
                    // onClick={(e) => e.preventDefault()}
                    size="md"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </Container>
      </div>
      <DefaultFooter />
    </>
  );
}
