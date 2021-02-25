import React from "react";
import { Link } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import "./notFound.css";

const NotFound = () => {
  const user = localStorage.getItem("token");
  const userJson = JSON.parse(user);
  const roleUser = userJson?.user?.role;
  return (
    <React.Fragment>
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <img
              alt="..."
              className="rounded"
              src={require("assets/img/pnf.png")}
            ></img>
            <h1>Duhh!</h1>
            <h2>404 - Halamannya ga ketemu nih</h2>
          </div>
          <img
            width="50rem"
            alt="..."
            className="rounded"
            src={require("assets/img/brand-logo.png")}
          ></img>
          {roleUser === "user" ? (
            <Link to="/" className="notFoundLink">
              <Button color="primary">Kembali ke Beranda</Button>
            </Link>
          ) : roleUser === "teacher" ? (
            <Link to="/guru" className="notFoundLink">
              <Button color="primary">Kembali ke Beranda</Button>
            </Link>
          ) : roleUser === "admin" ? (
            <Link to="/admin" className="notFoundLink">
              <Button color="primary">Kembali ke Beranda</Button>
            </Link>
          ) : (
            <Link to="/" className="notFoundLink">
              <Button color="primary">Kembali ke Beranda</Button>
            </Link>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
