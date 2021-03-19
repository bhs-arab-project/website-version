import React from "react";

// core components
import ListMateri from "user/murid/ListMateri";
import DetailHeader from "components/Headers/DetailHeader.js";
import TransparentFooter from "components/Footers/TransparentFooter";
import { withAuthUser } from "./../../auth/RouteAccess";

function BabPage(props) {
  const { token } = props;
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
      <div className="wrapper">
        <DetailHeader
          header="BAB MATERI"
          subHeader="pilih bab materi di bawah untuk mempelajarinya!"
          img={require("assets/img/bab-header.jpg")}
        />
        <ListMateri token={token} />
        <TransparentFooter />
      </div>
    </>
  );
}

export default withAuthUser(BabPage);
