import { Button } from "antd";
import Table from "antd/lib/table";
import { ColumnsType } from "antd/lib/table";
import { AppDispatch, RootState } from "configStore";
import { CumRapChieu, CumRapChieuPhim } from "Interface/cinema";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { getClusterCinema } from "Slices/cinema";

const ClusterCinema = () => {
  const { maHeThongRap } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getClusterCinema(maHeThongRap!));
  }, [maHeThongRap]);

  const { cinemaGroup } = useSelector((state: RootState) => state.cinema);
  const data: CumRapChieuPhim[] = cinemaGroup;
  console.log(cinemaGroup);

  const columns: ColumnsType<CumRapChieuPhim> = [
    {
      title: "MÃ CỤM RẠP",
      dataIndex: "maCumRap",
      key: "maCumRap",
      width: 30,
    },
    {
      title: "TÊN CỤM RẠP",
      dataIndex: "tenCumRap",
      key: "tenCumRap",
      width: 20,
    },
    {
      title: "ĐỊA CHỈ",
      dataIndex: "diaChi",
      key: "diaChi",
      width: 100,
    },
    {
      title: "ACTION",
      key: "operation",
      fixed: "right",
      width: 30,
      render: (text, record) => (
        <NavLink to={`ListRap/${record.maCumRap}`}>
          <Button type="primary">List Rạp</Button>
        </NavLink>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="adminManage">
        <div className="title">
          DANH SÁCH CỤM RẠP CỦA HỆ THỐNG RẠP {maHeThongRap}
        </div>
      </div>
      <Table columns={columns} dataSource={data} scroll={{ x: 300 }} bordered />
    </div>
  );
};

export default ClusterCinema;
