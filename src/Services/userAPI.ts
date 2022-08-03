import { User, UserInFo } from "Interface/user";
import axiosClient from "./axiosClient";
const userAPI = {
  getUserList: () => {
    return axiosClient.get<any, User[]>(`QuanLyNguoiDung/LayDanhSachNguoiDung`);
  },
  getUserListSearch: (tuKhoa: string) => {
    return axiosClient.get<any, User[]>(
      `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${tuKhoa}`,
    );
  },
  removeUser: (TaiKhoan: string) => {
    return axiosClient.delete(
      `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${TaiKhoan}`,
    );
  },
  addUser: (user: User) => {
    let formData = { ...user, maNhom: "GP01" };

    return axiosClient.post(`QuanLyNguoiDung/ThemNguoiDung`, formData);
  },
  updateUser: (user: User) => {
    let formData = { ...user, maNhom: "GP01" };
    return axiosClient.post(
      `QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      formData,
    );
  },
  getInfoUser: (taiKhoan: string) => {
    return axiosClient.post<any, UserInFo>(
      `QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`,
    );
  },
};
export default userAPI;
