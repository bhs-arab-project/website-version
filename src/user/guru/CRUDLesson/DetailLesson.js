import React, { Component } from "react";
import DetailHeader from "components/Headers/DetailHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter";
import BackComponent from "./BackComponent";

export default class DetailLesson extends Component {
  // state = {  }

  render() {
    return (
      <>
        <DetailHeader
          header="Detail Pelajaran"
          subHeader="Detail pelajaran Nahwu"
          img={require("assets/img/my-bab.jpg")}
        />
        <div className="section">
          <BackComponent />

          <h1>Detail Pelajaran</h1>
        </div>
        <DefaultFooter />
      </>
    );
  }
}
