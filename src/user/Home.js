import React from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DarkFooter from "components/Footers/DarkFooter.js";

// sections for this page
// import Navbars from "./index-sections/Navbars.js";
import Tabs from "./murid/ListMateri.js";
// import Notifications from "./index-sections/Notifications.js";
// import Typography from "./index-sections/Typography.js";
// import Javascript from "./index-sections/Javascript.js";
// import Carousel from "./index-sections/Carousel.js";
// import NucleoIcons from "./index-sections/NucleoIcons.js";
// import CompleteExamples from "./index-sections/CompleteExamples.js";
// import SignUp from "../murid/auth/SignUpPage.js";
// import Examples from "./index-sections/Examples.js";
// import Download from "./index-sections/Download.js";
import "../styles.css";
import Quote from "template/index-sections/Quote.js";
import ShowAllTeacher from "user/admin/showAllTeacher";
import DetailHeader from "./../components/Headers/DetailHeader";
import ShowAllLesson from "./guru/ShowAllLesson.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

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
            <Quote />
            <Tabs />
          </div>
          <DarkFooter />
        </div>
      ) : role === "teacher" ? (
        <div className="wrapper">
          <IndexHeader />
          <ShowAllLesson />
          <DefaultFooter />
        </div>
      ) : (
        <div className="wrapper">
          <IndexHeader />
          <ShowAllTeacher />
          <DefaultFooter />
        </div>
      )}
    </>
  );
}

export default Index;
