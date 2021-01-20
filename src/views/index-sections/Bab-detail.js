import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import BabDetailHeader from "components/Headers/BabDetailHeader.js";
import DefaultFooter from "../../components/Footers/DefaultFooter";
import Tabs from "../index-sections/Tabs";
import IndexNavbar from "../../components/Navbars/IndexNavbar";

function LandingPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <BabDetailHeader />
        <Container className="mt-4">
          <div class="card rounded">
            <div class="card-body">
              <div className="row">
                <div className="col-md-10 col-xs-2 col-sm-3 d-inline">
                  <div className="row">
                    <div className="col-md-1 col-xs-3 col-sm-2 mt-1">
                      <img
                        // width="50%"
                        alt="..."
                        className="rounded-circle "
                        src={require("assets/img/book2.png")}
                      ></img>
                    </div>
                    <div className="col-md-5 col-xs-4 col-sm-5 mt-3">
                      <p className="category text-black">
                        Materi 1 - Pengenalan
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-xs-1 col-sm-1 px-1 text-right d-inline">
                  <Button color="info" href="/materi">
                    Mulai belajar
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div class="card rounded">
            <div class="card-body">
              <div className="row">
                <div className="col-md-10 col-xs-5 col-sm-4">
                  <div className="row">
                    <div className="col-md-1 col-xs-3 col-sm-2 mt-1">
                      <img
                        // width="50%"
                        alt="..."
                        className="rounded-circle "
                        src={require("assets/img/book2.png")}
                      ></img>
                    </div>
                    <div className="col-md-5 col-xs-4 col-sm-5 mt-3">
                      <p className="category text-black">
                        Materi 1 - Pengenalan
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-xs-1 col-sm-1 px-1 text-right">
                  <Button color="info">Mulai belajar</Button>
                </div>
              </div>
            </div>
          </div>
          <div class="card rounded">
            <div class="card-body">
              <div className="row">
                <div className="col-md-10 col-xs-5 col-sm-4">
                  <div className="row">
                    <div className="col-md-1 col-xs-3 col-sm-2 mt-1">
                      <img
                        // width="50%"
                        alt="..."
                        className="rounded-circle "
                        src={require("assets/img/book2.png")}
                      ></img>
                    </div>
                    <div className="col-md-5 col-xs-4 col-sm-5 mt-3">
                      <p className="category text-black">
                        Materi 1 - Pengenalan
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-xs-1 col-sm-1 px-1 text-right">
                  <Button color="info">Mulai belajar</Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <DefaultFooter />
      </div>
    </>
  );
}

export default LandingPage;
