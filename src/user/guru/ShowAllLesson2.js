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
import ButtonGroup from "reactstrap/lib/ButtonGroup";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const ShowAllLessonBeta = (props) => {
  const [load, setLoad] = useState(true);
  let [listTable, setListTable] = React.useState([]);
  let [typeList, setTypeList] = React.useState("AllClass");
  const { SearchBar } = Search;

  const { userRole, token, userId } = props;

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total py-2 px-2">
      Menampilkan {from} hingga {to} dari {size} Hasil
    </span>
  );

  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "25",
        value: 25,
      },
      {
        text: "Semua",
        value: listTable.length,
      },
    ],
  };

  async function fetchData() {
    axios
      .get(`${API_URL}pelajaran`, {
        headers: {
          Authorization: `Bearer ${token}`,
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

  let myClass = listTable?.filter(function (e) {
    // eslint-disable-next-line
    return e.user_id == userId;
  });

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
              Authorization: `Bearer ${token}`,
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

  function allDataEmpty() {
    return (
      <div className="container text-left">
        <p className=" font-weight-bold text-dark">
          {userRole === "admin" ? (
            <>Belum Ada Yang Membuat Pelajaran</>
          ) : (
            <>
              Belum Ada Yang Membuat Pelajaran, Buat Pelajaran Pertamamu! <br />{" "}
              - Al-Qolam
            </>
          )}
        </p>
        <img
          width="250rem"
          alt="..."
          className="rounded float-right"
          src={require("assets/img/books.png")}
        ></img>
      </div>
    );
  }

  function myDataEmpty() {
    return (
      <div className="container text-left">
        <p className=" font-weight-bold text-dark">
          Kamu Belum Membuat Pelajaran apapun, Buat Pelajaran Pertamamu! <br />{" "}
          - Al-Qolam
        </p>
        <img
          width="250rem"
          alt="..."
          className="rounded float-right"
          src={require("assets/img/books.png")}
        ></img>
      </div>
    );
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  function createdFormatter(cell, row) {
    if (row.user_id === userId) {
      return <span className="font-weight-bold">Saya</span>;
    }

    return <span>{cell}</span>;
  }

  function tingkatFormatter(cell, row) {
    if (row.tingkatan) {
      return (
        <span
          className={` badge mt-2 ${
            cell === "mudah"
              ? "badge-success"
              : cell === "menengah"
              ? "badge-warning"
              : "badge-danger"
          }`}
        >
          {cell}
        </span>
      );
    }

    return <span>{cell}</span>;
  }

  function quizFormatter(cell, row) {
    if (row.quiz.length === 0) {
      return <span>-</span>;
    }

    return <span>{cell}</span>;
  }

  function chapterFormatter(cell, row) {
    if (row.chapter.length === 0) {
      return <span>-</span>;
    }

    return <span>{cell}</span>;
  }

  const columns = [
    {
      dataField: "pelajaran",
      text: "Nama Kelas",
      sort: true,
    },
    {
      dataField: "tingkatan",
      text: "Tingkat Kesulitan",
      sort: true,
      headerStyle: () => {
        return { width: "17%" };
      },
      align: "center",
      formatter: tingkatFormatter,
    },
    {
      dataField: "guru",
      text: "Dibuat Oleh",
      sort: true,
      formatter: createdFormatter,
    },
    {
      dataField: "chapter.length",
      text: "Jumlah Materi",
      sort: true,
      align: "center",
      headerAlign: "center",
      formatter: chapterFormatter,
    },
    {
      dataField: "quiz.length",
      text: "Jumlah Soal",
      sort: true,
      align: "center",
      headerAlign: "center",
      formatter: quizFormatter,
    },
    {
      dataField: "link",
      text: "Aksi",
      align: "center",
      headerAlign: "center",
      headerStyle: () => {
        return { width: "28%" };
      },
      formatter: (rowContent, row) => {
        return (
          <>
            {row.user_id === userId || userRole === "admin" ? (
              <div className="td-actions text-center">
                <Link to={`/detail-lesson/${row.id}`}>
                  <button type="button" rel="tooltip" className="btn btn-info">
                    <i className="now-ui-icons travel_info"></i> Lihat
                  </button>
                </Link>
                {userRole === "admin" ? (
                  <></>
                ) : (
                  <Link to={`/edit-lesson/${row.id}`}>
                    <button
                      type="button"
                      rel="tooltip"
                      className="btn btn-success"
                    >
                      <i className="now-ui-icons ui-2_settings-90"></i> Edit
                    </button>
                  </Link>
                )}
                <button
                  type="button"
                  rel="tooltip"
                  className="btn btn-danger"
                  onClick={() => deleteLesson(row.id)}
                >
                  <i className="now-ui-icons ui-1_simple-remove"></i> Hapus
                </button>
              </div>
            ) : (
              <div className="td-actions text-center">
                <Link to={`/detail-lesson/${row.id}`}>
                  <button type="button" rel="tooltip" className="btn btn-info">
                    <i className="now-ui-icons travel_info"></i> Lihat
                  </button>
                </Link>
              </div>
            )}
          </>
        );
      },
    },
  ];

  const expandRow = {
    renderer: (row) => (
      <div>
        <h5>{`Deskripsi Kelas ${row.pelajaran}`}</h5>
        <p className="font-weight-normal">{row.deskripsi}</p>
      </div>
    ),
  };

  React.useEffect(() => {
    setLoad(true);
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="section section-tabs" id={"section1"}>
        <Container>
          <Row className="d-flex justify-space-between">
            <ToolkitProvider
              bootstrap4
              keyField="id"
              data={typeList === "MyClass" ? myClass : listTable}
              columns={columns}
              defaultSorted={defaultSorted}
              search
            >
              {(props) => (
                <div>
                  <Row>
                    <Col>
                      {(() => {
                        // eslint-disable-next-line
                        switch (typeList) {
                          case "AllClass":
                            return <h2>Daftar Kelas</h2>;
                          case "MyClass":
                            return <h2>Daftar Kelas Saya</h2>;
                        }
                      })()}
                      {userRole === "admin" ? (
                        <></>
                      ) : (
                        <ButtonGroup>
                          <button
                            type="button"
                            className={`btn ${
                              typeList === "AllClass"
                                ? "btn-outline-info"
                                : "btn-info"
                            }`}
                            onClick={(e) => setTypeList("MyClass")}
                          >
                            <img
                              width="25rem"
                              src={
                                typeList === "MyClass"
                                  ? "./my-list-active.png"
                                  : "./my-list.png"
                              }
                              alt="..."
                            />
                          </button>
                          <button
                            type="button"
                            className={`btn ${
                              typeList === "AllClass"
                                ? "btn-info"
                                : "btn-outline-info"
                            }`}
                            onClick={(e) => setTypeList("AllClass")}
                          >
                            <img
                              width="25rem"
                              src={
                                typeList === "AllClass"
                                  ? "./group-list-active.png"
                                  : "./group-list.png"
                              }
                              alt="..."
                            />
                          </button>
                        </ButtonGroup>
                      )}
                      <span className="ml-2">Cari : </span>
                      <SearchBar
                        {...props.searchProps}
                        placeholder="Search .."
                      />
                      {userRole === "admin" ? (
                        <></>
                      ) : (
                        <>
                          <Link to="/create-lesson">
                            <Button color="info" className="float-right">
                              <i className="now-ui-icons ui-1_simple-add"></i>{" "}
                              Buat Kelas
                            </Button>
                          </Link>
                          <Link to={`/create-chapter`}>
                            <Button color="success" className="float-right">
                              <i className="now-ui-icons ui-1_simple-add"></i>{" "}
                              Buat Materi
                            </Button>
                          </Link>
                          <Link to={`/create-question`}>
                            <Button color="primary" className="float-right">
                              <i className="now-ui-icons ui-1_simple-add"></i>{" "}
                              Buat Soal
                            </Button>
                          </Link>
                        </>
                      )}
                    </Col>
                  </Row>

                  {load === false ? (
                    <BootstrapTable
                      hover
                      bordered={false}
                      expandRow={expandRow}
                      {...props.baseProps}
                      pagination={paginationFactory(options)}
                      noDataIndication={
                        typeList === "MyClass" ? myDataEmpty : allDataEmpty
                      }
                    />
                  ) : (
                    <BootstrapCardDataTable />
                  )}
                </div>
              )}
            </ToolkitProvider>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ShowAllLessonBeta;
