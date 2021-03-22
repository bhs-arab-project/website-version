import DetailHeader from "components/Headers/DetailHeader";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useForm } from "react-hook-form";

// reactstrap components
import {
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
import { useAlert } from "react-alert";
import TransparentFooter from "components/Footers/TransparentFooter";
import BackButton from "../../../utils/BackComponent";
import { useParams } from "react-router";

export default function EditSoalQuiz(props) {
  let { id } = useParams();
  const alert = useAlert();
  const { token, userId } = props;

  const [valButton, setValB] = useState("Pilih Kelas");
  const [listLesson, setListLesson] = useState();
  const [pelajaran, setPel] = useState();
  const [lessonId, setLessonId] = useState("");
  const [questionQ, setQuestionQ] = useState("");

  const [load, setLoad] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  async function fetchQuest() {
    axios
      .get(`${API_URL}quiz/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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

  async function fetchData() {
    axios
      .get(`${API_URL}pelajaran`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
    setLoad(false);
    fetchData();
    fetchQuest();
    // eslint-disable-next-line
  }, []);

  let filterListL = listLesson?.filter(function (listL) {
    // eslint-disable-next-line
    return listL.user_id == userId;
  });

  const [indexes, setIndexes] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setLoad(true);

    console.log(lessonId);
    let jsonAns = JSON.stringify(data);

    if (lessonId === "") {
      setLoad(false);

      alert.error(<div className="notif">Pilih Kelas Terlebih Dahulu</div>);
      return false;
    } else if (indexes.length < 2) {
      setLoad(false);

      alert.error(<div className="notif">Isi Opsi Jawaban Minimal 2</div>);
      return false;
    }

    axios({
      method: "post",
      url: `${API_URL}quiz`,
      data: {
        user_id: userId,
        lesson_id: lessonId,
        pelajaran: pelajaran,
        question_text: questionQ,
        answer_options: jsonAns,
      },
      headers: {
        ContentType: "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        setLoad(false);
        alert.success(<div className="notif">Berhasil membuat Soal Quiz!</div>);
        //handle success
        console.log(response);
      })
      .then(() => {
        document.getElementById("idForm").reset();
      })
      .catch(function (error) {
        setLoad(false);

        alert.error(<div className="notif">Gagal membuat Soal Quiz</div>);
        console.log(error.response);
      });
  };

  console.log("indexes", indexes);
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
          <div className="mt-2">
            <BackButton />
            <h2>Buat Soal</h2>
            <hr />
            <Form
              className="form"
              onSubmit={handleSubmit(onSubmit)}
              id="idForm"
            >
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
                <Col lg="7" sm="10">
                  <FormGroup>
                    <Label>Soal Quiz</Label>
                    <Input
                      required
                      placeholder="Soal Quiz"
                      type="text"
                      onInput={(e) => setQuestionQ(e.target.value)}
                    ></Input>
                  </FormGroup>
                  {indexes.map((index) => {
                    const fieldName = `list[${index}]`;
                    return (
                      <fieldset name={fieldName} key={index}>
                        <FormGroup>
                          {" "}
                          <label
                            className={
                              fieldName === "list[0]"
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {fieldName === "list[0]"
                              ? "Isi Jawaban Benar"
                              : "Isi Jawaban Salah"}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name={`${fieldName}.answerText`}
                            ref={register}
                          />
                        </FormGroup>
                        <input
                          hidden
                          name={`${fieldName}.isCorrect`}
                          ref={register}
                        />
                      </fieldset>
                    );
                  })}

                  {load === true ? (
                    <Spinner></Spinner>
                  ) : (
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  )}
                </Col>
              </Row>
            </Form>
          </div>
        </Container>
      </div>
      <TransparentFooter />
    </>
  );
}
