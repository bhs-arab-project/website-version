import React, { useState } from "react";
import { Button } from "reactstrap";
import { API_URL } from "utils/constants";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import ResponsiveArticle from "components/loader/loaderMateri";
import ReactHtmlParser from "react-html-parser";
import TransparentFooter from "components/Footers/TransparentFooter";
import swal from "sweetalert";
import NavbarBrand from "reactstrap/lib/NavbarBrand";

function MateriPage(props) {
  let { id } = useParams();
  let arrayNum = props.location.state.index;
  let [detailLesson, setDetailLesson] = React.useState([]);
  const [currentChapter, setCurrentCha] = useState(arrayNum);
  // const [load, setLoad] = useState(false);
  // console.log("indexx", arrayNum);

  const user = localStorage.getItem("token");
  const userid = JSON.parse(user);
  const access_token = userid?.token?.token;
  const roleUser = userid?.user?.role;
  const history = useHistory();

  async function fetchDataPel() {
    axios
      .get(`${API_URL}pelajaran/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setDetailLesson(response.data);
      })
      .catch((error) => {
        let message = error.response;
        console.log(message);
      });
  }

  React.useEffect(() => {
    fetchDataPel();
    // eslint-disable-next-line
  }, [id]);

  const goBackH = () => {
    history.goBack();
  };

  const goNextChap = () => {
    const nextQuestion = currentChapter + 1;
    setCurrentCha(nextQuestion);
  };

  const previousChap = () => {
    const prevChap = currentChapter - 1;
    setCurrentCha(prevChap);
  };

  function startExam() {
    swal({
      title: "Lanjut Ke Ujian",
      text: "Apakah Kamu Yakin Untuk Memulai Ujian?",
      icon: "warning",
      buttons: true,

      dangerMode: true,
    }).then((response) => {
      if (response) {
        history.push({
          pathname: `/quiz/${id}`,
        });
      }
    });
  }

  return (
    <>
      {detailLesson?.chapter ? (
        <div className="bungkus">
          <div className="konten">
            <nav className="baratas navbar-expand-lg">
              <button
                className="navbar-toggler float-right mt-2"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarNav">
                <NavbarBrand className="text-white">
                  <img
                    width="50rem"
                    alt="..."
                    className="rounded mr-1"
                    src={require("assets/img/brand-logo.png")}
                  ></img>
                  Kelas{" "}
                  <span className="text-capitalize">
                    {detailLesson?.pelajaran}
                  </span>{" "}
                  | Materi Ke {currentChapter + 1} dari{" "}
                  {detailLesson?.chapter?.length}
                </NavbarBrand>

                <ul className="navbar-nav ml-auto">
                  <li className="nav-item mt-2">
                    {roleUser === "user" ? (
                      <Link to="/bab" className="text-decoration-none">
                        <i className="now-ui-icons files_single-copy-04 text-white"></i>{" "}
                        <span className="text-white">Bab Materi</span>
                      </Link>
                    ) : (
                      <span></span>
                    )}
                  </li>
                  <li className="nav-item mt-2">
                    <Link to="/profile-page" className="text-decoration-none">
                      <i className="now-ui-icons now-ui-icons users_single-02 text-white"></i>{" "}
                      <span className="text-white">Profil</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="konten-bungkus">
              <h1 className="text-capitalize">
                {detailLesson?.chapter[currentChapter]?.judul_bab}
              </h1>
              <div className="line "></div>
              <b className="text-konten">
                {ReactHtmlParser(detailLesson?.chapter[currentChapter]?.materi)}
              </b>
              <div className="line "></div>
              <div>
                <Button color="danger" onClick={goBackH}>
                  <i className="now-ui-icons arrows-1_minimal-left"></i> Kembali
                  Ke Detail Bab
                </Button>
                {currentChapter == 0 ? (
                  <></>
                ) : (
                  <Button color="primary" onClick={previousChap}>
                    <i className="now-ui-icons arrows-1_minimal-left"></i>{" "}
                    Materi Sebelumnya
                  </Button>
                )}

                {currentChapter == detailLesson?.chapter?.length - 1 ? (
                  detailLesson?.quiz?.length === 0 ? (
                    <Button color="danger" disabled className="not-allowed">
                      Ujian Belum Tersedia{" "}
                      <i className="now-ui-icons arrows-1_minimal-right"></i>
                    </Button>
                  ) : (
                    <Button color="info" onClick={startExam}>
                      Mulai Ujian{" "}
                      <i className="now-ui-icons arrows-1_minimal-right"></i>
                    </Button>
                  )
                ) : (
                  <Button color="info" onClick={goNextChap}>
                    Lanjut Materi{" "}
                    <i className="now-ui-icons arrows-1_minimal-right"></i>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ResponsiveArticle()
      )}
      <TransparentFooter />
    </>
  );
}

export default MateriPage;
