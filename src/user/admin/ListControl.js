import React from "react";
import { Button, Container } from "reactstrap";
import ShowAllLessonBeta from "user/guru/ShowAllLesson2.js";
import ShowAllUsersBeta from "./ShowAllTeachers";
import ShowAllStudents from "./ShowAllStudents";

const ListControl = () => {
  let [typeList, setTypeList] = React.useState("TeachersList");

  const user = localStorage.getItem("token");
  const userJson = JSON.parse(user);
  const roleUser = userJson?.user?.role;
  const access_token = userJson?.token?.token;
  const id = userJson?.user?.id;

  return (
    <>
      <div className="section section-tabs" id={"sectionList"}>
        <Container>
          <button
            className={`btn ${
              typeList === "TeachersList" ? "btn-info" : "btn-outline-info"
            }`}
            onClick={(e) => setTypeList("TeachersList")}
          >
            <i className="now-ui-icons ow-ui-icons travel_info"></i> Daftar
            Pengajar
          </button>
          <button
            className={`btn ${
              typeList === "StudentsList" ? "btn-info" : "btn-outline-info"
            }`}
            onClick={(e) => setTypeList("StudentsList")}
          >
            <i className="now-ui-icons ow-ui-icons travel_info"></i> Daftar
            Murid
          </button>
          <button
            className={`btn ${
              typeList === "LessonsList" ? "btn-info" : "btn-outline-info"
            }`}
            onClick={(e) => setTypeList("LessonsList")}
          >
            <i className="now-ui-icons ow-ui-icons travel_info"></i> Daftar
            Kelas
          </button>
        </Container>
        {(() => {
          // eslint-disable-next-line
          switch (typeList) {
            case "TeachersList":
              return <ShowAllUsersBeta />;
            case "StudentsList":
              return <ShowAllStudents />;
            case "LessonsList":
              return (
                <ShowAllLessonBeta
                  userRole={roleUser}
                  token={access_token}
                  userId={id}
                />
              );
          }
        })()}
      </div>
    </>
  );
};

export default ListControl;
