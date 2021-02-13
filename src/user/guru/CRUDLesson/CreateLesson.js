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

export default function CreateLesson() {
  const guru = sessionStorage.getItem("token");
  const guruToken = JSON.parse(guru);

  const [pelajaran, setPelajaran] = useState();
  const [kesulitan, setKesulitan] = useState("mudah");
  const [deskripsi, setDeskripsi] = useState();
  const [namaGuru, setNamaGuru] = useState();
  const [guruId, setGuruId] = useState();
  const [jumlahMateri, setjumlahMateri] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  let bodyFormData = new FormData();
  bodyFormData.set("pelajaran", pelajaran);
  bodyFormData.set("kesulitan", kesulitan);
  bodyFormData.set("deskripsi", deskripsi);
  bodyFormData.set("guru", namaGuru);
  bodyFormData.set("teacher_id", guruId);
  bodyFormData.set("jumlah_materi", jumlahMateri);

  function handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  console.log("nameGuru", namaGuru);

  const handleSubmit = async (e) => {
    setLoggedIn(true);

    axios({
      method: "post",
      url: "https://data-beta.herokuapp.com/api/pelajaran",
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        setLoggedIn(false);
        window.location = "/guru";
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
          <div>
            <h2>Buat Pelajaran</h2>
            <hr />
            <Form className="form" onSubmit={handleSubmit}>
              <Row>
                <FormGroup>
                  <Input
                    disabled
                    value={(e) => setNamaGuru(guruToken?.user?.name)}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Input
                    hidden
                    type="text"
                    onInput={(e) => setGuruId(e.target.value)}
                    value={guruToken?.user?.id}
                  ></Input>
                </FormGroup>
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
                <Col lg="5" sm="10">
                  <FormGroup>
                    <Label>Jumlah Materi</Label>
                    <Input
                      defaultValue=""
                      placeholder="Jumlah Materi"
                      type="number"
                      onInput={(e) => setjumlahMateri(e.target.value)}
                    ></Input>
                  </FormGroup>
                </Col>
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
