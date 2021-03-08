import React, { useState } from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

import { API_URL } from "utils/constants";
import BootstrapCardDataTable from "../../components/loader/loaderTable";
import axios from "axios";
import { Link } from "react-router-dom";
import Col from "reactstrap/lib/Col";
import swal from "sweetalert";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const ShowAllStudents = () => {
  const [load, setLoad] = useState(true);
  let [listTable, setListTable] = React.useState([]);
  const { SearchBar } = Search;

  let filterStudents = listTable.filter(function (user) {
    return user.role === "user";
  });

  const user = localStorage.getItem("token");
  const userid = JSON.parse(user);
  const access_token = userid?.token?.token;

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
        value: filterStudents.length,
      },
    ],
  };

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

  async function deleteStudent(id) {
    swal({
      title: "Menghapus Guru",
      text: `Apakah Kamu Yakin Menghapus User?`,
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
              text: "User Terhapus!",
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
              text: "Gagal Menghapus User, Silahkan Coba Lagi",
              icon: "error",
              timer: 2000,
              button: false,
            });
          });
      }
    });
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const columnsUser = [
    {
      dataField: "name",
      text: "Nama Pelajar",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email Pelajar",
      sort: true,
    },
    {
      dataField: "link",
      text: "Aksi",
      formatter: (rowContent, row) => {
        return (
          <div>
            <button
              type="button"
              rel="tooltip"
              className="btn btn-danger"
              onClick={() => deleteStudent(row.id)}
            >
              <i className="now-ui-icons ui-1_simple-remove"></i> Hapus
            </button>
          </div>
        );
      },
    },
  ];

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
            <ToolkitProvider
              bootstrap4
              keyField="id"
              data={filterStudents}
              columns={columnsUser}
              defaultSorted={defaultSorted}
              search
            >
              {(props) => (
                <div>
                  <Row>
                    <Col>
                      <h2>Daftar Pelajar</h2>
                    </Col>
                    <Col>
                      <div className="float-right">
                        <span>Cari : </span>
                        <SearchBar
                          {...props.searchProps}
                          placeholder="Search .."
                        />
                      </div>
                    </Col>
                  </Row>
                  {load === false ? (
                    <BootstrapTable
                      hover
                      bordered={false}
                      {...props.baseProps}
                      pagination={paginationFactory(options)}
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

export default ShowAllStudents;
