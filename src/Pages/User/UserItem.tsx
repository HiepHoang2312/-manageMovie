import { User } from "Interface/user";
import { RootState, AppDispatch } from "configStore";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getUserList,
  getUserListSearch,
  removeUser,
  updateUser,
} from "Slices/user";
import { Tooltip, Table, Button, Row, Col } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { Input } from "antd";
import { EditFilled, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import type { InputRef } from "antd";
import { useForm } from "react-hook-form";
import logo from "asset/images/logo.png";
import { NavLink } from "react-router-dom";
const { Search } = Input;

const UserItem = () => {
  const [userUpdate, setUserUpdate] = useState<User>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>({
    mode: "onTouched",
  });
  setValue("taiKhoan", userUpdate?.taiKhoan!);
  setValue("matKhau", userUpdate?.matKhau!);
  setValue("email", userUpdate?.email!);
  setValue("hoTen", userUpdate?.hoTen!);
  setValue("maLoaiNguoiDung", userUpdate?.maLoaiNguoiDung!);
  setValue("soDT", userUpdate?.soDT!);
  const onSubmit = async (values: User) => {
    const payload = {
      ...values,
    };
    console.log(payload, "555");

    await dispatch(updateUser(payload));
    dispatch(getUserList());
  };
  const dispatch = useDispatch<AppDispatch>();
  async function handleRemoveUser(TaiKhoan: string) {
    await dispatch(removeUser(TaiKhoan));
    dispatch(getUserList());
  }
  const columns: ColumnsType<User> = [
    {
      title: "TÀI KHOẢN",
      width: 100,
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "HỌ TÊN",
      width: 150,
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "SĐT",
      dataIndex: "soDT",
      key: "soDT",
      width: 100,
    },
    {
      title: "MẬT KHẨU",
      dataIndex: "matKhau",
      key: "matKhau",
      width: 100,
    },
    {
      title: "MÃ LOẠI NGƯỜI DÙNG",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      width: 90,
    },
    {
      title: "Action",

      width: 50,

      render: (text, record, index) => (
        <>
          <Button
            type="primary"
            className="btnAdminP"
            icon={<EditFilled />}
            onClick={() => {
              setUserUpdate(record);
            }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Sửa
          </Button>
          <Button
            onClick={() => {
              Swal.fire({
                icon: "question",
                title: `Bạn muốn xóa phim`,
                text: record.taiKhoan,
                showCancelButton: true,
                confirmButtonColor: "#fb4226",
                cancelButtonColor: "rgb(167 167 167)",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleRemoveUser(record.taiKhoan);
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
          <NavLink to={`Info/${record.taiKhoan}`}>
            <Button className="btnAdminP" icon={<UserOutlined />}>
              Thông tin
            </Button>
          </NavLink>
        </>
      ),
    },
  ];

  const { users, isloading, error } = useSelector(
    (state: RootState) => state.user,
  );
  const data: User[] = users;
  const [searchValue, setsearchValue] = useState("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchValue(e.target.value);
  };

  const onSearch = async () => {
    if (searchValue) {
      await dispatch(getUserListSearch(searchValue));
    } else if (searchValue === "") {
      await dispatch(getUserList());
    }
  };

  useEffect(() => {
    dispatch(getUserList());
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
            placeholder="Tìm kiếm User"
            onChange={handleChange}
            onSearch={onSearch}
            defaultValue={searchValue}
            style={{ width: 200 }}
          />
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} scroll={{ x: 300 }} bordered />
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <img
                src={logo}
                alt=""
                width="30"
                height="30"
                className="d-inline-block align-text-top"
              />
              <h5 className="modal-title" id="exampleModalLabel">
                Cập Nhật Tài Khoản
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-outline mb-4">
                      <label className="form-label">Tài Khoản</label>
                      <input
                        disabled
                        className="form-control"
                        type="text"
                        placeholder="Tài Khoản"
                        {...register("taiKhoan", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-outline mb-4">
                      <label className="form-label">Mật khẩu</label>
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Mật khẩu"
                        {...register("matKhau", {
                          required: true,
                        })}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-outline mb-4">
                      <label className="form-label">Họ Tên</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Họ Tên"
                        {...register("hoTen", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-outline mb-4">
                      <label className="form-label">Số điện thoại</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Số điện thoại"
                        {...register("soDT", { required: true })}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-outline mb-4">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-outline mb-4">
                      <label className="form-label">Loại user</label>
                      <select
                        className="form-select  mb-3"
                        {...register("maLoaiNguoiDung", { required: true })}
                      >
                        <option value="KhachHang">Khách Hàng</option>
                        <option value="QuanTri">Quản trị</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-danger btn-block"
                  data-bs-dismiss="modal"
                >
                  Cập Nhật User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
