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
import { withAuthTeacher } from "auth/RouteAccess";
import Countdown from "react-countdown";

function Quiz() {
  let { id } = useParams();
  console.log(id);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [load, setLoad] = useState();
  const history = useHistory();
  const user = localStorage.getItem("token");
  const userid = JSON.parse(user);
  const access_token = userid?.token?.token;
  const roleUser = userid?.user?.role;
  const MyBulletListLoader = () => <DotLoad />;

  // let questions = questions?.filter(function (oneQuiz) {
  //   // eslint-disable-next-line
  //   return oneQuiz.lesson_id == id;
  // });

  console.log(questions);

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
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setLoad(false);
        setQuestions(response.data.data);
      })
      .catch((error) => {
        console.log("errorQ", error);
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
  // const dataAnswer = questions[0]?.answer_options;
  // const answerOption = JSON.parse(dataAnswer);
  // console.log("ans", answerOption?.answer_text);
  return (
    <div>
      {load === false ? (
        questions.length === 0 ? (
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
                      width="200rem"
                      alt="..."
                      className="rounded float-right"
                      src={require("assets/img/result.png")}
                    ></img>
                  </Col>
                  <Col className="mt-5">
                    <h5>
                      Kamu Benar {score} dari {questions.length}
                    </h5>
                    {roleUser === "user" ? (
                      <Link to="/bab">
                        <Button color="info">Pelajari Kelas Lainnya!</Button>
                      </Link>
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
                  {/* <span>{questions[currentQuestion]?.answer_options}</span> */}
                </div>
                {JSON.parse(questions[currentQuestion]?.answer_options).map(
                  (answerOption, index) => {
                    return (
                      <Row className="ml-1" key={index}>
                        <Button
                          className="btn-block btn-info"
                          onClick={() =>
                            handleAnswerOptionClick(answerOption.isCorrect)
                          }
                        >
                          {answerOption.answerText}
                        </Button>
                      </Row>
                    );
                  }
                )}
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
