import { useDispatch, useSelector } from "react-redux";
import { RootState } from "configStore";
import { useEffect } from "react";
import gif from "asset/loading.gif";
import {
  getMovieShowing,
  getMovieShowingSearch,
  removeFilm,
} from "Slices/movie";
import { AppDispatch } from "configStore";
import { Tooltip, Table, Button, Row, Col, Input } from "antd";
import type { ColumnsType } from "antd/lib/table";
import Swal from "sweetalert2";
import FormMoive from "./FormMoive";
import {
  StarOutlined,
  DeleteOutlined,
  UserOutlined,
  EditFilled,
} from "@ant-design/icons";
import { Movie } from "Interface/movie";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const { Search } = Input;
const MovieItem = () => {
  const [visible, setVisible] = useState(false);
  const handleCloseForm = () => {
    setVisible(false);
  };

  async function handleRemoveMovie(idMovie: number) {
    await dispatch(removeFilm(idMovie))
      .unwrap()
      .then((originalPromiseResult) => {
        if (originalPromiseResult) {
          console.log(originalPromiseResult);
          Swal.fire({
            title: `Xóa Thành công`,
          });
          dispatch(getMovieShowing());
        }
      });
  }
  const [filmUpdate, setFilmUpdate] = useState<Movie>();
  const [typeAction, setTypeAction] = useState("update");
  const columns: ColumnsType<Movie> = [
    {
      title: "TÊN PHIM",
      width: 100,
      dataIndex: "tenPhim",
      key: "tenPhim",
    },
    {
      title: "MÃ PHIM",
      width: 70,
      dataIndex: "maPhim",
      key: "maPhim",
    },
    {
      title: "TRAILER",
      dataIndex: "trailer",
      key: "trailer",
      width: 180,
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <Tooltip placement="topLeft" title={text}>
          <a target="_blank" href={text}>
            {text}
          </a>
        </Tooltip>
      ),
    },
    {
      title: "BÍ DANH",
      width: 100,
      dataIndex: "biDanh",
      key: "biDanh",
    },
    {
      title: "HÌNH ẢNH",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      width: 150,
      render: (text) => (
        <img
          style={{ width: "100px", height: "100px", borderRadius: "10px" }}
          src={text}
        />
      ),
    },
    {
      title: "MÔ TẢ",
      dataIndex: "moTa",
      key: "moTa",
      width: 250,
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      ),
    },
    {
      title: "NGÀY KHỞI CHIẾU",
      dataIndex: "ngayKhoiChieu",
      key: "ngayKhoiChieu",
      width: 150,
    },
    {
      title: "ĐÁNH GIÁ",
      dataIndex: "danhGia",
      key: `danhGia`,
      width: 100,
      render: (text) => (
        <span>
          {text} <StarOutlined />
        </span>
      ),
    },
    {
      title: "Action",
      width: 150,

      render: (text, record, index) => (
        <>
          <Button
            type="primary"
            className="btnAdminP"
            icon={<EditFilled />}
            onClick={() => {
              // showModal();
              setVisible(true);
              setFilmUpdate(record);
              setTypeAction("update");
            }}
          >
            Sửa
          </Button>
          <Button
            onClick={() => {
              Swal.fire({
                icon: "question",
                title: `Bạn muốn xóa phim`,
                text: record.tenPhim,
                showCancelButton: true,
                confirmButtonColor: "#fb4226",
                cancelButtonColor: "rgb(167 167 167)",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleRemoveMovie(record.maPhim);
                }
              });
            }}
            key={index + 10000}
            type="primary"
            className="btnAdminP"
            danger
            icon={<DeleteOutlined />}
          >
            Xóa
          </Button>
          <NavLink to={`Movie-Schedule/${record.maPhim}`}>
            <Button className="btnAdminP" icon={<UserOutlined />}>
              Lịch Chiếu
            </Button>
          </NavLink>
        </>
      ),
    },
  ];
  const { movies, isloading, error } = useSelector(
    (state: RootState) => state.movie,
  );
  const data: Movie[] = movies;
  const [searchValue, setsearchValue] = useState("");

  const onSearch = async () => {
    if (searchValue) {
      await dispatch(getMovieShowingSearch(searchValue));
    } else if (searchValue === "") {
      await dispatch(getMovieShowing());
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchValue(e.target.value);
  };
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getMovieShowing());
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
    <div>
      <Row>
        <Col span={6}>
          <Search
            placeholder="Tìm tên phim"
            onSearch={onSearch}
            onChange={handleChange}
            defaultValue={searchValue}
            style={{ width: 200 }}
          />
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} scroll={{ x: 300 }} bordered />
      <FormMoive
        show={visible}
        close={handleCloseForm}
        filmUpdate={filmUpdate}
        type={typeAction}
      ></FormMoive>
    </div>
  );
};

export default MovieItem;
