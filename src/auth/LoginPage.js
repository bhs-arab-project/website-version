import React, { useState } from "react";
import PropTypes from "prop-types";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";
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
import Spinner from "reactstrap/lib/Spinner";
import { API_URL } from "utils/constants";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

export default function LoginPage({ setToken }) {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loggedIn, setLoggedIn] = useState();

  const history = useHistory();

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

  async function loginUser(credentials) {
    return fetch(`${API_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const submitH = async (e) => {
    e.preventDefault();
    setLoggedIn("logging in");
    const token = await loginUser({
      email,
      password,
    });

    if (token?.message === "Email dan Password salah") {
      console.log("salah");
      swal({
        title: "Gagal Login",
        text: "Password atau Email Salah!",
        icon: "error",
        timer: 2000,
        button: false,
      });
      setLoggedIn();
      return false;
    } else if (token?.message === "Tolong konfirmasi email kamu di mail box!") {
      console.log("salah");
      swal({
        title: "Gagal Login",
        text: "Silahkan Konfirmasi Email Kamu di Mail Box!",
        icon: "error",
        timer: 2000,
        button: false,
      });
      setLoggedIn();
      return false;
    } else {
      setToken(token);
    }
  };

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
                <Form action="" className="form" method="" onSubmit={submitH}>
                  <CardHeader className="text-center">
                    <h2>Masuk</h2>
                    <h6 className="text-capitalize font-weight-normal">
                      Masuk Untuk Belajar Bahasa Arab Online Gratis!
                    </h6>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-md" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        onInput={(e) => setEmail(e.target.value)}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-md" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_lock-circle-open"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        onInput={(e) => setPassword(e.target.value)}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                        required
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    {loggedIn === "logging in" ? (
                      <Spinner></Spinner>
                    ) : (
                      <Button
                        block
                        className="btn-round"
                        color="info"
                        // onClick={(e) => e.preventDefault()}
                        size="md"
                      >
                        Masuk
                      </Button>
                    )}
                    <p>
                      <a href="/sign-up" className="link">
                        Daftar disini
                      </a>
                    </p>
                    <p>
                      <a className="link" href="/forgot-password">
                        Lupa Password ?
                      </a>
                    </p>
                    {/* <div className="pull-left"></div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Need Help?
                        </a>
                      </h6>
                    </div> */}
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
          <TransparentFooter />
        </div>
      </div>
    </>
  );
}
LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired,
};
