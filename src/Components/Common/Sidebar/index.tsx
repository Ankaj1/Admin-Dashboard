import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/dashboard">
              <i className="fa fa-tachometer" aria-hidden="true"></i>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/users">
              <i className="fa fa-users" aria-hidden="true"></i>
              Users
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/products">
              {" "}
              <i className="fa fa-list" aria-hidden="true"></i>
              Products
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Sidebar;
