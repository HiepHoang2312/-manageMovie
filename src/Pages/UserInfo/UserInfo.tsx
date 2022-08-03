import type { ColumnsType } from "antd/lib/table";
import { AppDispatch, RootState } from "configStore";
import { TTDatVe } from "Interface/user";
import moment from "moment";
import { Table, Tag } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getInfoUser } from "Slices/user";

const UserInfo = () => {
  const { taiKhoan } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getInfoUser(taiKhoan!));
  }, [taiKhoan]);
  const { userInFo } = useSelector((state: RootState) => state.user);
  let data: TTDatVe[] = [];
  console.log(userInFo, "Info");

  userInFo?.thongTinDatVe.map((ttdv) => {
    data.push({
      maVe: ttdv.maVe,
      tenPhim: ttdv.tenPhim,
      ngayDat: ttdv.ngayDat,
      thoiLuongPhim: ttdv.thoiLuongPhim,
      giaVe: ttdv.giaVe,
      danhSachGhe: ttdv.danhSachGhe,
    });
  });
  const listChairCharacters = [
    { number: 16, char: "A" },
    { number: 32, char: "B" },
    { number: 48, char: "C" },
    { number: 64, char: "D" },
    { number: 80, char: "E" },
    { number: 96, char: "F" },
    { number: 112, char: "G" },
    { number: 128, char: "H" },
    { number: 144, char: "I" },
    { number: 160, char: "J" },
  ];
  const setChair = (index: number) => {
    let result;
    for (let i = 0; i < listChairCharacters.length; i++) {
      if (
        index <= listChairCharacters[i].number &&
        index >= listChairCharacters[i].number - 15
      ) {
        let h = 0;
        let indexSeat = 0;
        for (
          let j = listChairCharacters[i].number - 16;
          j <= listChairCharacters[i].number;
          j++
        ) {
          if (index == j) {
            indexSeat = h;
            break;
          }
          h++;
        }
        if (indexSeat < 10) {
          result = ` ${listChairCharacters[i].char} 0${indexSeat}`;
        } else {
          result = ` ${listChairCharacters[i].char}  ${indexSeat}`;
        }
      }
    }
    return result;
  };
  const columns: ColumnsType<TTDatVe> = [
    {
      title: "MÃ VÉ",
      key: "maVe",
      width: 100,
      dataIndex: "maVe",
    },
    {
      title: "TÊN PHIM",
      key: "tenPhim",
      dataIndex: "tenPhim",
      width: 100,
    },

    {
      title: "NGÀY ĐẶT",
      dataIndex: "ngayDat",
      key: "ngayDat",
      width: 100,
      render: (text) => (
        <span>{moment(text).format("DD/MM/YYYY hh:mm:ss")}</span>
      ),
    },
    {
      title: "GIÁ VÉ",
      dataIndex: "giaVe",
      key: "giaVe",
      width: 100,
      render: (text) => <span>{text} VNĐ</span>,
    },
    {
      title: "THỜI LƯỢNG",
      dataIndex: "thoiLuongPhim",
      key: "thoiLuongPhim",
      width: 100,
      render: (text) => <span>{text} phút</span>,
    },
    {
      title: "HỆ THỐNG RẠP",
      dataIndex: "danhSachGhe",
      key: "danhSachGhe",
      width: 200,
      render: (text, record, index) => (
        <Tag>{record.danhSachGhe[0].tenHeThongRap}</Tag>
      ),
    },
    {
      title: "RẠP",
      dataIndex: "danhSachGhe",
      key: "danhSachGhe",
      width: 100,
      render: (text, record, index) => (
        <Tag>{record.danhSachGhe[0].tenRap}</Tag>
      ),
    },
    {
      title: "GHẾ",
      dataIndex: "danhSachGhe",
      key: "danhSachGhe",
      width: 100,
      render: (text, record, index) =>
        record.danhSachGhe.map((ds, index) => {
          return <Tag>{setChair(+ds.tenGhe)}</Tag>;
        }),
    },
  ];

  return (
    <div className="container">
      <div className="adminManage">
        <div className="title">
          THÔNG TIN ĐẶT VÉ CỦA TÀI KHOẢN
          <span className="fw-bold fs-2">{taiKhoan}</span>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 300, y: 500 }}
        bordered
      />
    </div>
  );
};

export default UserInfo;
