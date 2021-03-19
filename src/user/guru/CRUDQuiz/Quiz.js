import TransparentFooter from "components/Footers/TransparentFooter";
import React, { useState } from "react";
import { Button } from "reactstrap";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import CardTitle from "reactstrap/lib/CardTitle";
import { Link, useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";
import Col from "reactstrap/lib/Col";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import axios from "axios";
import { API_URL } from "utils/constants";
import DotLoad from "components/loader/dotLoader";

function Quiz(props) {
  let { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showTerm, setShowTerm] = useState(true);
  const [score, setScore] = useState(0);
  const [scoreTotal, setScoreT] = useState(0);
  const [load, setLoad] = useState();
  const history = useHistory();
  const { token, roleUser } = props;

  const MyBulletListLoader = () => <DotLoad />;

  // let questions = questions?.filter(function (oneQuiz) {
  //   // eslint-disable-next-line
  //   return oneQuiz.lesson_id == id;
  // });

  // const renderer = ({ hours, minutes, seconds, completed }) => {
  //   if (!completed) {
  //     return (
  //       <span>
  //         {hours}:{minutes}:{seconds}
  //       </span>
  //     );
  //   }
  // };

  async function fetchData() {
    axios
      .get(`${API_URL}quiz?cari=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoad(false);
        setQuestions(response.data.data);
        console.log(response.data.data);
      })
      .catch((response) => {
        console.log("errorQ", response);
      });
  }

  React.useEffect(() => {
    setLoad(true);
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect === "true") {
      setScore(score + 1);
      let e = ((score + 1) / questions.length) * 100;
      setScoreT(e);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  // const countComplete = () => {
  //   const nextQuestion = currentQuestion + 1;
  //   if (nextQuestion < questions.length) {
  //     setCurrentQuestion(nextQuestion);
  //   } else {
  //     setShowScore(true);
  //   }
  // };

  function confirmCancel() {
    // e.preventDefault();
    swal({
      title: "Batalkan Quiz",
      text: "Apakah Kamu Yakin Untuk Membatalkan Quiz?",
      icon: "warning",
      buttons: true,

      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        history.push("/");
      }
    });
  }

  function confirmQuiz() {
    swal({
      title: "Mulai Ujian",
      text: "Apakah Kamu Yakin Untuk Memulai Ujian?",
      icon: "warning",
      buttons: true,

      dangerMode: true,
    }).then((response) => {
      if (response) {
        setShowTerm(false);
      }
    });
  }

  let averageScore = Math.floor(scoreTotal);
  const reloadPage = () => {
    window.location.reload();
  };

  // useEffect(() => {
  //   try {
  //     for (let index = 0; index < questions.length; index++) {
  //       questions[index].answer_options = JSON.parse(
  //         questions[index].answer_options
  //       );
  //     }
  //     console.log(questions);
  //   } catch (error) {}
  // }, [questions]);

  return (
    <div>
      {load === false ? (
        questions?.length === 0 ? (
          <div className="section container text-left">
            <p className=" font-weight-bold text-dark">
              Pengajar Sedang Membuat Quiz Terbaik Untuk Kamu, Tungguin Terus
              Yaa! <br /> - Al-Qolam
            </p>
            <img
              width="250rem"
              alt="..."
              className="rounded float-right"
              src={require("assets/img/books.png")}
            ></img>
            <Link to="/bab">
              <Button color="danger">Kembali Ke Kelas</Button>
            </Link>
          </div>
        ) : showScore ? (
          <div className="section container">
            <Card>
              <CardBody>
                <CardTitle>
                  <Row>
                    <img
                      width="85rem"
                      alt="..."
                      src={require("assets/img/brand-logo.png")}
                    ></img>
                    <h3 className="mt-4 ml-2">
                      Quiz {questions[currentQuestion]?.pelajaran}
                    </h3>
                  </Row>
                </CardTitle>
                <Row>
                  <Col>
                    <img
                      width={averageScore < 60 ? "400rem" : "310rem"}
                      alt="..."
                      className="rounded float-right"
                      src={
                        averageScore < 60
                          ? require("assets/img/try-again.jpg")
                          : require("assets/img/suc3.png")
                      }
                    ></img>
                  </Col>
                  <Col className="mt-5">
                    {averageScore < 60 ? (
                      <h3>Semangat, Ayo Coba Lagi!</h3>
                    ) : (
                      <h3>Selamat, Kamu Lolos!</h3>
                    )}
                    <h5>
                      Kamu Benar {score} dari {questions.length} Soal | Nilai{" "}
                      {averageScore}
                    </h5>
                    {averageScore < 60 ? (
                      <span className="text-info">
                        *Kamu Harus Memiliki Nilai Diatas 60 Untuk Mendapatkan
                        Sertifikat
                      </span>
                    ) : (
                      <span className="text-info">
                        Dapatkan Sertifikatmu Di Halaman Profil! <br />
                      </span>
                    )}
                    {roleUser === "user" ? (
                      <>
                        <Link to="/bab">
                          <Button color="info">Pelajari Kelas Lainnya!</Button>
                        </Link>
                        {averageScore < 60 ? (
                          <Button color="info" onClick={reloadPage}>
                            Coba Lagi
                          </Button>
                        ) : (
                          <Link to="/profile-page">
                            <Button color="info">Profil Saya</Button>
                          </Link>
                        )}
                      </>
                    ) : (
                      <Link to="/">
                        <Button color="info">Kembali Ke Halaman Utama</Button>
                      </Link>
                    )}
                  </Col>
                </Row>
              </CardBody>
              <TransparentFooter />
            </Card>
          </div>
        ) : (
          <>
            <div className="section text-left">
              <Container>
                <Row>
                  <Col>
                    <h2 className="mt-4">
                      {showTerm === true ? (
                        "Pendahuluan | Al-Qolam"
                      ) : (
                        <>
                          Kelas {questions[currentQuestion]?.pelajaran} | Soal
                          Ke {currentQuestion + 1} dari {questions.length}
                        </>
                      )}
                    </h2>
                  </Col>
                  <Col>
                    <img
                      width="100rem"
                      alt="..."
                      className="rounded-circle float-right"
                      src={require("assets/img/brand-logo.png")}
                    ></img>
                  </Col>
                </Row>
                {showTerm === true ? (
                  <>
                    <Row>
                      <Col md="8">
                        <ul>
                          <li>Awali mengerjakan soal ujian dengan berdoa.</li>
                          <li>Pilih salah satu jawaban yang dianggap benar.</li>
                          <li>
                            Kerjakan ujian dengan cermat dan bacalah pertanyaan
                            dengan teliti, pahami makna dari soal tersebut,
                            jangan terburu-buru.
                          </li>
                          <li>
                            Dilarang mencontek, kerjakan ujian dengan jujur,
                            kerjakan soal ujian sesuai dengan keyakinan dan
                            kemampuan Anda sendiri.
                          </li>
                          <li>
                            Jika Nilai dibawah 60 maka peserta dianggap tidak
                            lolos dan dapat mengulang ujian tersebut.
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <div className="question-count">
                      {" "}
                      {/* <Countdown date={Date.now() + 10000} renderer={renderer} onComplete={completeCount}/> */}
                    </div>
                    <div className="question-text">
                      <h5>{questions[currentQuestion]?.question_text}</h5>
                      {/* <span>{questions[currentQuestion]?.answer_options}</span> */}
                    </div>
                    {JSON.parse(
                      questions[currentQuestion]?.answer_options
                    ).list?.map((data, index) => {
                      return (
                        <Row className="ml-1" key={index}>
                          <Button
                            className="btn-block btn-info"
                            onClick={() =>
                              handleAnswerOptionClick(data?.isCorrect)
                            }
                          >
                            {data?.answerText}
                          </Button>
                        </Row>
                      );
                    })}
                  </>
                )}
                <div className="d-flex justify-content-between">
                  <Button color="danger" onClick={() => confirmCancel()}>
                    <i className="now-ui-icons arrows-1_minimal-left"></i>{" "}
                    Batalkan Ujian
                  </Button>
                  {showTerm === true ? (
                    <Button color="info" onClick={() => confirmQuiz()}>
                      Mulai Ujian{" "}
                      <i className="now-ui-icons arrows-1_minimal-right"></i>
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              </Container>
            </div>
            <TransparentFooter />
          </>
        )
      ) : (
        <div className="section container">
          <MyBulletListLoader />
        </div>
      )}
    </div>
  );
}

export default Quiz;
