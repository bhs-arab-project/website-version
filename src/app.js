// import logo from './logo.svg';
import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./user/Home.js";
import LoginPage from "auth/LoginPage";
import ForgotPassword from "auth/forgotPassword";
import BabPage from "./user/murid/Bab-page";
import ProfilePage from "./user/Profile-page";
import SignUp from "./auth/SignUpPage.js";
import Materi from "./user/murid/materi.js";
import NotFound from "components/NotFound/notFound";

import CreateLesson from "./user/guru/CRUDLesson/CreateLesson";
import DetailLesson from "./user/guru/CRUDLesson/DetailLesson";

import useToken from "./auth/useToken";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import CreateMateri from "./user/guru/CRUDMateri/CreateMateri";
import CreateTeacher from "user/admin/createTeacher.js";
import Quiz from "./user/guru/CRUDQuiz/Quiz";
import CreateQuiz from "./user/guru/CRUDQuiz/CreateQuiz";
import EditMateri from "./user/guru/CRUDMateri/EditMateri";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BabDetail from "./user/murid/Bab-detail.js";
import MyQuizList from "user/guru/CRUDQuiz/Quizlist.js";

function App() {
  const { token, setToken } = useToken();
  let history = document.URL.split("/");

  const user = localStorage.getItem("token");
  const userJson = JSON.parse(user);
  const roleUser = userJson?.user?.role;
  const userName = userJson?.user?.name;
  const userEmail = userJson?.user?.email;
  const access_token = userJson?.token?.token;
  const id = userJson?.user?.id;

  if (
    !token &&
    history[history.length - 1] !== "forgot-password" &&
    history[history.length - 1] !== "sign-up"
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

  return (
    <div>
      <AlertProvider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  userRole={roleUser}
                  name={userName}
                  emailUser={userEmail}
                  token={access_token}
                  userId={id}
                />
              )}
            />

            {/* start User Route */}

            <Route exact path="/bab" render={() => <BabPage />} />
            <Route exact path="/detail-bab/:id" render={() => <BabDetail />} />
            <Route
              exact
              path="/quiz/:id"
              render={() => <Quiz token={access_token} roleUser={roleUser} />}
            />

            {/* end User route */}

            {/* start Teacher route */}

            <Route
              exact
              path="/create-lesson"
              render={() => (
                <CreateLesson name={userName} token={access_token} id={id} />
              )}
            />
            <Route
              exact
              path="/create-chapter"
              render={() => <CreateMateri token={access_token} userId={id} />}
            />

            <Route
              path="/edit-materi/:id"
              render={() => <EditMateri token={access_token} userId={id} />}
            />
            <Route
              path="/detail-lesson/:id"
              render={() => <DetailLesson token={access_token} idUser={id} />}
            />

            <Route
              path="/create-question"
              render={() => <CreateQuiz token={access_token} userId={id} />}
            />

            <Route
              exact
              path="/quiz-list/:id"
              render={() => <MyQuizList token={access_token} idUser={id} />}
            />

            {/* end Teacher route */}
            {/* start Admin route */}
            <Route path="/create-teacher" render={() => <CreateTeacher />} />
            {/* end Admin Route */}
            <Route path="/sign-up" render={() => <SignUp />} />
            <Route path="/login-page" render={() => <LoginPage />} />
            <Route
              exact
              path="/profile-page"
              render={() => (
                <ProfilePage
                  role={roleUser}
                  name={userName}
                  emailUser={userEmail}
                  token={access_token}
                  id={id}
                />
              )}
            />
            <Route path="/bab-materi/:id" component={Materi} />
            <Route path="/forgot-password" render={() => <ForgotPassword />} />
            <Route path="*" render={() => <NotFound />} />
          </Switch>
        </BrowserRouter>
      </AlertProvider>
    </div>
  );
}

export default App;
