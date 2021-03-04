// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";

import React, { useState } from "react";
import axios from "axios";
import Spinner from "reactstrap/lib/Spinner";
import { useAlert } from "react-alert";
import { API_URL } from "utils/constants";

export default function SignUpPage() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const alert = useAlert();

  const required = (value) => {
    if (!value.toString().trim().length) {
      // We can return string or jsx as the 'error' prop for the validated Component
      return "require";
    }
  };

  let bodyFormData = new FormData();
  bodyFormData.set("name", name);
  bodyFormData.set("email", email);
  bodyFormData.set("password", password);
  bodyFormData.set("role", "teacher");

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
          <div className="notif">
            Registrasi Berhasil, silahkan Cek Email anda
          </div>
        );
      })
      .catch(function (error) {
        setLoggedIn(false);
        alert.error(<div className="notif">{error.response.data.message}</div>);
      });

    e.preventDefault();
  };

  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  return (
    <>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/header2.jpg") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="6" xl="4">
              <Card className="card-login card-plain">
                <Form className="form" onSubmit={handleSubmit}>
                  <CardHeader className="text-center">
                    <h2>Daftar Akun</h2>
                    <h6 className="text-lowercase font-weight-normal">
                      dartar akunmu sekarang juga!
                    </h6>
                  </CardHeader>
                  <CardBody>
                    <InputGroup className={"no-border input-md"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        validations={[required]}
                        placeholder="Nama"
                        type="text"
                        onInput={(e) => setName(e.target.value)}
                        autofocus
                      ></Input>
                    </InputGroup>
                    <InputGroup className={"no-border input-md"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        validations={[required]}
                        placeholder="Email"
                        type="email"
                        onInput={(e) => setEmail(e.target.value)}
                        autofocus
                      ></Input>
                    </InputGroup>
                    <InputGroup className={"no-border input-md"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_lock-circle-open"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        validations={[required]}
                        placeholder="Password"
                        type="password"
                        onInput={(e) => setPassword(e.target.value)}
                        autofocus
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    {loggedIn === true ? (
                      <Spinner></Spinner>
                    ) : (
                      <Button
                        block
                        className="btn-round"
                        color="info"
                        // onClick={(e) => e.preventDefault()}
                        size="md"
                      >
                        Daftar
                      </Button>
                    )}
                    <p>
                      <a
                        className="link"
                        href="/"
                        // onClick={(e) => e.preventDefault()}
                      >
                        Sudah Punya Akun? Login
                      </a>
                    </p>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}
