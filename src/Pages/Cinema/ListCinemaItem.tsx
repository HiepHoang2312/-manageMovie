import { useDispatch, useSelector } from "react-redux";
import { RootState } from "configStore";
import { useEffect } from "react";
import { getCinemaList } from "Slices/cinema";
import { AppDispatch } from "configStore";
import { Tooltip, Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/lib/table";

import { Cinema } from "Interface/cinema";
import { NavLink } from "react-router-dom";

const columns: ColumnsType<Cinema> = [
  {
    title: "MÃ HỆ THỐNG RẠP",
    dataIndex: "maHeThongRap",

    key: "maHeThongRap",
  },
  {
    title: "LOGO",
    dataIndex: "logo",
    key: "logo",

    render: (text) => <img src={text} width={50} height={50} />,
  },
  {
    title: "TÊN HỆ THỐNG RẠP",
    dataIndex: "tenHeThongRap",
    key: "tenHeThongRap",
  },
  { title: "MÃ NHÓM", dataIndex: "maNhom", key: "maNhom" },
  {
    title: "ACTION",
    key: "operation",
    width: 150,
    render: (text, record, index) => (
      <NavLink to={`clusterCinema/${record.maHeThongRap}`}>
        {
          <Button danger className="btnAdminP">
            Cụm rạp
          </Button>
        }
      </NavLink>
    ),
  },
];

const ListCinemaItem = () => {
  const { cinemas, isloading, error } = useSelector(
    (state: RootState) => state.cinema,
  );
  const data: Cinema[] = cinemas;

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCinemaList());
  }, []);
  if (isloading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <div className="loadingio-spinner-spinner-hd458l8xbrs ">
              <div className="ldio-engoxtquu0e">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <div className="loadingio-spinner-spinner-hd458l8xbrs ">
              <div className="ldio-engoxtquu0e">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="adminManage">
        <div className="title">DANH SÁCH HỆ THỐNG RẠP </div>
      </div>
      <Table columns={columns} dataSource={data} scroll={{ x: 300 }} bordered />
    </div>
  );
};

export default ListCinemaItem;
