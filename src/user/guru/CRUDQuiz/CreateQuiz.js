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

export default function CreateQuiz(props) {
  const alert = useAlert();
  const { token, userId } = props;

  const [valButton, setValB] = useState("Pilih Kelas");
  const [listLesson, setListLesson] = useState();
  const [pelajaran, setPel] = useState();
  const [lessonId, setLessonId] = useState("");
  const [questionQ, setQuestionQ] = useState("");

  // const [listQuiz, setListQuiz] = useState();
  const [load, setLoad] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

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

    let jsonAns = JSON.stringify(data);

    if (lessonId === "") {
      setLoad(false);

      alert.error(<div className="notif">Pilih Kelas Terlebih Dahulu</div>);
      return false;
    } else if (indexes.length < 2) {
      setLoad(false);

      alert.error(<div className="notif">Isi Opsi Jawaban Minimal 2</div>);
      return false;
    } else if (
      data.list[0]?.answerText === "" ||
      data.list[1]?.answerText === "" ||
      data.list[2]?.answerText === ""
    ) {
      setLoad(false);

      alert.error(<div className="notif">Isi Bagian Yang Kosong!</div>);
      return false;
    } else if (
      data.list[0]?.isCorrect === null ||
      data.list[1]?.isCorrect === null ||
      data.list[2]?.isCorrect === null
    ) {
      setLoad(false);

      alert.error(
        <div className="notif">Pilih Jawaban Yang Benar dan salah!</div>
      );
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
        fetchData();
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

  const addOptionQ = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeOptionQ = (index) => () => {
    setIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    setCounter((prevCounter) => prevCounter - 1);
  };

  const clearOptionQ = () => {
    setIndexes([]);
    setCounter(0);
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
                        <label>
                          Opsi Jawaban
                          <input
                            type="text"
                            className="form-control"
                            name={`${fieldName}.answerText`}
                            ref={register}
                          />
                        </label>

                        <label className="ml-2">
                          <input
                            className="mr-1"
                            type="radio"
                            value="true"
                            name={`${fieldName}.isCorrect`}
                            ref={register}
                          />
                          Jawaban Benar
                        </label>
                        <label className="ml-2 mr-2">
                          <input
                            className="mr-1"
                            type="radio"
                            value="false"
                            name={`${fieldName}.isCorrect`}
                            ref={register}
                          />
                          Jawaban Salah
                        </label>
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={removeOptionQ(index)}
                        >
                          <i className="now-ui-icons ui-1_simple-remove"></i>
                        </button>
                      </fieldset>
                    );
                  })}

                  {indexes.length === 3 ? (
                    <>
                      <span className="text-danger">
                        *Kamu Hanya Bisa Membuat Maksimal 3 Opsi Jawaban
                      </span>
                      <br />
                      <button disabled className="not-allowed btn btn-info">
                        Tambah Opsi Jawaban
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={addOptionQ}
                    >
                      Tambah Opsi Jawaban
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={clearOptionQ}
                  >
                    Hapus Semua Opsi Jawaban
                  </button>
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
