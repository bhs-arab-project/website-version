import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";
import DetailHeader from "../../../components/Headers/DetailHeader";
import ExamplesNavbar from "../../../components/Navbars/ExamplesNavbar";
import IndexNavbar from "../../../components/Navbars/IndexNavbar";
import BootstrapTable from "react-bootstrap-table-next";
import Button from "reactstrap/lib/Button";
import DefaultFooter from "components/Footers/DefaultFooter";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const { SearchBar } = Search;

const columns = [
  {
    dataField: "lesson.id",
    text: "#",
    headerStyle: () => {
      return { width: "5%" };
    },
    sort: true,
  },
  {
    dataField: "lesson.pelajaran",
    text: "Pelajaran",
    sort: true,
  },
  {
    dataField: "lesson.jumlah_materi",
    text: "Jumlah Materi",
    sort: true,
  },
  {
    dataField: "lesson.tingkatan",
    text: "Tingkat",
    sort: true,
  },
  {
    dataField: "link",
    text: "Aksi",
    formatter: (rowContent, row) => {
      return (
        <div className="text-center">
          <Link to={"detail-lesson/" + row.id}>
            <button type="button" rel="tooltip" class="btn btn-info">
              <i class="now-ui-icons travel_info"></i> Lihat
            </button>
          </Link>
          <Link to={"edit-lesson/" + row.id}>
            <button type="button" rel="tooltip" class="btn btn-success">
              <i class="now-ui-icons ui-2_settings-90"></i> Edit
            </button>
          </Link>

          <button type="button" rel="tooltip" class="btn btn-danger">
            <i class="now-ui-icons ui-1_simple-remove"></i> Hapus
          </button>
        </div>
      );
    },
  },
];
const defaultSorted = [
  {
    dataField: "id",
    order: "esc",
  },
];

const mapStateToProps = (state) => {
  return {
    getTeacherList: state.teachers.getTeacherList,
    errorTeacherList: state.teachers.errorTeacherList,
  };
};

const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    {" "}
    Menampilkan {from} sampai {to} dari {size} data
  </span>
);

const options = {
  paginationSize: 4,
  pageStartIndex: 1,

  firstPageText: "Pertama",
  prePageText: "Sebelumnya",
  nextPageText: "Selanjutnya",
  lastPageText: "Terakhir",
  nextPageTitle: "Halaman Pertama",
  prePageTitle: "Halaman Sebelumnya",
  firstPageTitle: "Halaman Selanjutnya",
  lastPageTitle: "Halaman Terakhir",
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
      text: "50",
      value: 50,
    },
  ], // A numeric array is also available. the purpose of above example is custom the text
};
// core components

const ShowMyLesson = (props) => {
  function indication() {
    return (
      <div>
        <span>Anda belum membuat Pelajaran apapun.</span>
        <br />
        <Button color="info">Buat Pelajaran</Button>
      </div>
    );
  }

  return (
    <>
      <div className="section section-tabs">
        <Container>
          {/* <h2>Pelajaran Saya</h2> */}
          {props.getTeacherList ? (
            <ToolkitProvider
              keyField="id"
              data={props.getTeacherList}
              columns={columns}
              noDataIndication={indication}
              hover="true"
              bodyClasses="true"
              bordered={false}
              defaultSorted={defaultSorted}
              search
            >
              {(props) => (
                <div>
                  <Row>
                    <Col>
                      <Link to="/create-lesson">
                        <button
                          type="button"
                          rel="tooltip"
                          class="btn btn-primary"
                        >
                          <i class="now-ui-icons ui-1_simple-add"></i> Buat
                          Pelajaran Baru
                        </button>
                      </Link>
                    </Col>
                    <Col>
                      <div className="float-right">
                        <span>Cari : </span>
                        <SearchBar {...props.searchProps} />
                      </div>
                    </Col>
                  </Row>

                  <BootstrapTable
                    {...props.baseProps}
                    pagination={paginationFactory(options)}
                  />
                </div>
              )}
            </ToolkitProvider>
          ) : null}
        </Container>
      </div>
    </>
  );
};

export default connect(mapStateToProps, null)(ShowMyLesson);
