/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="https://github.com/orgs/bhs-arab-project/"
                target="_blank"
              >
                GitHub
              </a>
            </li>
            <li>
              <a href="https://smkmadinatulquran.sch.id/" target="_blank">
                Our School
              </a>
            </li>
            {/* <li>
              <a
                href="http://blog.creative-tim.com?ref=nukr-dark-footer"
                target="_blank"
              >
                Blog
              </a>
            </li> */}
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          CopyRight © {new Date().getFullYear()}, Second Team{" "}
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
