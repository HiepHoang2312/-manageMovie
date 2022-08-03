import { LoginValues, RegisterValues, UserValues } from "Interface/login";
import axiosClient from "./axiosClient";

const LoginAPI = {
  LoginAction: (values: LoginValues) => {
    return axiosClient.post<any, UserValues>(
      "QuanLyNguoiDung/DangNhap",
      values,
    );
  },
  register: (userRegisger: RegisterValues) => {
    return axiosClient.post("QuanLyNguoiDung/DangKy", userRegisger);
  },
};
export default LoginAPI;
