import React, { Component } from "react";
import DetailHeader from "components/Headers/DetailHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter";
// import backComponent from "./backComponent";

export default class editAdminProfile extends Component {
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
          {/* <BackComponent /> */}

          <h1>Edit Profile</h1>
        </div>
        <DefaultFooter />
      </>
    );
  }
}
