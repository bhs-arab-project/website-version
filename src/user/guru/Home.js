import DefaultFooter from "components/Footers/DefaultFooter";
import DetailHeader from "components/Headers/DetailHeader";
import React, { Component } from "react";
import ShowAllLesson from "./ShowAllLesson";

class HomeTeacher extends Component {
  render() {
    const user = sessionStorage.getItem("token");
    const userName = JSON.parse(user);
    return (
      <div className="wrapper">
        <DetailHeader
          header={`Hallo ${userName?.user?.name}!`}
          subHeader="Anda Masuk Sebagai Guru"
          img={require("assets/img/my-bab.jpg")}
        />
        <ShowAllLesson />
        <DefaultFooter />
      </div>
    );
  }
}

export default HomeTeacher;
