// import logo from './logo.svg';
import React, { Component } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./user/Home.js";
import TeacherHome from "./user/guru/Home";
import NucleoIcons from "template/NucleoIcons.js";
import LoginPage from "auth/LoginPage";
import ForgotPassword from "auth/forgotPassword";
import BabPage from "./user/murid/Bab-page";
import ProfilePage from "./user/Profile-page";
import SignUp from "./auth/SignUpPage.js";
import DetailBab from "./user/murid/Bab-detail.js";
import Materi from "./user/murid/materi.js";
import NotFound from "components/NotFound/notFound";
import ProtectedRoute from "./auth/ProtectedRoute";
import ProtectedUserLogin from "./auth/ProtectedLogin";
import MyLesson from "./user/guru/CRUDLesson/MyLesson";
import CreateLesson from "./user/guru/CRUDLesson/CreateLesson";
import EditLesson from "./user/guru/CRUDLesson/EditLesson";
import DetailLesson from "./user/guru/CRUDLesson/DetailLesson";
import IndexNavbar from "components/Navbars/IndexNavbar.js";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            //pelajar
            <Route exact path="/" render={(props) => <Home {...props} />} />
            <Route
              path="/nucleo-icons"
              render={(props) => <NucleoIcons {...props} />}
            />
            <Route
              path="/profile-page"
              render={(props) => <ProfilePage {...props} />}
            />
            <Route path="/bab" render={(props) => <BabPage {...props} />} />
            <Route
              path="/detail-bab/:id"
              render={(props) => <DetailBab {...props} />}
            />
            <Route
              path="/materi/:id"
              render={(props) => <Materi {...props} />}
            />
            {/* end route pelajar */}
            {/* start route Guru */}
            <Route exact path="/guru" render={(props) => <TeacherHome />} />
            <Route exact path="/my-lesson" render={(props) => <MyLesson />} />
            <Route path="/create-lesson" render={(props) => <CreateLesson />} />
            <Route path="/edit-lesson/:id" render={(props) => <EditLesson />} />
            <Route
              path="/detail-lesson/:id"
              render={(props) => <DetailLesson />}
            />
            {/* end route Guru */}
            <ProtectedUserLogin
              path="/sign-up"
              render={(props) => <SignUp {...props} />}
            />
            <ProtectedUserLogin
              path="/login-page"
              render={(props) => <LoginPage {...props} />}
            />
            <Route
              path="/forgot-password"
              render={(props) => <ForgotPassword {...props} />}
            />
            <Route path="*" render={(props) => <NotFound {...props} />} />
            <Redirect to="/login-page" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
