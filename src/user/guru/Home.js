import DefaultFooter from "components/Footers/DefaultFooter";
import DetailHeader from "components/Headers/DetailHeader";
import React, { Component } from "react";
import ShowAllLesson from "./ShowAllLesson";
import BasicElements from "template/index-sections/BasicElements";
class HomeTeacher extends Component {
  render() {
    return (
      <div className="wrapper">
        <DetailHeader
          header="Hallo Guru!"
          subHeader="Kayfa Haaluk?"
          img={require("assets/img/my-bab.jpg")}
        />
        <ShowAllLesson />
        <BasicElements />
        <DefaultFooter />
      </div>
    );
  }
}

export default HomeTeacher;
