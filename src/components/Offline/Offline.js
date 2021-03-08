import React from "react";

const Offline = () => {
  const user = localStorage.getItem("token");
  const userJson = JSON.parse(user);
  const roleUser = userJson?.user?.role;
  return (
    <React.Fragment>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <img
              alt="..."
              className="rounded"
              src={require("assets/img/dc.png")}
            ></img>
            <h2>
              Sepertinya Kamu Sedang Offline, Cobalah Untuk Mengubungkan Ke
              Jaringan Internet
            </h2>
          </div>
          <img
            width="50rem"
            alt="..."
            className="rounded"
            src={require("assets/img/brand-logo.png")}
          ></img>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Offline;
