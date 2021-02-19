// import logo from './logo.svg';
import React, { useState } from "react";

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

import MyLesson from "./user/guru/CRUDLesson/MyLesson";
import CreateLesson from "./user/guru/CRUDLesson/CreateLesson";
import EditLesson from "./user/guru/CRUDLesson/EditLesson";
import DetailLesson from "./user/guru/CRUDLesson/DetailLesson";

import useToken from "./auth/useToken";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

function App() {
  const { token, setToken } = useToken();
  let history = document.URL.split("/");

  if (
    !token &&
    history[history.length - 1] !== "forgot-password" &&
    history[history.length - 1] !== "sign-up" &&
    history[history.length - 1] !== "nucleo-icons"
  ) {
    return <LoginPage setToken={setToken} />;
  }

  const options = {
    position: "top right",
    timeout: 5000,
    offset: "30px",
    transition: "scale",
    containerStyle: {
      zIndex: 100,
    },
  };

  return (
    <div>
      <AlertProvider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <Switch>
            //pelajar
            <Route exact path="/" render={() => <Home />} />
            <Route path="/nucleo-icons" render={() => <NucleoIcons />} />
            <Route path="/profile-page" render={() => <ProfilePage />} />
            <Route path="/bab" render={() => <BabPage />} />
            <Route path="/detail-bab/:id" render={() => <DetailBab />} />
            <Route path="/materi/:id" render={() => <Materi />} />
            {/* end route pelajar */}
            {/* start route Guru */}
            <Route exact path="/guru" render={() => <TeacherHome />} />
            <Route exact path="/my-lesson" render={() => <MyLesson />} />
            <Route path="/create-lesson" render={() => <CreateLesson />} />
            <Route path="/edit-lesson/:id" render={() => <EditLesson />} />
            <Route path="/detail-lesson/:id" render={() => <DetailLesson />} />
            {/* end route Guru */}
            <Route path="/sign-up" render={() => <SignUp />} />
            <Route path="/login-page" render={() => <LoginPage />} />
            <Route path="/forgot-password" render={() => <ForgotPassword />} />
            <Route path="*" render={() => <NotFound />} />
            <Redirect to="/login-page" />
          </Switch>
        </BrowserRouter>
      </AlertProvider>
    </div>
  );
}

export default App;
