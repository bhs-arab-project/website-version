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
import TransparentFooter from "components/Footers/TransparentFooter";
import BackComponent from "./CRUDLesson/BackComponent";

export default function CreateQuiz() {
  const history = useHistory();
  const alert = useAlert();
  const guru = localStorage.getItem("token");
  const guruToken = JSON.parse(guru);
  const access_token = guruToken?.token?.token;

  const [valButton, setValB] = useState("Pilih Kelas");
  const [quizId, setQuizId] = useState();
  const [answer, setAnswer] = useState(["awal"]);
  const [answerOption, setAnswerOption] = useState("");

  const [listQuiz, setListQuiz] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [load, setLoad] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  async function fetchData() {
    axios
      .get(`${API_URL}quiz`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setLoad(false);
        setListQuiz(response.data);
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

  // let bodyFormData = new FormData();
  // answer.forEach((item) => {
  //   bodyFormData.append("answer_option[]", item);
  // });

  // for (var pair of bodyFormData.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  const handleSubmit = async (e) => {
    setLoggedIn(true);

    axios({
      method: "post",
      url: `${API_URL}quiz/${quizId}`,
      data: answer,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/x-www-form-urlencoded",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then(function (response) {
        setLoggedIn(false);
        alert.success(
          <div className="notif">Berhasil membuat Jawaban Quiz!</div>
        );
        history.push("/");
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        setLoggedIn(false);
        alert.error(<div className="notif">Gagal membuat Jawaban Quiz</div>);
        console.log(response.data);
      });

    e.preventDefault();
  };

  const handleAnswer = () => {
    setAnswer([...answer, answerOption]);
  };

  console.log("id", quizId);

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
                          listQuiz?.length === 0 ? (
                            <DropdownItem text className="text-danger" disabled>
                              Buat Pertanyaan Terlebih Dahulu
                            </DropdownItem>
                          ) : (
                            listQuiz?.map((list, index) => {
                              return (
                                <DropdownItem
                                  key={index}
                                  checked={quizId === list.id}
                                  value={list.id}
                                  onClick={() => {
                                    setQuizId(list.id);
                                    setValB(list.question_text);
                                  }}
                                >
                                  {list.question_text}
                                </DropdownItem>
                              );
                            })
                          )
                        ) : (
                          <DropdownItem text disabled>
                            Loading...
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                    <span className="text-xs text-info">
                      *anda hanya bisa memilih kelas yang anda buat
                    </span>
                  </FormGroup>
                </Col>
                {/* <Col lg="5" sm="10">
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
                </Col> */}
                <Button onClick={handleAnswer}>Tambah</Button>
                {answer.map((list, index) => (
                  <span key={index}>
                    <Input
                      name={list}
                      placeholder="Jawaban"
                      onInput={(e) => setAnswerOption(e.target.value)}
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
