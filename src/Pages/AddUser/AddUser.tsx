import { AppDispatch } from "configStore";
import { User } from "Interface/user";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import logo from "asset/images/logo.png";
import { addUser } from "Slices/user";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    mode: "onTouched",
  });
  const onSubmit = async (values: User) => {
    const payload = {
      ...values,
    };
    reset();
    await dispatch(addUser(payload))
      .unwrap()
      .then((originalPromiseResult) => {
        if (originalPromiseResult.taiKhoan) {
          Swal.fire({
            title: `Tạo tài khoản  thành công `,
          });
          navigate("/Admin/user", { replace: true });
        } else {
          Swal.fire({
            title: originalPromiseResult,
          });
        }
      });
    /*      navigate("/Admin/user", { replace: true }); */
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <nav className="navbar ">
              <div className="container-fluid">
                <div className="navbar-brand">
                  <img
                    src={logo}
                    alt=""
                    width="30"
                    height="30"
                    className="d-inline-block align-text-top"
                  />
                  Add User
                </div>
              </div>
            </nav>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-outline mb-4">
                  <label className="form-label">Tài Khoản</label>
                  <input
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

            <button type="submit" className="btn btn-danger btn-block">
              Thêm User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
