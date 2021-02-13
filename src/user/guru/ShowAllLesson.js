import React, { useState } from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

import { API_URL } from "utils/constants";
import BootstrapCardDataTable from "../../components/loader/loaderTable";
import axios from "axios";
import { Link } from "react-router-dom";
import Col from "reactstrap/lib/Col";
import Button from "reactstrap/lib/Button";

const ShowAllLesson = () => {
  const [load, setLoad] = useState(true);
  let [listTable, setListTable] = React.useState([]);

  const user = sessionStorage.getItem("token");
  const userid = JSON.parse(user);

  async function fetchData() {
    axios
      .get(`${API_URL}pelajaran`)
      .then((response) => {
        setLoad(false);
        setListTable(response.data);
      })
      .catch((error) => {
        let message = error.response;
        console.log(message);
      });
  }

  function deleteContact(id) {
    // Issue DELETE request
    axios
      .delete(`https://jsonplaceholder.typicode.com/pelajaran/${id}`)
      .then(() => {
        // Issue GET request after item deleted to get updated list
        // that excludes user of id
        return axios.get(`https://jsonplaceholder.typicode.com/pelajaran`);
      })
      .then((res) => {
        // Update pelajaran in state as per-usual
        const pelajaran = res.data;
        this.setState({ pelajaran });
      });
  }

  React.useEffect(() => {
    setLoad(true);
    fetchData();
  }, []);

  return (
    <>
      <div className="section section-tabs">
        <Container>
          <Row className="d-flex justify-space-between">
            <Col>
              <h2>Semua Pelajaran</h2>
            </Col>
            <Col>
              <Link to="/create-lesson">
                <Button color="info" className="float-right">
                  Buat Pelajaran
                </Button>
              </Link>
            </Col>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama Pelajaran</th>
                  <th className="text-center">Dibuat Oleh</th>
                  <th className="text-center">Jumlah Materi</th>
                  <th class="text-center">Tingkat</th>
                  <th class="text-center">Aksi</th>
                </tr>
              </thead>
              {load === false
                ? listTable?.map((list, index) => {
                    return (
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
                          <td class="text-center">
                            {" "}
                            <span class="badge badge-warning">
                              {list.tingkatan}
                            </span>
                          </td>
                          {list.teacher_id == userid?.user?.id ? (
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
                              <button
                                type="button"
                                rel="tooltip"
                                class="btn btn-success"
                              >
                                <i class="now-ui-icons ui-2_settings-90"></i>{" "}
                                Edit
                              </button>
                              <button
                                type="button"
                                rel="tooltip"
                                class="btn btn-danger"
                                onClick={() => deleteContact(list.id)}
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
                : BootstrapCardDataTable()}
            </table>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ShowAllLesson;
