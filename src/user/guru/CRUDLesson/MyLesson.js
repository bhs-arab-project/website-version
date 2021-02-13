import DefaultFooter from "components/Footers/DefaultFooter";
import DetailHeader from "components/Headers/DetailHeader";
import React, { Component } from "react";
import ShowMyLesson from "./ShowMyLesson";

class MyLesson extends Component {
  render() {
    return (
      <div className="wrapper">
        <DetailHeader
          header="Pelajaran Saya"
          subHeader="Menampilkan semua pelajaran yang anda buat"
          img={require("assets/img/my-bab.jpg")}
        />
        <ShowMyLesson />
        <DefaultFooter />
      </div>
    );
  }
}

export default MyLesson;
