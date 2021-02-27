import React, { Component } from "react";
import DefaultFooter from "components/Footers/DefaultFooter";
import BackComponent from "./BackComponent";
import DetailHeader from "components/Headers/DetailHeader";
export default class EditLesson extends Component {
  state = {};
  render() {
    return (
      <>
        <DetailHeader
          header="Edit Kelas"
          subHeader="Edit Kelas yang anda buat"
          img={require("assets/img/my-bab.jpg")}
        />
        <div className="section">
          <BackComponent />
          <h1>Edit Kelas</h1>
        </div>
        <DefaultFooter />
      </>
    );
  }
}
