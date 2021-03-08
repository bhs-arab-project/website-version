import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";

import Tabs from "./murid/ListMateri.js";

import "../styles.css";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import ShowAllUsersBeta from "./admin/ShowAllTeachers.js";
import ShowAllLessonBeta from "./guru/ShowAllLesson2.js";
import ListControl from "./admin/ListControl.js";

function Index() {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  const user = localStorage.getItem("token");
  const userName = JSON.parse(user);
  const role = userName?.user?.role;
  return (
    <>
      <IndexNavbar />
      {role === "user" ? (
        <div className="wrapper">
          <IndexHeader />
          <div className="main">
            <div className="section">
              <Container>
                <blockquote className="blockquote text-center text-info border-0">
                  <p id="arab">
                    اُطْلُبِ العِلْمَ مِنَ الـمَهْدِ إِلَى اللَّحْدِ
                  </p>
                  <i id="latin">
                    Tuntutlah ilmu dari sejak di buaian sampai liang lahat.
                  </i>
                  <p id="arti">uthlubil-‘ilma manal-mahdi ilal-lahdi</p>
                </blockquote>
              </Container>
            </div>
            <Tabs />
          </div>
          <TransparentFooter />
        </div>
      ) : role === "teacher" ? (
        <div className="wrapper">
          <IndexHeader />
          <ShowAllLessonBeta />
          {/* <HookButtonSwitch /> */}
          <TransparentFooter />
        </div>
      ) : (
        <div className="wrapper">
          <IndexHeader />
          <ListControl />
          <TransparentFooter />
        </div>
      )}
    </>
  );
}

export default Index;
