import React, { useState } from "react";

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  Label,
  Input,
  Spinner,
  FormGroup,
  Form,
} from "reactstrap";

// core components
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import IndexNavbar from "components/Navbars/IndexNavbar";
import TransparentFooter from "components/Footers/TransparentFooter";
import axios from "axios";
import { API_URL } from "utils/constants";
import { useAlert } from "react-alert";
import { ChangePassForm } from "../auth/ChangePassForm";
import BackButton from "../utils/BackComponent";

function ProfilePage(props) {
  const { role, name, emailUser, token, id } = props;
  const alert = useAlert();

  const [typeList, setTypeList] = React.useState("editProfile");
  const [load, setLoad] = useState(false);
  const [nama, setNama] = useState(name);
  const [nameOnHeader, setNameH] = useState("");
  const [email, setEmail] = useState(emailUser);

  function fetchData() {
    axios
      .get(`${API_URL}user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoad(false);
        setNameH(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        let message = error.response;
        console.log(message);
      });
  }

  React.useEffect(() => {
    fetchData();

    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);

    axios({
      method: "put",
      url: `${API_URL}user/${id}`,
      data: {
        name: nama,
        email: email,
        role: role,
      },
      headers: {
        ContentType: "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        setLoad(false);
        let dataUser = response.data;
        let jsonUser = JSON.stringify(dataUser);
        // setToken(dataUser);
        localStorage.setItem("token", jsonUser);
        alert.success(<div className="notif">Berhasil mengedit Profil!</div>);
      })
      .then(() => {
        fetchData();
      })
      .catch(function (error) {
        setLoad(false);
        alert.error(
          <div className="notif">Gagal mengedit Profil Silahkan Coba Lagi</div>
        );
        console.log(error);
      });

    e.preventDefault();
  };

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <ProfilePageHeader name={nameOnHeader?.success?.name} roleUser={role} />
        <div className="section">
          <Container>
            <BackButton />
            <button
              type="button"
              className={`btn ${
                typeList === "editProfile" ? "btn-info" : "btn-outline-info"
              }`}
              onClick={(e) => setTypeList("editProfile")}
            >
              <i className="now-ui-icons ow-ui-icons travel_info"></i> Edit
              Profil
            </button>
            <button
              type="button"
              className={`btn ${
                typeList === "editProfile" ? "btn-outline-info" : "btn-info"
              }`}
              onClick={(e) => setTypeList("changePass")}
            >
              <i className="now-ui-icons ow-ui-icons travel_info"></i> Ubah
              Password
            </button>
            <br />
            {(() => {
              // eslint-disable-next-line
              switch (typeList) {
                case "editProfile":
                  return (
                    <div clasName="mt-2">
                      <h2>Edit Profil Saya</h2>
                      <hr />
                      <Form className="form" onSubmit={handleSubmit}>
                        <Row>
                          <Col lg="5" sm="10">
                            <FormGroup>
                              <Label>Nama</Label>
                              <Input
                                defaultValue={name}
                                placeholder="Nama"
                                type="text"
                                onInput={(e) => setNama(e.target.value)}
                              ></Input>
                            </FormGroup>
                          </Col>
                          <Col lg="5" sm="10">
                            <FormGroup>
                              <Label>Email</Label>
                              <Input
                                disabled
                                defaultValue={emailUser}
                                placeholder="Email"
                                type="email"
                                onInput={(e) => setEmail(e.target.value)}
                              ></Input>
                            </FormGroup>
                          </Col>
                        </Row>

                        <div>
                          {load === true ? (
                            <div className="float-right">
                              <Spinner></Spinner>
                            </div>
                          ) : (
                            <Button
                              className="btn-round float-right"
                              color="info"
                              size="md"
                            >
                              Submit
                            </Button>
                          )}
                        </div>
                      </Form>
                    </div>
                  );
                case "changePass":
                  return <ChangePassForm token={token} />;
              }
            })()}
          </Container>
          {role === "user" ? (
            <Container>
              <h2>Sertifikat</h2>
              <Row>
                <Col md="6" xl="4">
                  <div className="media">
                    <img
                      width="35%"
                      alt="..."
                      className="rounded align-self-center mr-3"
                      src={require("assets/img/cert-icon.png")}
                    ></img>
                    <div className="media-body mt-2">
                      <h5>Nahwu</h5>
                      <div className="date">Lulus : 18 April, 2020</div>
                      <div className="download">
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
                  <div className="media">
                    <img
                      width="35%"
                      alt="..."
                      className="rounded align-self-center mr-3"
                      src={require("assets/img/cert-icon.png")}
                    ></img>
                    <div className="media-body mt-2">
                      <h5>Nahwu</h5>
                      <div className="date">Lulus : 18 April, 2020</div>
                      <div className="download">
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
                  <div className="media">
                    <img
                      width="35%"
                      alt="..."
                      className="rounded align-self-center mr-3"
                      src={require("assets/img/cert-icon.png")}
                    ></img>
                    <div className="media-body mt-2">
                      <h5>Nahwu</h5>
                      <div className="date">Lulus : 18 April, 2020</div>
                      <div className="download">
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
                  <div className="media">
                    <img
                      width="35%"
                      alt="..."
                      className="rounded align-self-center mr-3"
                      src={require("assets/img/cert-icon.png")}
                    ></img>
                    <div className="media-body mt-2">
                      <h5>Nahwu</h5>
                      <div className="date">Lulus : 18 April, 2020</div>
                      <div className="download">
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
          ) : (
            <span></span>
          )}
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default ProfilePage;
