import DefaultFooter from "components/Footers/DefaultFooter";
import DetailHeader from "components/Headers/DetailHeader";
import React, { Component } from "react";
import ShowAllLesson from "./ShowAllLesson";
import { connect } from "react-redux";
import { getLessonList } from "../actions/lessonAction";
class HomeTeacher extends Component {
  componentDidMount() {
    this.props.dispatch(getLessonList());
  }
  render() {
    return (
      <div className="wrapper">
        <DetailHeader
          header="Hallo Guru!"
          subHeader="Kayfa Haaluk?"
          img={require("assets/img/my-bab.jpg")}
        />
        <ShowAllLesson />
        <DefaultFooter />
      </div>
    );
  }
}

export default connect()(HomeTeacher);