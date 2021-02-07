import DefaultFooter from "components/Footers/DefaultFooter";
import DetailHeader from "components/Headers/DetailHeader";
import React, { Component } from "react";
import Container from "reactstrap/lib/Container";
import BackComponent from "./BackComponent";

export default class CreateLesson extends Component {
  state = {};
  render() {
    return (
      <>
        <DetailHeader
          header="Buat Pelajaran"
          subHeader="buat pelajaran yang anda inginkan sekarang!"
          img={require("assets/img/my-bab.jpg")}
        />
        <div className="section ">
          <Container>
            <BackComponent />
            {/* <h2>Buat Pelajaran</h2> */}
          </Container>
        </div>
        <DefaultFooter />
      </>
    );
  }
}
