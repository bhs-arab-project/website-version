import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import Button from "reactstrap/lib/Button";
import DefaultFooter from "components/Footers/DefaultFooter";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Spinner from "reactstrap/lib/Spinner";

const { SearchBar } = Search;

function badgeFormatter(cell, row) {
  return (
    <div className="text-center">
      <span class="badge badge-primary mt-2">{cell}</span>
    </div>
  );
}

const columns = [
  {
    dataField: "id",
    text: "#",
    headerStyle: () => {
      return { width: "5%" };
    },
    sort: true,
  },
  {
    dataField: "pelajaran",
    text: "Pelajaran",
    sort: true,
  },
  {
    dataField: "guru",
    text: "Mentor",
    sort: true,
  },
  {
    dataField: "jumlah_materi",
    text: "Jumlah Materi",
    sort: true,
    headerStyle: () => {
      return { width: "15%" };
    },
  },
  {
    dataField: "tingkatan",
    text: "Tingkat",
    sort: true,
    formatter: badgeFormatter,
    headerStyle: () => {
      return { "text-align": "center" };
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
    getLessonList: state.lessons.getLessonList,
    errorLessonList: state.lessons.errorLessonList,
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

const ShowAllLesson = (props) => {
  function indication() {
    return (
      <div>
        <span>Anda belum membuat Pelajaran apapun.</span>
        <br />
        <Button color="info">Buat Pelajaran</Button>
      </div>
    );
  }
  // console.log("getLessonList", props.getLessonList);
  return (
    <>
      <div className="section section-tabs">
        <Container>
          {props.getLessonList ? (
            <ToolkitProvider
              keyField="id"
              data={props.getLessonList}
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
                      <h2>Semua Pelajaran</h2>
                    </Col>
                    <Col>
                      <div className="float-right">
                        <span>Cari : </span>
                        <SearchBar {...props.searchProps} />
                        <Link to="/my-lesson">
                          <button
                            type="button"
                            rel="tooltip"
                            className="btn btn-primary ml-2"
                          >
                            <i class="now-ui-icons ui-1_simple-add"></i>{" "}
                            Pelajaran Saya
                          </button>
                        </Link>
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
          ) : (
            <Container>
              <h2>Semua Pelajaran</h2>
              <div className="text-center">
                {props.errorLessonList ? (
                  <h1>{props.errorLessonList}</h1>
                ) : (
                  <Spinner color="info"></Spinner>
                )}
              </div>
            </Container>
          )}
        </Container>
      </div>
    </>
  );
};

export default connect(mapStateToProps, null)(ShowAllLesson);
