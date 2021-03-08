import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import ShowAllLessonBeta from "user/guru/ShowAllLesson2.js";
import ShowAllUsersBeta from "./ShowAllTeachers";
import ShowAllStudents from "./ShowAllStudents";

const ListControl = () => {
  let [typeList, setTypeList] = React.useState("TeachersList");

  return (
    <>
      <div className="section section-tabs" id={"sectionList"}>
        <Container>
          <Button color="info" onClick={(e) => setTypeList("TeachersList")}>
            <i className="now-ui-icons ow-ui-icons travel_info"></i> Daftar
            Pengajar
          </Button>
          <Button color="success" onClick={(e) => setTypeList("StudentsList")}>
            <i className="now-ui-icons ow-ui-icons travel_info"></i> Daftar
            Pelajar
          </Button>
          <Button color="primary" onClick={(e) => setTypeList("LessonsList")}>
            <i className="now-ui-icons ow-ui-icons travel_info"></i> Daftar
            Kelas
          </Button>
        </Container>
        {(() => {
          // eslint-disable-next-line
          switch (typeList) {
            case "TeachersList":
              return <ShowAllUsersBeta />;
            case "StudentsList":
              return <ShowAllStudents />;
            case "LessonsList":
              return <ShowAllLessonBeta />;
          }
        })()}
      </div>
    </>
  );
};

export default ListControl;
