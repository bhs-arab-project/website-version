import React, { useState } from "react";
import { Container } from "reactstrap";
import IndexNavbar from "components/Navbars/IndexNavbar";
import { API_URL } from "utils/constants";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BulletList } from "react-content-loader";
import DetailHeader from "components/Headers/DetailHeader";
import Button from "reactstrap/lib/Button";
import Col from "reactstrap/lib/Col";
import swal from "sweetalert";
import TransparentFooter from "components/Footers/TransparentFooter";

const MyBulletListLoader = () => <BulletList />;

const DetailLesson = () => {
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

  async function deleteLesson(id) {
    // e.preventDefault();
    swal({
      title: "Menghapus Materi",
      text: "Apakah Kamu Yakin Untuk Menghapus Materi ini?",
      icon: "warning",
      buttons: true,

      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${API_URL}bab/${id}`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then((res) => {
            swal({
              title: "Berhasil!",
              text: "Materi Terhapus!",
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
              text: "Gagal Menghapus Materi, Silahkan Coba Lagi",
              icon: "error",
              timer: 2000,
              button: false,
            });
          });
      }
    });
  }

  // const detailLesson = this;
  return (
    <div>
      <IndexNavbar />
      <div className="wrapper allButFooter">
        <DetailHeader
          header={detailLesson.pelajaran}
          subHeader={detailLesson.deskripsi}
          img={require("assets/img/my-bab.jpg")}
        />
        <Container className="mt-4">
          <h4>Materi Yang tersedia - المواد المتاحة</h4>
          <Link to="/">
            <Button color="danger">
              {" "}
              <i class="now-ui-icons arrows-1_minimal-left"></i> Kembali
            </Button>
          </Link>
          {load === false ? (
            detailLesson?.chapter?.map((list, index) => {
              return (
                <div class="card rounded" key={index}>
                  <div class="card-body">
                    <div className="row">
                      <div className="col-md-8 col-xs-2 col-sm-3 d-inline">
                        <div className="row">
                          <div className="col-md-2 col-xs-3 col-sm-2 mt-1">
                            <img
                              width="60%"
                              alt="..."
                              className="rounded-circle "
                              src={require("assets/img/book2.png")}
                            ></img>
                          </div>
                          <div className="col-md-5 col-xs-4 col-sm-5 mt-3">
                            {list.judul_bab.length === 0 ? (
                              <span>tidak ada data</span>
                            ) : (
                              list.judul_bab
                            )}
                          </div>
                        </div>
                      </div>
                      {list.user_id === userid?.user?.id ? (
                        <div className="col-md-4 col-xs-1 col-sm-1 px-1 text-right d-inline">
                          <Col>
                            <Link to={`/materi/${list.id}`}>
                              <Button color="info">Lihat</Button>
                            </Link>
                            <Link to={`/edit-materi/${list.id}`}>
                              <Button color="success">Edit</Button>
                            </Link>
                            <Button
                              onClick={() => deleteLesson(list.id)}
                              color="danger"
                            >
                              Hapus
                            </Button>
                          </Col>
                        </div>
                      ) : (
                        <div className="col-md-3 col-xs-1 col-sm-1 px-1 text-right d-inline">
                          <Link to={`/materi/${list.id}`}>
                            <Button color="info">Lihat</Button>
                          </Link>
                        </div>
                      )}
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
      <TransparentFooter />
    </div>
  );
};

export default DetailLesson;
