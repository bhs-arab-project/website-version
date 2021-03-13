import DetailHeader from "components/Headers/DetailHeader";
import React, { useState } from "react";
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
import { useAlert } from "react-alert";
import BackComponent from "../../utils/BackComponent";
import TransparentFooter from "components/Footers/TransparentFooter";

export default function CreateTeacher() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const alert = useAlert();

  let bodyFormData = new FormData();
  bodyFormData.set("name", name);
  bodyFormData.set("email", email);
  bodyFormData.set("password", password);
  bodyFormData.set("role", "teacher");

  for (var pair of bodyFormData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  const handleSubmit = async (e) => {
    setLoggedIn(true);

    axios({
      method: "post",
      url: `${API_URL}register`,
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        setLoggedIn(false);
        alert.success(
          <div className="notif">Registrasi Guru Berhasil! Cek Email Guru</div>
        );
        window.location.href = "/#sectionList";
      })
      .catch(function (response) {
        setLoggedIn(false);
        if (response === "Error: Request failed with status code 404") {
          alert.error(
            <div className="notif">
              Gagal Registrasi, silahkan coba lagi, 404 error
            </div>
          );
        } else if (response === "Error: Request failed with status code 500") {
          alert.error(
            <div className="notif">
              Gagal Registrasi, silahkan coba lagi, 500 error
            </div>
          );
        }
        // alert.error(<div className="notif">Gagal Registrasi</div>);
        console.log("error", response);
      });

    e.preventDefault();
  };

  return (
    <>
      <DetailHeader
        header="Registrasi Guru"
        subHeader="Admin bisa mendaftarkan guru baru!"
        img={require("assets/img/my-bab.jpg")}
      />
      <div className="section ">
        <Container>
          <BackComponent />
          <br />
          <div clasName="mt-2">
            <h2>Register Guru</h2>
            <hr />
            <Form className="form" onSubmit={handleSubmit}>
              <Row>
                <Col lg="5" sm="10">
                  <FormGroup>
                    <Label>Nama</Label>
                    <Input
                      placeholder="Nama"
                      type="text"
                      onInput={(e) => setName(e.target.value)}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg="5" sm="10">
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      placeholder="Email"
                      type="email"
                      onInput={(e) => setEmail(e.target.value)}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg="5" sm="10">
                  <FormGroup>
                    <Label>Password</Label>
                    <Input
                      id="pw"
                      placeholder="password"
                      type="password"
                      onInput={(e) => setPassword(e.target.value)}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>

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
      <TransparentFooter />
    </>
  );
}
