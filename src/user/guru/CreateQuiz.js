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
import { Tooltip } from "reactstrap";
import TransparentFooter from "components/Footers/TransparentFooter";
import BackComponent from "./CRUDLesson/BackComponent";

export default function CreateQuiz() {
  const history = useHistory();
  const alert = useAlert();
  const guru = localStorage.getItem("token");
  const guruToken = JSON.parse(guru);
  const access_token = guruToken?.token?.token;

  const [valButton, setValB] = useState("Pilih Kelas");
  const [questionText, setQuestionT] = useState();
  const [lessonId, setLessonId] = useState();
  const [lesson, setLesson] = useState();
  const [answer, setAnswer] = useState(["test"]);

  const [listLesson, setListLesson] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [load, setLoad] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

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
        console.log(message);
      });
  }

  React.useEffect(() => {
    setLoad(true);
    fetchData();
    // eslint-disable-next-line
  }, []);

  let bodyFormData = new FormData();
  bodyFormData.set("lesson_id", lessonId);
  bodyFormData.set("pelajaran", lesson);
  bodyFormData.set("question_text", questionText);

  for (var pair of bodyFormData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  const handleSubmit = async (e) => {
    setLoggedIn(true);

    axios({
      method: "post",
      url: `${API_URL}quiz`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then(function (response) {
        setLoggedIn(false);
        alert.success(<div className="notif">Berhasil membuat Soal Quiz!</div>);
        history.push("/");
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        setLoggedIn(false);
        alert.error(
          <div className="notif">Gagal membuat Soal Quiz {response}</div>
        );
        console.log(response);
      });

    e.preventDefault();
  };

  const handleAnswer = () => {
    setAnswer([...answer, 1]);
  };

  return (
    <>
      <DetailHeader
        header="Buat Quiz"
        subHeader="buat Quiz yang anda inginkan sekarang!"
        img={require("assets/img/my-babex.jpg")}
      />
      <div className="section ">
        <Container>
          <br />
          <div clasName="mt-2">
            <BackComponent />
            <h2>Buat Soal</h2>
            <hr />
            <Form className="form" onSubmit={handleSubmit}>
              <Row>
                <Col lg="4" sm="10">
                  <FormGroup>
                    <Label>Pilih Kelas</Label>
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
                                  setLesson(list.pelajaran);
                                }}
                              >
                                {list.pelajaran}
                              </DropdownItem>
                            ) : (
                              <div>
                                <div id="DisabledAutoHideExample">
                                  <DropdownItem
                                    className="text-danger"
                                    disabled
                                  >
                                    {list.pelajaran}
                                  </DropdownItem>
                                </div>
                                {/* <p>Somewhere in here is a <span style={{textDecoration: "underline", color:"blue"}} href="#" id="TooltipExample">tooltip</span>.</p> */}
                                <Tooltip
                                  placement="right"
                                  isOpen={tooltipOpen}
                                  target="DisabledAutoHideExample"
                                  toggle={toggleTooltip}
                                  className="text-danger"
                                >
                                  Bukan Kelas Anda
                                </Tooltip>
                              </div>
                            );
                          })
                        ) : (
                          <DropdownItem text>Loading...</DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                    <span className="text-xs text-info">
                      *anda hanya bisa memilih kelas yang anda buat
                    </span>
                  </FormGroup>
                </Col>
                <Col lg="5" sm="10">
                  <FormGroup>
                    <Label>Soal Quiz</Label>
                    <Input
                      required
                      oninvalid="Judul Materi Harus di isi"
                      onvalid="this.setCustomValidity('')"
                      placeholder="Soal Quiz"
                      type="text"
                      onInput={(e) => setQuestionT(e.target.value)}
                    ></Input>
                  </FormGroup>
                  <Button onClick={handleAnswer}>Tambah</Button>
                </Col>
                {answer.map((list, index) => (
                  <span key={index}>
                    <Input
                      required
                      name={list}
                      placeholder="Jawaban"
                      type="text"
                    ></Input>
                  </span>
                ))}
              </Row>

              <div>
                {loggedIn === true ? (
                  <div className="float-right">
                    <Spinner></Spinner>
                  </div>
                ) : (
                  <Button
                    className="btn-round float-right"
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
