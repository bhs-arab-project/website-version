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
  Card,
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
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
defineLordIconElement(loadAnimation);

function ProfilePage(props) {
  const { role, name, emailUser, token, id } = props;
  const alert = useAlert();

  const [typeList, setTypeList] = React.useState("editProfile");
  const [load, setLoad] = useState(false);
  const [nama, setNama] = useState(name);
  const [nameOnHeader, setNameH] = useState("");
  const [email, setEmail] = useState(emailUser);
  const [confDel, setconfDel] = useState("");

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

  const handleDeleteItSelf = async (e) => {
    e.preventDefault();

    if (
      RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(confDel) === false
    ) {
      alert.error(<div className="notif">Isi Email Yang Valid</div>);
      return false;
    }

    if (confDel !== email) {
      alert.error(
        <div className="notif">Email Tidak cocok dengan email anda</div>
      );
      return false;
    }

    if (confDel === "") {
      alert.error(<div className="notif">Isi Email Terlebih Dahulu</div>);
      return false;
    }

    setLoad(true);

    axios({
      method: "delete",
      url: `${API_URL}user/${id}`,

      headers: {
        ContentType: "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        setLoad(false);
        localStorage.removeItem("token");
        window.location.href = "/";
        alert.success(<div className="notif">Berhasil Menghapus Profil!</div>);
      })
      .catch(function (error) {
        setLoad(false);
        alert.error(
          <div className="notif">Gagal Menghapus Profil Silahkan Coba Lagi</div>
        );
        console.log(error);
      });
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
              className={`ml-2 btn ${
                typeList === "editProfile" ? "btn-info" : "btn-outline-info"
              }`}
              onClick={(e) => setTypeList("editProfile")}
            >
              <i className="now-ui-icons ow-ui-icons travel_info"></i> Edit
              Profil
            </button>
            <button
              type="button"
              className={`btn ml-2 ${
                typeList === "changePass" ? "btn-info" : "btn-outline-info"
              }`}
              onClick={(e) => setTypeList("changePass")}
            >
              <i className="now-ui-icons ow-ui-icons travel_info"></i> Ubah
              Password
            </button>
            <button
              type="button"
              className={`btn ml-2 ${
                typeList === "deleteItSelf"
                  ? "btn-danger"
                  : "btn-outline-danger"
              }`}
              onClick={(e) => setTypeList("deleteItSelf")}
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Hapus Akun Saya
            </button>

            {/* modal */}
            <div
              class="modal fade"
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <Form onSubmit={handleDeleteItSelf}>
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        class="modal-title text-danger"
                        id="exampleModalLongTitle"
                      >
                        Menghapus Akun
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <p className="font-weight-normal">
                        Menghapus akun dapat mengakibatkan terhapusnya{" "}
                        {role === "teacher" ? (
                          <>
                            seluruh data yang ada di akun ini, termasuk Kelas,
                            Materi dan Quiz yang Anda buat{" "}
                          </>
                        ) : (
                          <>Sertifikat</>
                        )}
                        . Jika anda ingin menghapus akun ini, silahkan ketik
                        email anda untuk konfirmasi.{" "}
                      </p>
                      <FormGroup>
                        <Label>Email</Label>
                        <Input
                          placeholder="Email"
                          type="email"
                          onInput={(e) => setconfDel(e.target.value)}
                        ></Input>
                      </FormGroup>
                      {RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(
                        confDel
                      ) === false ? (
                        <span className="text-danger">
                          Masukkan Email Yang Valid
                        </span>
                      ) : confDel !== emailUser ? (
                        <span className="text-danger">
                          Email tidak cocok dengan email anda
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-info"
                        data-dismiss="modal"
                      >
                        Batalkan
                      </button>
                      {load === true ? (
                        <Spinner></Spinner>
                      ) : (
                        <button type="submit" class="btn btn-danger">
                          Hapus Akun
                        </button>
                      )}
                    </div>
                  </div>
                </Form>
              </div>
            </div>
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
                            <div className="text-right">
                              <lord-icon
                                trigger="loop"
                                src="/loader.json"
                              ></lord-icon>
                            </div>
                          ) : (
                            <div className="text-right">
                              <Button
                                className="btn-round"
                                color="info"
                                size="md"
                              >
                                Submit
                              </Button>
                            </div>
                          )}
                        </div>
                      </Form>
                    </div>
                  );
                case "changePass":
                  return <ChangePassForm token={token} />;
              }
            })()}
            <hr />
          </Container>
          {role === "user" ? (
            <Container>
              <h2>Sertifikat</h2>
              <Row>
                <Col md="6" xl="4">
                  <Card>
                    <div className="media p-2">
                      <img
                        width="30%"
                        alt="..."
                        className="rounded align-self-center mr-3 ml-2"
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
                  </Card>
                </Col>
                <Col md="6" xl="4">
                  <Card>
                    <div className="media p-2">
                      <img
                        width="30%"
                        alt="..."
                        className="rounded align-self-center mr-3 ml-2"
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
                  </Card>
                </Col>
                <Col md="6" xl="4">
                  <Card>
                    <div className="media p-2">
                      <img
                        width="30%"
                        alt="..."
                        className="rounded align-self-center mr-3 ml-2"
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
                  </Card>
                </Col>
                <Col md="6" xl="4">
                  <Card>
                    <div className="media p-2">
                      <img
                        width="30%"
                        alt="..."
                        className="rounded align-self-center mr-3 ml-2"
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
                  </Card>
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
