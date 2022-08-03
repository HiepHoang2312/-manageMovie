export interface User {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  hoTen: string;
}
export interface UserInFo {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: MaLoaiNguoiDung;
  hoTen: string;
  thongTinDatVe: thongTinDatVe[];
}
export interface MaLoaiNguoiDung {
  maLoaiNguoiDung: string;
  tenLoai: string;
}
export interface thongTinDatVe {
  danhSachGhe: danhSachGhe[];
  maVe: number;
  ngayDat: string;
  tenPhim: string;
  hinhAnh: string;
  giaVe: number;
  thoiLuongPhim: number;
}
export interface danhSachGhe {
  maHeThongRap: string;
  tenHeThongRap: string;
  maCumRap: string;
  tenCumRap: string;
  maRap: number;
  tenRap: string;
  maGhe: number;
  tenGhe: string;
}
export interface DataTypeUserList {
  key: React.Key;
  tenPhim: string;
  ngayDat: string;
  thoiLuongPhim: number;
  giaVe: number;
  danhSachGhe: danhSachGhe[];
}
export interface TTDatVe {
  maVe: number;
  tenPhim: string;
  ngayDat: string;
  thoiLuongPhim: number;
  giaVe: number;
  danhSachGhe: danhSachGhe[];
}
