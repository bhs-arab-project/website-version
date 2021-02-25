// import logo from './logo.svg';
import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
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

import CreateLesson from "./user/guru/CRUDLesson/CreateLesson";
import EditLesson from "./user/guru/CRUDLesson/EditLesson";
import DetailLesson from "./user/guru/CRUDLesson/DetailLesson";

import useToken from "./auth/useToken";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import CreateMateri from "./user/guru/CRUDMateri/CreateMateri";
import CreateTeacher from "user/guru/createTeacher.js";

function App() {
  const { token, setToken } = useToken();
  let history = document.URL.split("/");
  const user = localStorage.getItem("token");
  const userJson = JSON.parse(user);
  const roleUser = userJson?.user?.role;
  const nameUser = userJson?.user?.name;
  const accessToken = userJson?.token?.token;
  const idUser = userJson?.user?.id;

  // const roleUser = userJson?.token?.role[0];

  if (
    !token &&
    history[history.length - 1] !== "forgot-password" &&
    history[history.length - 1] !== "sign-up" &&
    history[history.length - 1] !== "nucleo-icons"
  ) {
    return <LoginPage setToken={setToken} />;
  }

  const options = {
    position: "bottom left",
    timeout: 5000,
    offset: "30px",
    transition: "scale",
    containerStyle: {
      zIndex: 1000,
    },
  };

  function RoleBasedRouting({ component: Component, roles, ...rest }) {
    return (
      <>
        {roles === roleUser && (
          <Route
            {...rest}
            render={(props) => (
              <>
                <Component {...props} />
              </>
            )}
          />
        )}
        {!roles === roleUser && <NotFound />}
      </>
    );
  }

  return (
    <div>
      <AlertProvider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <Switch>
            <RoleBasedRouting exact path="/" component={Home} roles="user" />

            {/* pelajar */}
            <Route exact path="/nucleo-icons" component={NucleoIcons} />

            <RoleBasedRouting
              exact
              path="/bab"
              component={BabPage}
              roles="user"
            />
            <RoleBasedRouting
              exact
              path="/detail-bab/:id"
              component={DetailBab}
              roles="user"
            />

            {/* end route pelajar */}

            {/* start route Guru */}
            <RoleBasedRouting
              exact
              path="/guru"
              component={TeacherHome}
              roles="teacher"
            />
            <RoleBasedRouting
              exact
              path="/create-lesson"
              component={CreateLesson}
              roles="teacher"
            />
            <RoleBasedRouting
              exact
              path="/create-chapter"
              component={CreateMateri}
              roles="teacher"
            />
            <RoleBasedRouting
              exact
              path="/edit-lesson/:id"
              component={EditLesson}
              roles="teacher"
            />
            <Route
              path="/detail-lesson/:id"
              render={() => <DetailLesson />}
              roles="teacher"
            />
            <Route
              path="/create-teacher"
              render={() => <CreateTeacher />}
              roles="teacher"
            />

            {/* end route Guru */}
            <Route path="/sign-up" render={() => <SignUp />} />
            <Route path="/login-page" render={() => <LoginPage />} />
            <Route
              exact
              path="/profile-page"
              component={ProfilePage}
              userRole={roleUser}
            />
            <Route exact path="/materi/:id" component={Materi} />
            <Route path="/forgot-password" render={() => <ForgotPassword />} />
            <Route path="*" render={() => <NotFound />} />
          </Switch>
        </BrowserRouter>
      </AlertProvider>
    </div>
  );
}

export default App;
