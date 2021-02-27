import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  function handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

  const user = localStorage.getItem("token");
  const userName = JSON.parse(user);
  const role = userName?.user?.role;

  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <Link to="/">
              <NavbarBrand id="navbar-brand">
                <img
                  width="50rem"
                  alt="..."
                  className="rounded mr-1"
                  src={require("assets/img/brand-logo.png")}
                ></img>
                Al-Qolam
              </NavbarBrand>
            </Link>

            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              {role === "user" ? (
                <NavItem>
                  <Link to="/bab" className="text-decoration-none">
                    <NavLink>
                      <i className="now-ui-icons files_single-copy-04"></i>
                      <span>Bab Materi</span>
                    </NavLink>
                  </Link>
                </NavItem>
              ) : null}

              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  href="#pablo"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <i
                    aria-hidden="true"
                    class="now-ui-icons users_single-02"
                  ></i>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/profile-page" tag={Link}>
                    <i className="now-ui-icons arrows-1_minimal-right mr-1"></i>
                    detail profil
                  </DropdownItem>

                  <DropdownItem onClick={handleLogout} tag={Link}>
                    <i
                      className="now-ui-icons arrows-1_minimal-right
"
                    ></i>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
