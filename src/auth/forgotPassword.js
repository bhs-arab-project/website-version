import React, { useState } from "react";
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
import { useAlert } from "react-alert";
import axios from "axios";
import { API_URL } from "utils/constants";
import Spinner from "reactstrap/lib/Spinner";

function LoginPage() {
  const [email, setEmail] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const alert = useAlert();

  let bodyFormData = new FormData();
  bodyFormData.set("email", email);

  // for (var pair of bodyFormData.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  const handleSubmit = async (e) => {
    setLoggedIn(true);

    axios({
      method: "post",
      url: `${API_URL}forgot-password`,
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        setLoggedIn(false);

        alert.success(
          <div className="notif">Terkirim!, Silahkan Cek Email Kamu</div>
        );

        //handle success
        console.log(response);
      })
      .catch(function (response) {
        setLoggedIn(false);
        console.log("error", response);
        if (response === "Error: Network Error at createError") {
          alert.error(
            <div className="notif">Tidak ada koneksi internet, coba lagi</div>
          );
        } else if (response === "Error: Request failed with status code 404") {
          alert.error(
            <div className="notif">
              Gagal Mengirim, silahkan coba lagi, 404 error
            </div>
          );
        }
        // alert.error(<div className="notif">Gagal Registrasi</div>);
      });

    e.preventDefault();
  };
  const [firstFocus, setFirstFocus] = React.useState(false);
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
                <Form action="" className="form" onSubmit={handleSubmit}>
                  <CardHeader className="text-center">
                    <h2>Lupa Password?</h2>
                    <h6 className="text-lowercase font-weight-normal">
                      Masukan Email Kamu di sini
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
                        placeholder="Email"
                        type="email"
                        onInput={(e) => setEmail(e.target.value)}
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
                        size="md"
                      >
                        Kirim
                      </Button>
                    )}
                    <p>
                      <a className="link" href="/">
                        Kembali Ke Login
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

export default LoginPage;
