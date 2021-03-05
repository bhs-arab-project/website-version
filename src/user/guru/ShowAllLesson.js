import React, { useState } from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

import { API_URL } from "utils/constants";
import BootstrapCardDataTable from "../../components/loader/loaderTable";
import axios from "axios";
import { Link } from "react-router-dom";
import Col from "reactstrap/lib/Col";
import Button from "reactstrap/lib/Button";
import swal from "sweetalert";
import Table from "reactstrap/lib/Table";
import Switch from "react-bootstrap-switch";

const ShowAllLesson = () => {
  const [load, setLoad] = useState(true);
  let [listTable, setListTable] = React.useState([]);

  const user = localStorage.getItem("token");
  const userid = JSON.parse(user);
  const access_token = userid?.token?.token;

  async function fetchData() {
    axios
      .get(`${API_URL}pelajaran`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setLoad(false);
        setListTable(response.data);
      })
      .catch((error) => {
        let message = error.response;
        console.log(message);
      });
  }

  function switchH() {
    console.log("pencet");
  }

  async function deleteLesson(id) {
    // e.preventDefault();
    swal({
      title: "Menghapus Kelas",
      text: "Apakah Kamu Yakin Untuk Menghapus Kelas?",
      icon: "warning",
      buttons: true,

      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${API_URL}pelajaran/${id}`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then((res) => {
            swal({
              title: "Berhasil!",
              text: "Kelas Terhapus!",
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
              text: "Gagal Menghapus Kelas, Silahkan Coba Lagi",
              icon: "error",
              timer: 2000,
              button: false,
            });
          });
      }
    });
  }

  React.useEffect(() => {
    setLoad(true);
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="section section-tabs" id="listLesson">
        <Container>
          <Row className="d-flex justify-space-between">
            <h1>Semua Kelas</h1>
            <hr />
            <Col>
              <Button color="info">Kelas Saya</Button>
              <Button color="info">Semua Kelas</Button>
            </Col>
            <Col>
              <Link to="/create-lesson">
                <Button color="info" className="float-right">
                  <i class="now-ui-icons ui-1_simple-add"></i> Buat Kelas
                </Button>
              </Link>
              <Link to={`/create-chapter`}>
                <Button color="success" className="float-right">
                  <i class="now-ui-icons ui-1_simple-add"></i> Buat Materi
                </Button>
              </Link>
              <Link to={`/create-question`}>
                <Button color="primary" className="float-right">
                  <i class="now-ui-icons ui-1_simple-add"></i> Buat Soal
                </Button>
              </Link>
            </Col>
            <Table class="table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama Kelas</th>
                  <th className="text-center">Dibuat Oleh</th>
                  <th className="text-center">Jumlah Materi</th>
                  <th className="text-center">Jumlah Soal Quiz</th>
                  <th class="text-center">Tingkat</th>
                  <th class="text-center">Aksi</th>
                </tr>
              </thead>
              {load === false ? (
                listTable.length === 0 ? (
                  <div>
                    <Row>
                      <Col>
                        <img
                          width="250rem"
                          alt="..."
                          className="rounded"
                          src={require("assets/img/books.png")}
                        ></img>
                      </Col>
                      <Col>
                        <p className=" font-weight-bold text-dark">
                          Belum Ada Yang Membuat Kelas, Buat Kelas Pertamamu!{" "}
                          <br /> - Al-Qolam
                        </p>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  listTable?.map((list, index) => {
                    return list?.length === 0 ? (
                      <span>hsius</span>
                    ) : (
                      <tbody>
                        <tr>
                          <td class="text-center">{index + 1}</td>
                          <td>{list.pelajaran}</td>
                          <td className="text-center">
                            {list.guru === userid?.user?.name ? (
                              <span className="font-weight-bold">Saya</span>
                            ) : (
                              list.guru
                            )}
                          </td>
                          <td className="text-center">{list.chapter.length}</td>
                          <td className="text-center">{list.quiz.length}</td>
                          <td class="text-center">
                            {" "}
                            <span
                              className={` badge   mt-2 ${
                                list.tingkatan === "mudah"
                                  ? "badge-success"
                                  : list.tingkatan === "menengah"
                                  ? "badge-warning"
                                  : "badge-danger"
                              }`}
                            >
                              {list.tingkatan}
                            </span>
                          </td>
                          {list.user_id === userid?.user?.id ? (
                            <td class="td-actions text-center">
                              <Link to={`/detail-lesson/${list.id}`}>
                                <button
                                  type="button"
                                  rel="tooltip"
                                  class="btn btn-info"
                                >
                                  <i class="now-ui-icons travel_info"></i> Lihat
                                </button>
                              </Link>
                              <Link to={`/edit-lesson/${list.id}`}>
                                <button
                                  type="button"
                                  rel="tooltip"
                                  class="btn btn-success"
                                >
                                  <i class="now-ui-icons ui-2_settings-90"></i>{" "}
                                  Edit
                                </button>
                              </Link>
                              <button
                                type="button"
                                rel="tooltip"
                                class="btn btn-danger"
                                onClick={() => deleteLesson(list.id)}
                              >
                                <i class="now-ui-icons ui-1_simple-remove"></i>{" "}
                                Hapus
                              </button>
                            </td>
                          ) : (
                            <td class="td-actions text-center">
                              <Link to={`/detail-lesson/${list.id}`}>
                                <button
                                  type="button"
                                  rel="tooltip"
                                  class="btn btn-info"
                                >
                                  <i class="now-ui-icons travel_info"></i> Lihat
                                </button>
                              </Link>
                            </td>
                          )}
                        </tr>
                      </tbody>
                    );
                  })
                )
              ) : (
                BootstrapCardDataTable()
              )}
            </Table>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ShowAllLesson;
