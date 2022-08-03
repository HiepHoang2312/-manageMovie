import HeaderAdmin from "Components/HeaderAdmin/HeaderAdmin";
import { Outlet, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  InsertRowBelowOutlined,
  HddOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Breadcrumb, Layout, Menu } from "antd";
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminTemplate() {
  const pathLocation = useLocation();
  const getPath = pathLocation.pathname;
  const path = getPath.split("/").filter((item) => item);

  const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu defaultSelectedKeys={["1"]} mode="inline" theme="dark">
            <SubMenu
              key="sub1"
              title="Quản lý Phim"
              icon={<InsertRowBelowOutlined />}
            >
              <Menu.Item key={1}>
                <NavLink to="movie">Movie List</NavLink>
              </Menu.Item>
              <Menu.Item key={5}>
                <NavLink to="addmovie">Thêm phim</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title="Quản lý User" icon={<UserOutlined />}>
              <Menu.Item key={2}>
                <NavLink to="User">User List</NavLink>
              </Menu.Item>
              <Menu.Item key={6}>
                <NavLink to="addUser">Thêm user</NavLink>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub4" title="Quản lý Rạp" icon={<LaptopOutlined />}>
              <Menu.Item key={4}>
                <NavLink to="Cinema">Cinema List</NavLink>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <HeaderAdmin></HeaderAdmin>
          <Content style={{ margin: "0 16px" }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              },
            )}

            <Breadcrumb style={{ margin: "16px 0" }}>
              {path.map((paths, index) => {
                const route = `/${path.slice(0, index + 1).join("/")}`;

                const isLast = index === path.length - 1;
                return isLast ? (
                  <Breadcrumb.Item key={index}>
                    {/*  <NavLink key={index} to={`${paths}`}> */}
                    {paths}
                    {/* </NavLink> */}
                  </Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item key={index}>
                    <NavLink key={index} to={`${route}`}>
                      {paths}
                    </NavLink>
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Outlet></Outlet>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>©2022 Created by Hiệp</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default AdminTemplate;
