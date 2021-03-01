/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
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
                <a href="https://smkmadinatulquran.sch.id/">Our School</a>
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
            CopyRight © {new Date().getFullYear()}, Al-Qolam{" "}
          </div>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
