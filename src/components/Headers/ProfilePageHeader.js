import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function ProfilePageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  const user = localStorage.getItem("token");
  const userJson = JSON.parse(user);
  const lessonLength = userJson?.user?.lesson?.length;
  const roleUser = userJson?.user?.role;
  const name = userJson?.user?.name;
  console.log(lessonLength);
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
                <h2>{lessonLength}</h2>
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
                <h2>jak</h2>
                <p>Kelas yang di Buat</p>
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
