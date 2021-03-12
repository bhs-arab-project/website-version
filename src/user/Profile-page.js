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
import BackComponent from "./guru/CRUDLesson/BackComponent";
import axios from "axios";
import { API_URL } from "utils/constants";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { ChangePassForm } from "./ChangePassForm";

function ProfilePage() {
  const history = useHistory();
  const alert = useAlert();
  const user = localStorage.getItem("token");
  const userJson = JSON.parse(user);
  const roleUser = userJson?.user?.role;
  const userName = userJson?.user?.name;
  const userEmail = userJson?.user?.email;
  const access_token = userJson?.token?.token;
  const id = userJson?.user?.id;
  let [typeList, setTypeList] = React.useState("editProfile");
  const [load, setLoad] = useState(false);
  const [nama, setNama] = useState(userName);
  const [email, setEmail] = useState(userEmail);

  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
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
        role: roleUser,
      },
      headers: {
        ContentType: "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then(function (response) {
        setLoad(false);
        let dataUser = response.data;
        let jsonUser = JSON.stringify(dataUser);
        // setToken(dataUser);
        localStorage.setItem("token", jsonUser);
        alert.success(<div className="notif">Berhasil mengedit Profil!</div>);
        history.push("/");

        //handle success
        // console.log(jsonUser);
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
        <ProfilePageHeader name={userName} roleUser={roleUser} />
        <div className="section">
          <Container>
            <BackComponent />
            <Button color="info" onClick={(e) => setTypeList("editProfile")}>
              <i className="now-ui-icons ow-ui-icons travel_info"></i>
              Edit Profil
            </Button>
            <Button color="success" onClick={(e) => setTypeList("changePass")}>
              <i className="now-ui-icons ow-ui-icons travel_info"></i>
              Ubah Password
            </Button>
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
                                defaultValue={userName}
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
                                defaultValue={userEmail}
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
                  return <ChangePassForm />;
              }
            })()}
          </Container>
          {roleUser === user ? (
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
