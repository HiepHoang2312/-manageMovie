import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AppDispatch, RootState } from "configStore";
import { CumRapChieuPhim, ListRapinfo } from "Interface/cinema";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

const ListRap = () => {
  const { maCumRap } = useParams();
  console.log(maCumRap, "mã");

  const { cinemaGroup } = useSelector((state: RootState) => state.cinema);

  const columns: ColumnsType<ListRapinfo> = [
    {
      title: "MÃ RẠP",
      dataIndex: "maRap",
      key: "maRap",
    },
    {
      title: "TÊN  RẠP",
      dataIndex: "tenRap",
      key: "tenRap",
    },
  ];
  let data: ListRapinfo[] = [];
  cinemaGroup.map((cn) => {
    cn.danhSachRap.map((dsr) => {
      if (cn.maCumRap === maCumRap) {
        data.push({ maRap: dsr.maRap, tenRap: dsr.tenRap });
      }
    });
  });

  return (
    <div className="container">
      <div className="adminManage">
        <div className="title">DANH SÁCH RẠP CỦA CỤM RẠP {maCumRap}</div>
      </div>
      <Table columns={columns} dataSource={data} scroll={{ x: 300 }} bordered />
    </div>
  );
};

export default ListRap;
