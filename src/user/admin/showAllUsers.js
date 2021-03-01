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

const ShowAllUsers = () => {
  const [load, setLoad] = useState(true);
  let [listTable, setListTable] = React.useState([]);

  let filterTeachers = listTable.filter(function (user) {
    return user.role === "teacher";
  });

  let filterStudents = listTable.filter(function (user) {
    return user.role === "user";
  });

  const user = localStorage.getItem("token");
  const userid = JSON.parse(user);
  const access_token = userid?.token?.token;

  async function fetchData() {
    axios
      .get(`${API_URL}user`, {
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

  async function deleteTeacher(id, name) {
    swal({
      title: "Menghapus Guru",
      text: `Apakah Kamu Yakin Menghapus Guru ${name}?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${API_URL}user/${id}`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then((res) => {
            swal({
              title: "Berhasil!",
              text: "Guru Terhapus!",
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
              text: "Gagal Menghapus Guru, Silahkan Coba Lagi",
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
      <div className="section section-tabs">
        <Container>
          <Row className="d-flex justify-space-between">
            <Col>
              <h2>Daftar Guru</h2>
            </Col>
            <Col>
              <Link to="/create-teacher">
                <Button color="info" className="float-right">
                  Daftarkan Guru Baru
                </Button>
              </Link>
            </Col>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama Guru</th>
                  <th className="text-center h-5">Email Guru</th>
                  <th className="text-center">Jumlah Kelas</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              {load === false
                ? filterTeachers?.map((list, index) => {
                    return (
                      <tbody>
                        <tr>
                          <td class="text-center">{index + 1}</td>
                          <td>{list.name}</td>

                          <td className="text-center">{list.email}</td>
                          <td class="text-center">
                            {" "}
                            {list.lesson.length === 0 ? (
                              <>-</>
                            ) : (
                              list.lesson.length
                            )}
                          </td>
                          <td class="td-actions text-center">
                            <button
                              type="button"
                              rel="tooltip"
                              class="btn btn-danger"
                              onClick={() => deleteTeacher(list.id, list.name)}
                            >
                              <i class="now-ui-icons ui-1_simple-remove"></i>{" "}
                              Hapus
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
                : BootstrapCardDataTable()}
            </table>
          </Row>
          <Row className="d-flex justify-space-between">
            <Col>
              <h2>Daftar Pelajar</h2>
            </Col>

            <table class="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama Pelajar</th>
                  <th className="text-center h-5">Email Pelajar</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              {load === false
                ? filterStudents?.map((list, index) => {
                    return (
                      <tbody>
                        <tr>
                          <td class="text-center">{index + 1}</td>
                          <td>{list.name}</td>

                          <td className="text-center">{list.email}</td>

                          <td class="td-actions text-center">
                            <button
                              type="button"
                              rel="tooltip"
                              class="btn btn-danger"
                              onClick={() => deleteTeacher(list.id, list.name)}
                            >
                              <i class="now-ui-icons ui-1_simple-remove"></i>{" "}
                              Hapus
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
                : BootstrapCardDataTable()}
            </table>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ShowAllUsers;
