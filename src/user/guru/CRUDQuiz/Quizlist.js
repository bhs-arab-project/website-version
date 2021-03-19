import React, { useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import IndexNavbar from "components/Navbars/IndexNavbar";
import { API_URL } from "utils/constants";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BulletList } from "react-content-loader";
import DetailHeader from "components/Headers/DetailHeader";
import Button from "reactstrap/lib/Button";
import swal from "sweetalert";
import TransparentFooter from "components/Footers/TransparentFooter";
import BackButton from "utils/BackComponent";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";

const MyBulletListLoader = () => <BulletList />;

const MyQuizList = (props) => {
  const alert = useAlert();
  let { id } = useParams();
  let [quizL, setQuizList] = React.useState([]);
  const [load, setLoad] = useState(true);
  const [loadSub, setLoadSub] = useState(false);
  const [change, setChange] = useState("list");
  const [singleQ, setSingleQ] = useState([]);
  const [listNum, setListNum] = useState(0);
  const [indexes, setIndexes] = React.useState([]);

  const { token, idUser } = props;

  async function fetchData() {
    axios
      .get(`${API_URL}quiz?cari=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoad(false);
        setQuizList(response.data.data);
        console.log(response.data.data);
      })
      .catch((response) => {
        console.log("errorQ", response);
      });
  }

  function editData(idEdit) {
    axios
      .get(`${API_URL}quiz/${idEdit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoad(false);
        setSingleQ(response.data);
        setIndexes(JSON.parse(response.data[0].answer_options).list);
        console.log("skjsk", indexes);
      })
      .catch((response) => {
        console.log("errorQ", response);
      });
  }

  React.useEffect(() => {
    setLoad(true);
    fetchData();

    // eslint-disable-next-line
  }, [id]);

  const [counter, setCounter] = React.useState(0);
  const [idEdit, setIdEdit] = React.useState(0);
  const { register, handleSubmit } = useForm();

  const [questionQ, setQuestionQ] = React.useState("");
  if (questionQ === "") {
    if (singleQ[0]?.question_text !== undefined) {
      setQuestionQ(singleQ[0]?.question_text);
    }
  }

  const onSubmit = (data) => {
    setLoadSub(true);

    let jsonAns = JSON.stringify(data);

    console.log(indexes);

    if (indexes.length < 2) {
      setLoadSub(false);

      alert.error(<div className="notif">Isi Opsi Jawaban Minimal 2</div>);
      return false;
    } else if (
      indexes[0].answerText === "" ||
      indexes[1].answerText === "" ||
      indexes[2].answerText === ""
    ) {
      setLoadSub(false);

      alert.error(<div className="notif">Isi Bagian Yang Kosong!</div>);
      return false;
    } else if (
      indexes[0].isCorrect === "" ||
      indexes[1].isCorrect === "" ||
      indexes[2].isCorrect === ""
    ) {
      setLoadSub(false);

      alert.error(
        <div className="notif">Pilih Jawaban Yang Benar dan salah!</div>
      );
      return false;
    }

    axios({
      method: "put",
      url: `${API_URL}quiz/${idEdit}`,
      data: {
        user_id: singleQ[0]?.user_id,
        lesson_id: singleQ[0]?.lesson_id,
        pelajaran: singleQ[0]?.pelajaran,
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
        setLoadSub(false);
        alert.success(
          <div className="notif">Berhasil mengedit Soal Quiz!</div>
        );
        //handle success
        console.log(response);
      })
      .then(() => {
        fetchData();
        setSingleQ([]);
        setIndexes([]);
        setChange("list");
      })
      .catch(function (error) {
        setLoad(false);

        alert.error(<div className="notif">Gagal mengedit Soal Quiz</div>);
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
    console.log("ss");
  };

  // if (singleQ) {
  //   const q = JSON.parse(singleQ[0]?.answer_options).list;
  //   console.log("q", q);
  // }

  async function deleteQ(id) {
    // e.preventDefault();
    swal({
      title: "Menghapus Soal",
      text: "Apakah Kamu Yakin Untuk Menghapus Soal Ini?",
      icon: "warning",
      buttons: true,

      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${API_URL}quiz/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            swal({
              title: "Berhasil!",
              text: "Soal Ujian Terhapus!",
              icon: "success",
              timer: 2000,
              button: false,
            }).then(() => {
              fetchData();
            });
          })
          .catch(() => {
            swal({
              title: "Gagal!",
              text: "Gagal Menghapus Soal Ujian, Silahkan Coba Lagi",
              icon: "error",
              timer: 2000,
              button: false,
            });
          });
      }
    });
  }
  return (
    <div>
      <IndexNavbar />
      <div className="wrapper allButFooter">
        <DetailHeader
          header={
            load === false
              ? "Daftar Soal Ujian " + quizL[0]?.pelajaran
              : undefined
          }
          subHeader={quizL?.length + " Soal Tersedia Di Kelas Ini"}
          img={require("assets/img/quizlist.jpg")}
        />
        <Container className="mt-4">
          <Row className="d-flex justify-content-between">
            <BackButton />
            <Link to={`/create-question`}>
              <Button color="info" className="float-right">
                <i className="now-ui-icons ui-1_simple-add"></i> Buat Soal
              </Button>
            </Link>
          </Row>
          {load === false ? (
            quizL?.length === 0 ? (
              <div className="container">
                <p className=" font-weight-bold text-dark">
                  Pengajar Belum Membuat Materi Apapun Untuk Saat Ini.
                </p>
                <div
                  className={
                    idUser === quizL[0]?.user_id
                      ? "d-flex justify-content-between"
                      : "d-flex justify-content-end"
                  }
                >
                  <img
                    width="250rem"
                    alt="..."
                    src={require("assets/img/books.png")}
                  ></img>
                </div>
              </div>
            ) : change === "list" ? (
              quizL?.map((list, index) => {
                return (
                  <div className="card rounded" key={index}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col d-inline">
                          <p className="font-weight-bold">
                            Soal Ke - {index + 1} | {list.question_text} <hr />
                          </p>
                          <span>Opsi Jawaban : </span>
                          <ul>
                            {JSON.parse(list?.answer_options).list?.map(
                              (data, index) => {
                                return <li key={index}>{data?.answerText}</li>;
                              }
                            )}
                          </ul>
                          {list?.user_id === idUser ? (
                            <div>
                              <Button
                                onClick={() => {
                                  editData(list?.id);
                                  setIdEdit(list?.id);
                                  setListNum(index);
                                  setChange("editForm");
                                }}
                                color="primary"
                                className="float-right"
                              >
                                Edit Soal Ini
                              </Button>
                              <Button
                                onClick={() => deleteQ(list.id)}
                                color="danger"
                                className="float-right"
                              >
                                Hapus Soal Ini
                              </Button>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <div className="card rounded">
                  <div className="card-body">
                    <div className="row">
                      <div className="col d-inline">
                        <h4 className="font-weight-bold">
                          Edit Soal Ke - {listNum + 1} |{" "}
                          {singleQ[0]?.question_text === undefined ? (
                            <span className="font-weight-normal text-secondary">
                              Memuat...
                            </span>
                          ) : (
                            singleQ[0]?.question_text
                          )}{" "}
                          <hr />
                        </h4>

                        <Form onSubmit={handleSubmit(onSubmit)}>
                          <FormGroup>
                            <Label className="font-weight-bold">
                              Soal Quiz
                            </Label>
                            <Input
                              defaultValue={singleQ[0]?.question_text}
                              required
                              placeholder="Soal Quiz"
                              type="text"
                              onInput={(e) => setQuestionQ(e.target.value)}
                            ></Input>
                          </FormGroup>
                          <label className="font-weight-bold">
                            Opsi Jawaban :{" "}
                          </label>
                          <br />
                          {indexes.map((data, index) => {
                            const fieldName = `list[${index}]`;
                            return (
                              <fieldset name={fieldName} key={index}>
                                <label>
                                  <input
                                    defaultValue={data.answerText}
                                    type="text"
                                    className="form-control"
                                    name={`${fieldName}.answerText`}
                                    ref={register}
                                  />
                                </label>

                                <label className="ml-2">
                                  {data.isCorrect === "true" ? (
                                    <input
                                      checked
                                      className="mr-1"
                                      type="radio"
                                      value="true"
                                      name={`${fieldName}.isCorrect`}
                                      ref={register}
                                    />
                                  ) : (
                                    <input
                                      className="mr-1"
                                      type="radio"
                                      value="true"
                                      name={`${fieldName}.isCorrect`}
                                      ref={register}
                                    />
                                  )}
                                  Jawaban Benar
                                </label>
                                <label className="ml-2 mr-2">
                                  {data.isCorrect === "false" ? (
                                    <input
                                      checked
                                      className="mr-1"
                                      type="radio"
                                      value="false"
                                      name={`${fieldName}.isCorrect`}
                                      ref={register}
                                    />
                                  ) : (
                                    <input
                                      className="mr-1"
                                      type="radio"
                                      value="false"
                                      name={`${fieldName}.isCorrect`}
                                      ref={register}
                                    />
                                  )}
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
                              <button
                                disabled
                                className="not-allowed btn btn-info"
                              >
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

                          {loadSub === true ? (
                            <Spinner></Spinner>
                          ) : (
                            <button type="submit" className="btn btn-success">
                              Submit
                            </button>
                          )}
                          <Button
                            onClick={() => {
                              setSingleQ([]);
                              setIndexes([]);
                              setChange("list");
                            }}
                            color="secondary"
                            className="float-right"
                          >
                            Batal Edit
                          </Button>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          ) : (
            <MyBulletListLoader />
          )}
        </Container>
      </div>
      <TransparentFooter />
    </div>
  );
};

export default MyQuizList;
