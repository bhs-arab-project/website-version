import React from "react";
import Button from "reactstrap/lib/Button";
import "./notFound.css";

const NotFound = () => {
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
          <Button href="/index">Balik ke HomePage</Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
