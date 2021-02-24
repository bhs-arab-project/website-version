import React, { Component } from "react";
import DetailHeader from "components/Headers/DetailHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter";
import BackComponent from "./BackComponent";

export default class EditLesson extends Component {
  state = {};
  render() {
    return (
      <>
        <DetailHeader
          header="Edit Pelajaran"
          subHeader="Edit pelajaran yang anda buat"
          img={require("assets/img/my-bab.jpg")}
        />
        <div className="section">
          <BackComponent />
          <h1>Edit Pelajaran</h1>
        </div>
        <DefaultFooter />
      </>
    );
  }
}
