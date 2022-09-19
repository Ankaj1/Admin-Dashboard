import { Dropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
// import avtar from "";
import avtar from "./../../../../src/assets/default-avatar.png";

const Header = () => {
  const navigate = useNavigate();

  const LogOut = () => {
    // localStorage.removeItem("token", response.data.token);
    navigate("/");
  };
  return (
    <>
      <div className="Header">
        <Navbar expand="lg">
          <Navbar.Brand href="#home">Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <img src={avtar} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" onClick={LogOut}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};
export default Header;
