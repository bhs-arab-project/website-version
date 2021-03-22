import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "utils/constants";
// core components

function ProfilePageHeader(props) {
  let pageHeader = React.createRef();

  const user = localStorage.getItem("token");
  const userJson = JSON.parse(user);
  const access_token = userJson?.token?.token;
  const user_id = userJson?.user?.id;
  const [listL, setListL] = useState();
  const [load, setLoad] = useState(false);

  async function fetchData() {
    axios
      .get(`${API_URL}pelajaran`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setLoad(false);
        setListL(response.data);
      })
      .catch((error) => {
        let message = error.response;
        console.log(message);
      });
  }

  React.useEffect(() => {
    setLoad(true);
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
          <h3 className="title text-capitalize">
            {props.name === undefined ? (
              <p className="text-secondary">memuat...</p>
            ) : (
              props.name
            )}
          </h3>
          {props.roleUser === "teacher" ? (
            <p className="category">Pengajar</p>
          ) : (
            <p className="category">
              {props.roleUser === "user" ? (
                <>Murid</>
              ) : props.roleUser === "teacher" ? (
                <>Pengajar</>
              ) : (
                props.roleUser
              )}
            </p>
          )}
          {props.roleUser === "user" ? (
            <div className="content">
              <div className="social-description">
                <h2>{listL?.length}</h2>
                <p>Sertifikat</p>
              </div>
            </div>
          ) : props.roleUser === "teacher" ? (
            <div className="content">
              <div className="social-description">
                {load === false ? (
                  filterL?.length === 0 ? (
                    <p>-</p>
                  ) : (
                    <h2>{filterL?.length}</h2>
                  )
                ) : (
                  <p className="text-secondary">memuat...</p>
                )}
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
