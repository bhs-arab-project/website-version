import React from "react";
import "./materi.css";

import { Button } from "reactstrap";

function MateriPage() {
  return (
    <>
      <div className="bungkus">
        <nav id="sidebar">
          <div className="sidebar-header">
            <h3>Materi 1 - Pengenalan</h3>
          </div>

          <ul className="list-unstyled components">
            <li>
              {/* eslint-disable-next-line */}
              <a href="#">Pengenalan 1</a>
            </li>
            <div className="line"></div>
            <li>
              {/* eslint-disable-next-line */}
              <a href="#">Pengenalan 2</a>
            </li>
            <div className="line"></div>
            <li>
              {/* eslint-disable-next-line */}
              <a href="#">Pengenalan 3</a>
            </li>
            <div className="line"></div>
            <li>
              {/* eslint-disable-next-line */}
              <a href="#">Pengenalan 4</a>
            </li>
          </ul>

          <ul className="list-unstyled CTAs">
            <li>
              <a href="/index" className="download">
                Kembali ke Home
              </a>
            </li>
          </ul>
        </nav>

        <div class="konten">
          <nav class="baratas navbar-expand-lg navbar-light bg-light">
            <button type="button" id="sidebarCollapse" class="btn btn-info">
              <i class="fa fa-align-justify"></i> <span>Menu</span>
            </button>

            <button
              class="navbar-toggler float-right mt-2"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/bab">
                    <i class="now-ui-icons files_single-copy-04"></i>{" "}
                    <span>Bab Materi</span>
                  </a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link" href="/profil-page">
                    <i class="now-ui-icons users_single-02"></i>{" "}
                    <span>Profil</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div class="konten-bungkus">
            <h2>Collapsible Sidebar Using Bootstrap 4</h2>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <div class="line"></div>
            <h2>Collapsible Sidebar Using Bootstrap 4</h2>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div class="line"></div>
            <div className="text-right  d-flex justify-content-between">
              <Button color="info">
                <i class="now-ui-icons arrows-1_minimal-left"></i> Materi
                Sebelumnya
              </Button>
              <Button color="info">
                Lanjut Materi{" "}
                <i class="now-ui-icons arrows-1_minimal-right"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MateriPage;
