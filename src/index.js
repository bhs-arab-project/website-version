/*

=========================================================
* Now UI Kit React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2020 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
import "assets/demo/demo.css?v=1.4.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.4.0";
// pages for this kit
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "views/examples/LoginPage.js";
import BabPage from "views/examples/BabPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import SignUp from "./views/examples/SignUpPage.js";
import DetailBab from "./views/index-sections/Bab-detail.js";
import Materi from "./views/index-sections/materi.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/index" render={(props) => <Index {...props} />} />
        <Route
          path="/nucleo-icons"
          render={(props) => <NucleoIcons {...props} />}
        />

        <Route
          path="/profile-page"
          render={(props) => <ProfilePage {...props} />}
        />

        <Route path="/signup" render={(props) => <SignUp {...props} />} />

        <Route
          path="/login-page"
          render={(props) => <LoginPage {...props} />}
        />

        <Route path="/bab" render={(props) => <BabPage {...props} />} />

        <Route
          path="/detail-bab"
          render={(props) => <DetailBab {...props} />}
        />

        <Route path="/materi" render={(props) => <Materi {...props} />} />

        <Redirect to="/login-page" />
        <Redirect from="/" to="/login-page" />
      </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
