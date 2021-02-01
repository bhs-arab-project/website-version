import React from "react";

// reactstrap components
import { Progress, Container } from "reactstrap";

// core components

function PaginationSection() {
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
                <span className="progress-badge">BAB PERCAKAPAN</span>
                <Progress max="100" value="25">
                  <span className="progress-value">25%</span>
                </Progress>
              </div>
              <div className="progress-container">
                <span className="progress-badge">BAB MUFRADAT</span>
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
