import React from "react";
import "./materi.css";
import { Link } from "react-router-dom";

import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavItem,
  NavLink,
} from "reactstrap";

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
              <a href="#">Pengenalan 1</a>
            </li>
            <div className="line"></div>
            <li>
              <a href="#">Pengenalan 2</a>
            </li>
            <div className="line"></div>
            <li>
              <a href="#">Pengenalan 3</a>
            </li>
            <div className="line"></div>
            <li>
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

        <div className="konten">
          <nav className="baratas navbar-expand-lg navbar-light bg-light">
            <button type="button" id="sidebarCollapse" className="btn btn-info">
              <i className="fa fa-align-justify"></i> <span></span>
            </button>
            <button
              class="navbar-toggler"
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
                  <a class="nav-link" href="#">
                    Home <span class="sr-only">(current)</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="konten-bungkus">
            <h2>Muqodimmah</h2>

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

            <div className="line"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MateriPage;
