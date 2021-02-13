import React, { useState } from "react";
import { Button } from "reactstrap";
import { API_URL } from "utils/constants";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Spinner from "reactstrap/lib/Spinner";
import ResponsiveArticle from "components/loader/loaderMateri";

function MateriPage() {
  let { id } = useParams();
  let [materi, setMateri] = React.useState([]);
  const [load, setLoad] = useState(false);

  async function fetchData() {
    axios
      .get(`${API_URL}bab/${id}`)
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
    fetchData();
  }, [id]);
  return (
    <>
      {load === false ? (
        <div className="bungkus">
          <div class="konten">
            <nav class="baratas navbar-expand-lg navbar-light bg-light">
              <button
                class="navbar-toggler float-right mt-2"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item mt-2">
                    <Link to="/bab" className="text-decoration-none">
                      <i class="now-ui-icons files_single-copy-04 text-black"></i>{" "}
                      <span className="text-black">Bab Materi</span>
                    </Link>
                  </li>
                  <li class="nav-item mt-2">
                    <Link to="/profile-page" className="text-decoration-none">
                      <i class="now-ui-icons now-ui-icons users_single-02 text-black"></i>{" "}
                      <span className="text-black">Profil</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            <div class="konten-bungkus">
              <h2>{materi?.judul_bab}</h2>

              {materi?.theory?.map((pelajaran, index) => {
                return <p>{pelajaran.materi}</p>;
              })}

              <div class="line "></div>

              <div className="text-right  d-flex justify-content-between tombol-navigasi">
                <Button color="info">
                  <i class="now-ui-icons arrows-1_minimal-left"></i> Materi
                  Sebelumnya
                </Button>
                <Button color="info">
                  Lanjut Materi{" "}
                  <i class="now-ui-icons arrows-1_minimal-right"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ResponsiveArticle()
      )}
    </>
  );
}

export default MateriPage;
