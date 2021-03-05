import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "utils/constants";
// core components

function ProfilePageHeader() {
  let pageHeader = React.createRef();

  const user = localStorage.getItem("token");
  const userJson = JSON.parse(user);
  const roleUser = userJson?.user?.role;
  const access_token = userJson?.token?.token;
  const user_id = userJson?.user?.id;
  const name = userJson?.user?.name;
  const [listL, setListL] = useState();
  const [listM, setListM] = useState();

  async function fetchData() {
    axios
      .get(`${API_URL}pelajaran`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setListL(response.data);
      })
      .catch((error) => {
        let message = error.response;
        console.log(message);
      });
  }

  // async function fetchDataM() {
  //   axios
  //     .get(`${API_URL}bab`, {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     })
  //     .then((response) => {
  //       setListM(response.data);
  //     })
  //     .catch((error) => {
  //       let message = error.response;
  //       console.log(message);
  //     });
  // }

  // let filterM = listM.filter(function (materi) {
  //   // eslint-disable-next-line
  //   return materi.lesson_id == lesson_id;
  // });

  React.useEffect(() => {
    fetchData();
    // fetchDataM();
    // eslint-disable-next-line
  }, []);

  let filterL = listL?.filter(function (lesson) {
    // eslint-disable-next-line
    return lesson.user_id == user_id;
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/header2.jpg") + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container">
            <img alt="..." src={require("assets/img/muslim.png")}></img>
          </div>
          <h3 className="title text-capitalize">{name}</h3>
          {roleUser === "teacher" ? (
            <p className="category">Pengajar</p>
          ) : (
            <p className="category">
              {roleUser === "user" ? (
                <>Murid</>
              ) : roleUser === "teacher" ? (
                <>Pengajar</>
              ) : (
                roleUser
              )}
            </p>
          )}
          {roleUser === "user" ? (
            <div className="content">
              <div className="social-description">
                <h2>{listL?.length}</h2>
                <p>Sertifikat</p>
              </div>
              <div className="social-description">
                <h2>5</h2>
                <p>Progres Materi</p>
              </div>
            </div>
          ) : roleUser === "teacher" ? (
            <div className="content">
              <div className="social-description">
                <h2>{filterL?.length}</h2>
                <p>Kelas</p>
              </div>
            </div>
          ) : (
            <div className="content"></div>
          )}
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;
