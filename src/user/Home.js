import React from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";

import Tabs from "./murid/ListMateri.js";

import "../styles.css";
import Quote from "template/index-sections/Quote.js";
import ShowAllUsers from "user/admin/showAllUsers.js";
import ShowAllLesson from "./guru/ShowAllLesson.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";

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
          <TransparentFooter />
        </div>
      ) : role === "teacher" ? (
        <div className="wrapper">
          <IndexHeader />
          <ShowAllLesson />
          <TransparentFooter />
        </div>
      ) : (
        <div className="wrapper">
          <IndexHeader />
          <ShowAllUsers />
          <TransparentFooter />
        </div>
      )}
    </>
  );
}

export default Index;
