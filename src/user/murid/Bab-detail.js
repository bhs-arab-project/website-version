import React, { useState } from "react";
import { Button, Container } from "reactstrap";
import DefaultFooter from "../../components/Footers/DefaultFooter";
import IndexNavbar from "../../components/Navbars/IndexNavbar";
import { API_URL } from "utils/constants";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BulletList } from "react-content-loader";
import AvatarWithText from "../../components/loader/loaderAvatarWithText";

const MyBulletListLoader = () => <BulletList />;

const BabDetail = () => {
  let { id } = useParams();
  let [detailLesson, setDetailLesson] = React.useState([]);
  const [load, setLoad] = useState(true);
  const user = localStorage.getItem("token");
  const userid = JSON.parse(user);
  const access_token = userid?.token?.token;

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
                <div class="media">
                  <div className="align-self-center mr-4 mt-5 ">
                    <img
                      width="100rem"
                      alt="..."
                      className="rounded-circle align-self-center"
                      src={require("assets/img/muslim.png")}
                    ></img>
                    <div>{detailLesson.guru}</div>
                  </div>
                  <div class="media-body text-left ">
                    <h1 className="title "> {detailLesson.pelajaran}</h1>
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

          {load === false ? (
            detailLesson?.chapter?.map((list, index) => {
              return (
                <div class="card rounded" key={index}>
                  <div class="card-body">
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
                        <Link to={`/materi/${list.id}`}>
                          <Button color="info">Mulai belajar</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <MyBulletListLoader />
          )}
        </Container>
      </div>
      <DefaultFooter />
    </div>
  );
};

export default BabDetail;
