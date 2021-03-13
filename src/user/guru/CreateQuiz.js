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
import BackComponent from "../../utils/BackComponent";
import BackButton from "../../utils/BackComponent";

export default function CreateQuiz() {
  const history = useHistory();
  const alert = useAlert();
  const guru = localStorage.getItem("token");
  const guruToken = JSON.parse(guru);
  const access_token = guruToken?.token?.token;
  const userId = guruToken?.user?.id;

  const [valButton, setValB] = useState("Pilih Kelas");
  const [listLesson, setListLesson] = useState();
  const [pelajaran, setPel] = useState();
  const [lessonId, setLessonId] = useState();
  const [answer, setAnswer] = useState(["awal"]);
  const [answerOption, setAnswerOption] = useState("");
  const [questionQ, setQuestionQ] = useState("");

  const [listQuiz, setListQuiz] = useState();
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
        console.log(message);
      });
  }

  React.useEffect(() => {
    setLoad(true);
    fetchData();
    // eslint-disable-next-line
  }, []);

  let filterListL = listLesson?.filter(function (listL) {
    // eslint-disable-next-line
    return listL.user_id == userId;
  });

  console.log("pel", pelajaran);
  console.log("ques", questionQ);
  console.log("ans", answer);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoggedIn(true);

    if (pelajaran === "") {
      setLoggedIn(false);
      return alert.error(
        <div className="notif">Pilih Kelas Terlebih Dahulu</div>
      );
    }

    let jsonAns = JSON.stringify(answer);

    axios({
      method: "post",
      url: `${API_URL}quiz`,
      data: {
        lesson_id: lessonId,
        pelajaran: pelajaran,
        question_text: questionQ,
        answer_options: jsonAns,
      },
      headers: {
        ContentType: "multipart/form-data",
        Accept: "application/json",
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
      .catch(function (error) {
        setLoggedIn(false);
        alert.error(<div className="notif">Gagal membuat Jawaban Quiz</div>);
        console.log(error.response);
      });
  };

  const handleTambah = () => {
    setAnswer([...answer, answerOption]);
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
            <BackButton />
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
                          filterListL?.length === 0 ? (
                            <DropdownItem text className="text-danger" disabled>
                              Buat Kelas Terlebih Dahulu
                            </DropdownItem>
                          ) : (
                            filterListL?.map((list, index) => {
                              return (
                                <DropdownItem
                                  key={index}
                                  checked={pelajaran === list.pelajaran}
                                  value={list.pelajaran}
                                  onClick={() => {
                                    setPel(list.pelajaran);
                                    setLessonId(list.id);
                                    setValB(list.pelajaran);
                                  }}
                                >
                                  {list.pelajaran}
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
                <Col lg="5" sm="10">
                  <FormGroup>
                    <Label>Soal Quiz</Label>
                    <Input
                      required
                      oninvalid="Judul Materi Harus di isi"
                      onvalid="this.setCustomValidity('')"
                      placeholder="Soal Quiz"
                      type="text"
                      onInput={(e) => setQuestionQ(e.target.value)}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg="5" sm="10">
                  {answer.map((list, index) => (
                    <ul>
                      <li key={index}>
                        <Input
                          name={list}
                          placeholder="Jawaban"
                          onInput={(e) => setAnswerOption(e.target.value)}
                          type="text"
                        ></Input>
                      </li>
                    </ul>
                  ))}
                  <Button onClick={handleTambah}>Tambah</Button>
                </Col>
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
