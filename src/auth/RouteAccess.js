import NotFound from "components/NotFound/notFound";
import React from "react";

export const withAuthUser = (Component) => {
  const AuthRoute = () => {
    const user = localStorage.getItem("token");
    const userJson = JSON.parse(user);
    const roleUser = userJson?.user?.role;
    if (roleUser === "user" || roleUser === "admin") {
      return <Component />;
    } else {
      return <NotFound />;
    }
  };

  return AuthRoute;
};

export const withAuthTeacher = (Component) => {
  const AuthRoute = () => {
    const user = localStorage.getItem("token");
    const userJson = JSON.parse(user);
    const roleUser = userJson?.user?.role;
    if (roleUser === "teacher" || roleUser === "admin") {
      return <Component />;
    } else {
      return <NotFound />;
    }
  };

  return AuthRoute;
};
