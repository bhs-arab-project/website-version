import React from "react";

// reactstrap components
import {
  Badge,
  NavItem,
  NavLink,
  Nav,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Container,
  Row,
  Col,
} from "reactstrap";
import Button from "reactstrap/lib/Button";

// core components

function PaginationSection() {
  const [pills, setPills] = React.useState("2");
  return (
    <>
      <div className="section section-pagination">
        <Container>
          <div class="media">
            <img
              width="20%"
              alt="..."
              className="rounded-circle align-self-center mr-5"
              src={require("assets/img/muslim.png")}
            ></img>
            <div class="media-body">
              <h4>Progres Materi</h4>
              <div className="progress-container">
                <span className="progress-badge">BAB SHARAF</span>
                <Progress max="100" value="25">
                  <span className="progress-value">25%</span>
                </Progress>
              </div>
              <div className="progress-container">
                <span className="progress-badge">BAB SHARAF</span>
                <Progress max="100" value="25">
                  <span className="progress-value">25%</span>
                </Progress>
              </div>
              <div className="progress-container">
                <span className="progress-badge">BAB SHARAF</span>
                <Progress max="100" value="25">
                  <span className="progress-value">25%</span>
                </Progress>
              </div>
              <div className="progress-container">
                <span className="progress-badge">BAB SHARAF</span>
                <Progress max="100" value="25">
                  <span className="progress-value">25%</span>
                </Progress>
              </div>
              <div className="progress-container progress-info">
                <span className="progress-badge">BAB NAHWU</span>
                <Progress max="100" value="60">
                  <span className="progress-value">60%</span>
                </Progress>
              </div>
            </div>
          </div>
          {/* <br></br> */}
          <div className="space"></div>
          {/* <h4>Notifications</h4> */}
        </Container>
      </div>
    </>
  );
}

export default PaginationSection;
