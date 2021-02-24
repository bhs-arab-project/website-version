import DefaultFooter from "components/Footers/DefaultFooter";
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Spinner from "reactstrap/lib/Spinner";
import { API_URL } from "utils/constants";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

export default function CreateMateri() {
  const history = useHistory();
  const alert = useAlert();
  const guru = sessionStorage.getItem("token");
  const guruToken = JSON.parse(guru);
  const access_token = guruToken?.token?.token;

  const [valButton, setValB] = useState("Pilih Pelajaran");
  const [judulMateri, setJudulMateri] = useState();
  const [materi, setMateri] = useState();
  const [lessonId, setLessonId] = useState();
  const [listLesson, setListLesson] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [load, setLoad] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  async function fetchData() {
    axios
      .get(`${API_URL}pelajaran`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setLoad(false);
        setListLesson(response.data);
      })
      .catch((error) => {
        let message = error.response;
        console.log(message.data.errors);
      });
  }

  React.useEffect(() => {
    setLoad(true);
    fetchData();
    // eslint-disable-next-line
  }, []);

  let bodyFormData = new FormData();
  bodyFormData.set("lesson_id", lessonId);
  bodyFormData.set("user_id", guruToken?.user?.id);
  bodyFormData.set("judul_bab", judulMateri);
  bodyFormData.set("materi", materi);

  for (var pair of bodyFormData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  const handleSubmit = async (e) => {
    setLoggedIn(true);

    axios({
      method: "post",
      url: `${API_URL}bab`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then(function (response) {
        setLoggedIn(false);
        alert.success(<div className="alertError">Berhasil membuat Bab!</div>);
        history.push("/guru");
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        setLoggedIn(false);
        alert.error(
          <div className="alertError">Gagal membuat Bab Silahkan Coba Lagi</div>
        );
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
          <br />
          <div clasName="mt-2">
            <h2>Buat Materi</h2>
            <hr />
            <Form className="form" onSubmit={handleSubmit}>
              <Row>
                <Col lg="4" sm="10">
                  <FormGroup>
                    <Label>Pilih Pelajaran</Label>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle caret>{valButton}</DropdownToggle>
                      <DropdownMenu>
                        {load === false ? (
                          listLesson?.map((list, index) => {
                            return list.user_id === guruToken?.user?.id ? (
                              <DropdownItem
                                key={index}
                                checked={lessonId === list.id}
                                value={list.id}
                                onClick={() => {
                                  setLessonId(list.id);
                                  setValB(list.pelajaran);
                                }}
                              >
                                {list.pelajaran}
                              </DropdownItem>
                            ) : (
                              <DropdownItem disabled>
                                <span className="text-danger">
                                  {list.pelajaran} (bukan pelajaran anda)
                                </span>
                              </DropdownItem>
                            );
                          })
                        ) : (
                          <DropdownItem text>Loading...</DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                    <span className="text-xs text-info">
                      *anda hanya bisa memilih pelajaran yang anda buat
                    </span>
                  </FormGroup>
                </Col>
                <Col lg="5" sm="10">
                  <FormGroup>
                    <Label>Judul Materi</Label>
                    <Input
                      defaultValue=""
                      placeholder="Judul Materi"
                      type="text"
                      onInput={(e) => setJudulMateri(e.target.value)}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Col>
                <FormGroup>
                  <Label>Materi</Label>
                  <textarea
                    onInput={(e) => setMateri(e.target.value)}
                    class="form-control"
                    rows="10"
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
