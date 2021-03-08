import React, { useState } from "react";
import { Button } from "reactstrap";
import { API_URL } from "utils/constants";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ResponsiveArticle from "components/loader/loaderMateri";
import ReactHtmlParser from "react-html-parser";
import TransparentFooter from "components/Footers/TransparentFooter";

function MateriPage() {
  let { id } = useParams();
  let [materi, setMateri] = React.useState([]);
  const [load, setLoad] = useState(false);

  const user = localStorage.getItem("token");
  const userid = JSON.parse(user);
  const access_token = userid?.token?.token;
  const roleUser = userid?.user?.role;

  async function fetchDataMateri() {
    axios
      .get(`${API_URL}bab/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setLoad(false);
        let materiData = response.data;
        console.log(materiData);
        setMateri(materiData);
      })
      .catch((error) => {
        let message = error.response;
        console.log("ss", message);
      });
  }

  React.useEffect(() => {
    setLoad(true);
    fetchDataMateri();
    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      {load === false ? (
        <div className="bungkus">
          <div className="konten">
            <nav className="baratas navbar-expand-lg navbar-light bg-light">
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
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item mt-2">
                    {roleUser === "user" ? (
                      <Link to="/bab" className="text-decoration-none">
                        <i className="now-ui-icons files_single-copy-04 text-black"></i>{" "}
                        <span className="text-black">Bab Materi</span>
                      </Link>
                    ) : (
                      <span></span>
                    )}
                  </li>
                  <li className="nav-item mt-2">
                    <Link to="/profile-page" className="text-decoration-none">
                      <i className="now-ui-icons now-ui-icons users_single-02 text-black"></i>{" "}
                      <span className="text-black">Profil</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="konten-bungkus">
              <h1>{materi?.judul_bab}</h1>
              <hr />
              <p>{ReactHtmlParser(materi?.materi)}</p>
              <div className="line "></div>
              <div className="text-right  d-flex justify-content-between tombol-navigasi">
                {roleUser === "user" ? (
                  <Link to={`/bab`}>
                    <Button color="danger">
                      <i className="now-ui-icons arrows-1_minimal-left"></i>{" "}
                      Kembali Ke Bab
                    </Button>
                  </Link>
                ) : (
                  <Link to={`/`}>
                    <Button color="danger">
                      <i className="now-ui-icons arrows-1_minimal-left"></i>{" "}
                      Kembali Ke Beranda
                    </Button>
                  </Link>
                )}

                {/* <Button color="info">
                  <i className="now-ui-icons arrows-1_minimal-left"></i> Materi
                  Sebelumnya
                </Button>
                <Button color="info">
                  Lanjut Materi{" "}
                  <i className="now-ui-icons arrows-1_minimal-right"></i>
                </Button> */}
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
