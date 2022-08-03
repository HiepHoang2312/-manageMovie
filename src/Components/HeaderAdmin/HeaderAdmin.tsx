import { Avatar, Layout, Select } from "antd";
import { Option } from "antd/lib/mentions";
import { NavLink, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import logo from "asset/images/logo.png";
const { Sider, Header } = Layout;
const HeaderAdmin = () => {
  let navigate = useNavigate();
  const username = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string).taiKhoan
    : "";
  const handleChange = (value: string) => {
    if (value == "logout") {
      localStorage.removeItem("user");
      localStorage.removeItem("typeUser");
      localStorage.removeItem("accessToken");
      window.location.reload();
    }
  };
  /* if (!localStorage.getItem("user")) {
    return navigate("/Admin", { replace: true });
  } */
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light navAdmin">
      <NavLink className="navbar-brand" to="/">
        <img src={logo} width={50} height={50} />
      </NavLink>

      <div
        /* className="collapse navbar-collapse" */
        id="collapsibleNavId navAdminItem"
      >
        <ul className="navbar-nav  mt-2 mr-5 mt-lg-0">
          <li className="user">
            <Avatar
              size="large"
              style={{
                color: "#dc2003",
                backgroundColor: "#fde3cf",
                marginRight: "10px",
              }}
              icon={<UserOutlined />}
            />
            <Select
              value={username}
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="logout">Logout</Option>
            </Select>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HeaderAdmin;
