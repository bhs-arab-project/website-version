import DefaultFooter from "components/Footers/DefaultFooter";
import DetailHeader from "components/Headers/DetailHeader";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeacherList } from "user/actions/teacherAction";
import ShowMyLesson from "./ShowMyLesson";

class MyLesson extends Component {
  componentDidMount() {
    this.props.dispatch(getTeacherList());
  }
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

export default connect()(MyLesson);
