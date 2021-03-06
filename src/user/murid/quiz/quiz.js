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
    if (isCorrect) {
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
        history.push("/bab");
      }
    });
  }

  let averageScore = Math.floor(scoreTotal);
  const reloadPage = () => {
    window.location.reload();
  };

  // const dataAnswer = questions[0]?.answer_options;
  // const answerOption = JSON.parse(dataAnswer);
  // console.log("ans", answerOption?.answer_text);
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
                      Kamu Benar {score} dari {questions.length} | Nilai{" "}
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
                      Kelas {questions[currentQuestion]?.pelajaran} | Soal Ke{" "}
                      {currentQuestion + 1} dari {questions.length}
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
                <div className="question-count">
                  {" "}
                  {/* <Countdown date={Date.now() + 10000} renderer={renderer} onComplete={completeCount}/> */}
                </div>
                <div className="question-text">
                  <h5>{questions[currentQuestion]?.question_text}</h5>
                  <span>{questions[currentQuestion]?.answer_options}</span>
                </div>
                {/* {JSON.parse(questions[currentQuestion]?.answer_options).map(
                  (answerOption, index) => {
                    return (
                      <Row className="ml-1" key={index}>
                        <Button
                          className="btn-block btn-info"
                          onClick={() =>
                            handleAnswerOptionClick(answerOption.answerOption)
                          }
                        >
                          {answerOption.answerText}
                        </Button>
                      </Row>
                    );
                  }
                )} */}
                <Button color="danger" onClick={() => confirmCancel()}>
                  Batalkan Quiz
                </Button>
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
