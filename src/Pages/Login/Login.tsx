//tsrafce
//1 số thư viện làm việc với form trong REACT :formik,react-final-form,react-hook-form
import { useForm, FieldErrors } from "react-hook-form";
import { LoginValues, UserValues } from "Interface/login";

import { useDispatch } from "react-redux";
import { AppDispatch } from "configStore";
import { LoginAction } from "Slices/Login";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors }, //liệt kê các input đang lỗi
  } = useForm({
    //defaultValues khai báo giá trị mặc định cho các input trong form
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    //mode: cacash validation đc trigger (defaute là submit)
    mode: "onTouched",
  });

  async function onSubmit(values: LoginValues) {
    await dispatch(LoginAction(values));
    const user: UserValues = JSON.parse(localStorage.getItem("user") as string);

    if (user && user.maLoaiNguoiDung === "QuanTri") {
      {
        navigate("/Admin", { replace: true });
      }
    } else if (user && user.maLoaiNguoiDung === "KhachHang") {
      {
        localStorage.clear();
        Swal.fire({
          title: `Vui lòng đăng nhập tài khoản Admin`,
          confirmButtonColor: "#fb4226",
          cancelButtonColor: "rgb(167 167 167)",
          confirmButtonText: "OK",
        });
      }
    }
  }

  const onError = (values: FieldErrors<LoginValues>) => {
    console.log(values);
  };

  return (
    <div className="login">
      <div className="loginForm col-10 col-sm-10 col-md-6 col-lg-4">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h2 className="text-center">
            <img src="./images/logo.png" />
          </h2>
          <h2 className="text-center">Login</h2>
          <div className="form-outline mb-4">
            <label htmlFor="">Tài Khoản</label>
            <input
              type="text"
              className="form-control input__line"
              {...register("taiKhoan", {
                required: {
                  value: true,
                  message: "Tài Khoản không được để trống",
                }, //kh đc bỏ trống
                pattern: {
                  value: /^[a-zA-Z0-9]{5,}$/, //nhận vào regexp
                  message:
                    "Tài Khoản sai định dạng, gồm ký tự hoa thường và số ít nhất 5 ký tự, không khoảng trắng ",
                },
              })}
            />

            {errors.taiKhoan && <span>{errors.taiKhoan?.message}</span>}
          </div>
          <div className="form-outline mb-4">
            <label htmlFor="">Mật Khẩu</label>
            <input
              className="form-control input__line"
              type="password"
              {...register("matKhau", {
                required: {
                  value: true,
                  message: "Mật khẩu không được để trống",
                },
              })}
            />

            {errors.matKhau && <span>{errors.matKhau?.message}</span>}
          </div>
          <div className="form-group row" style={{ alignItems: "center" }}>
            <div className="col-7">
              <a className="forgotPassword" href="#">
                Forgot your password?
              </a>
            </div>
            <div className="col-12 col-sm-12 col-md-5">
              <button type="submit" className="buttonLogin ">
                Đăng Nhập
              </button>
            </div>
            <div
              className="col-sm-12 row"
              style={{
                alignItems: "center",
                justifyContent: "center",
                margin: "20px 0",
              }}
            >
              <p>
                Don't have account?
                <NavLink to="/register" className="registerLink">
                  {" "}
                  Sign up now!
                </NavLink>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
