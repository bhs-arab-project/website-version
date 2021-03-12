import React, { useState } from "react";
import { Button, Container } from "reactstrap";
import IndexNavbar from "../../components/Navbars/IndexNavbar";
import { API_URL } from "utils/constants";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { BulletList } from "react-content-loader";
import AvatarWithText from "../../components/loader/loaderAvatarWithText";
import TransparentFooter from "components/Footers/TransparentFooter";
import { withAuthUser } from "./../../auth/RouteAccess";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";

const MyBulletListLoader = () => <BulletList />;

const BabDetail = () => {
  let { id } = useParams();
  let [detailLesson, setDetailLesson] = React.useState([]);
  const [load, setLoad] = useState(true);
  const user = localStorage.getItem("token");
  const userid = JSON.parse(user);
  const access_token = userid?.token?.token;
  const history = useHistory();

  async function fetchData() {
    axios
      .get(`${API_URL}pelajaran/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setLoad(false);
        setDetailLesson(response.data);
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
  }, [id]);

  let pageHeader = React.createRef();
  // console.log(detailLesson?.chapter, "snjn");
  const pelajaran = detailLesson.pelajaran;

  const handleSub = () => {
    history.push("/");
  };

  return (
    <div>
      <IndexNavbar />
      <div className="wrapper allButFooter text-capitalize">
        <div className="page-header page-header-small">
          <div
            className="page-header-image"
            style={{
              backgroundImage:
                "url(" + require("assets/img/bab-detail-bg.png") + ")",
            }}
            ref={pageHeader}
          ></div>
          <div className="content-center">
            <Container>
              {load === false ? (
                <div className="media">
                  <div className="align-self-center mr-4 mt-5 ">
                    <img
                      width="100rem"
                      alt="..."
                      className="rounded-circle align-self-center"
                      src={require("assets/img/muslim.png")}
                    ></img>
                    <div>{detailLesson.guru}</div>
                  </div>
                  <div className="media-body text-left ">
                    <h1 className="title">{pelajaran}</h1>
                    <div style={{ fontSize: "0.9rem" }}>
                      {detailLesson.deskripsi}
                    </div>
                  </div>
                </div>
              ) : (
                AvatarWithText()
              )}
            </Container>
          </div>
        </div>
        <Container className="mt-4">
          <h4>Materi Yang Tersedia - المواد المتاحة</h4>
          <div>
            <Row>
              <Col>
                <Link to="/">
                  <Button color="danger">
                    {" "}
                    <i className="now-ui-icons arrows-1_minimal-left"></i>{" "}
                    Kembali
                  </Button>
                </Link>
              </Col>
              {detailLesson?.chapter?.length === 0 ? (
                <></>
              ) : (
                <Col>
                  <div
                    class="myDiv rounded mt-2"
                    style={{
                      backgroundColor:
                        detailLesson?.quiz?.length === 0
                          ? "#FF3636"
                          : "#2ba6cb",
                    }}
                  >
                    <div class="bgImage">
                      <h4>
                        Quiz :{" "}
                        {detailLesson?.quiz?.length === 0 ? (
                          <>Belum Tersedia</>
                        ) : (
                          <>Tersedia</>
                        )}
                      </h4>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          </div>
          {load === false ? (
            detailLesson?.chapter?.length === 0 ? (
              <div className="container">
                <p className=" font-weight-bold text-dark">
                  Pengajar Sedang Membuat Materi Terbaik Untuk Kamu, Tungguin
                  Terus Yaa! <br /> - Al-Qolam
                </p>
                <div className="d-flex justify-content-end">
                  <img
                    width="250rem"
                    alt="..."
                    className="rounded"
                    src={require("assets/img/books.png")}
                  ></img>
                </div>
              </div>
            ) : (
              detailLesson?.chapter?.map((list, index) => {
                return (
                  <div className="card rounded" key={index}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-10 col-xs-2 col-sm-3 d-inline">
                          <div className="row">
                            <div className="col-md-1 col-xs-3 col-sm-2 mt-1">
                              <img
                                // width="50%"
                                alt="..."
                                className="rounded-circle "
                                src={require("assets/img/book2.png")}
                              ></img>
                            </div>
                            <div className="col-md-5 col-xs-4 col-sm-5 mt-3">
                              {list.judul_bab}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2 col-xs-1 col-sm-1 px-1 text-right d-inline">
                          <Link
                            to={{
                              pathname: `/bab-materi/${id}`,
                              state: { index },
                            }}
                          >
                            <Button color="info">Mulai belajar</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
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

export default withAuthUser(BabDetail);
