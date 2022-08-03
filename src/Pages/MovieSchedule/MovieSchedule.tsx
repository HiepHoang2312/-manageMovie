import { AppDispatch, RootState } from "configStore";
import { lcFilm, MovieScheduleInfo, SysCinemaForm } from "Interface/cinema";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  getCinemaList,
  getClusterCinema,
  getMovieSchedule,
} from "Slices/cinema";
import type { ColumnsType } from "antd/lib/table";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Table,
  Modal,
  Select,
  DatePicker,
  TimePicker,
} from "antd";
import { InteractionOutlined } from "@ant-design/icons";
import moment from "moment";
import logo from "asset/images/logo.png";
import { Movie } from "Interface/movie";
import { addMovieShowTime } from "Slices/movie";
const MovieSchedule = () => {
  const { Option } = Select;
  const { movies } = useSelector((state: RootState) => state.movie);
  const { movieSchedule, cinemas, cinemaGroup } = useSelector(
    (state: RootState) => state.cinema,
  );
  const { maPhim } = useParams();

  const dataMovie: Movie[] = [];
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  movies.map((mv) => {
    if (mv.maPhim === +maPhim!) {
      dataMovie.push(mv);
    }
  });

  useEffect(() => {
    if (dataMovie) {
      form.setFieldsValue({
        tenPhim: dataMovie[0].tenPhim,
        maPhim: dataMovie[0].maPhim,
      });
    }
  });
  const CinemaOption = () => {
    return cinemas.map((cn) => {
      return (
        <Select.Option key={cn.maHeThongRap} value={cn.maHeThongRap}>
          {cn.maHeThongRap}
        </Select.Option>
      );
    });
  };

  useEffect(() => {
    dispatch(getMovieSchedule(+maPhim!));
    dispatch(getCinemaList());
  }, [maPhim]);
  const onSelectCinema = async (value: string) => {
    await dispatch(getClusterCinema(value));
  };
  const columns: ColumnsType<MovieScheduleInfo> = [
    {
      title: "MÃ LỊCH CHIẾU",
      dataIndex: "maLichChieu",
      key: "maLichChieu",
      width: 60,
    },
    {
      title: "NGÀY CHIẾU GIỜ CHIẾU",
      dataIndex: "ngayChieuGioChieu",
      key: "ngayChieuGioChieu",
      width: 80,
      render: (text) => (
        <span>{moment(text).format("DD/MM/YYYY hh:mm:ss")}</span>
      ),
    },
    {
      title: "GIÁ VÉ",
      dataIndex: "giaVe",
      key: "giaVe",
      width: 80,
      render: (text) => <span>{text} VNĐ</span>,
    },
    {
      title: "TÊN PHIM",
      key: "tenPhim",
      dataIndex: "tenPhim",
      width: 150,
    },
    {
      title: "HÌNH ẢNH",
      key: "hinhAnh",
      dataIndex: "hinhAnh",
      width: 80,
      render: (text) => (
        <img
          src={text}
          style={{ width: "50px", height: "50px", borderRadius: "10px" }}
        />
      ),
    },
    {
      title: "LOGO",
      dataIndex: "logo",
      key: "logo",
      width: 50,
      render: (text) => (
        <img
          src={text}
          style={{ width: "40px", height: "40px", borderRadius: "10px" }}
        />
      ),
    },
    {
      title: "TÊN HỆ THỐNG RẠP",
      dataIndex: "tenHeThongRap",
      key: "tenHeThongRap",
      width: 100,
    },
    {
      title: "TÊN RẠP",
      dataIndex: "tenRap",
      key: "tenRap",
      width: 50,
    },
  ];
  let data: MovieScheduleInfo[] = [];
  movieSchedule?.heThongRapChieu.map((htrc) => {
    htrc.cumRapChieu.map((crc) => {
      crc.lichChieuPhim.map((lcp) => {
        data.push({
          maLichChieu: lcp.maLichChieu,
          tenHeThongRap: htrc.tenHeThongRap,
          logo: htrc.logo,
          tenRap: lcp.tenRap,
          tenPhim: movieSchedule.tenPhim,
          hinhAnh: movieSchedule.hinhAnh,
          ngayChieuGioChieu: lcp.ngayChieuGioChieu,
          giaVe: lcp.giaVe,
        });
      });
    });
  });
  interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: lcFilm) => void;
    onCancel: () => void;
  }
  const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
  }) => {
    return (
      <Modal
        visible={visible}
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Row>
          <Col span={6}>
            <img
              src={logo}
              width={50}
              height={50}
              className="d-inline-block align-text-top"
            />
          </Col>
          <Col span={12} className="text-center">
            THÊM LỊCH CHIẾU
          </Col>
        </Row>
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <div className="row">
            <div className="col-sm-6">
              <Form.Item name="tenPhim" label="Tên Phim">
                <Input disabled />
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item name="maPhim" label="Mã Phim">
                <Input disabled />
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item name="maCumRap" label="Mã Cụm Rạp">
                <Select onChange={onSelectCinema}>{CinemaOption()}</Select>
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item name="maRap" label="Mã Rạp ">
                <Select>
                  {cinemaGroup.map((cng) => {
                    return (
                      <Select.Option key={cng.maCumRap} value={cng.maCumRap}>
                        {cng.maCumRap}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item name="ngayChieu" label="Ngày Chiếu">
                <DatePicker />
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item name="gioChieu" label="Giờ Chiếu">
                <TimePicker />
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item name="giaVe" label="Giá Vé">
                <Input suffix={"VNĐ"}></Input>
              </Form.Item>
            </div>
          </div>

          <Form.Item
            name="modifier"
            className="collection-create-form_last-form-item"
          ></Form.Item>
        </Form>
      </Modal>
    );
  };
  const [visible, setVisible] = useState(false);
  const onCreate = async (values: lcFilm) => {
    let formData = {
      ...values,
      maPhim: values.maPhim,
      giaVe: +values.giaVe,
      maRap: values.maRap,
      ngayChieuGioChieu: `${moment(values["ngayChieu"]).format(
        "DD/MM/YYYY",
      )} ${moment(values["gioChieu"]).format("hh:mm:ss")}`,
    };
    /* 
    console.log(formData, "formData"); */

    await dispatch(addMovieShowTime(formData));
    dispatch(getMovieSchedule(+maPhim!));
    setVisible(false);
  };

  return (
    <div>
      <Row>
        <Col span={6}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setVisible(true);
            }}
          >
            Thêm Lịch Chiếu
          </Button>
          <CollectionCreateForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} scroll={{ x: 300 }} bordered />
    </div>
  );
};

export default MovieSchedule;
