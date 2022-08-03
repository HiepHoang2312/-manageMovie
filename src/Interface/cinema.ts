export interface Cinema {
  maHeThongRap: string;
  tenHeThongRap: string;
  biDanh: string;
  logo: string;
}
export interface lcFilm {
  tenPhim: string;
  maPhim: number;
  maLichChieu: string;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: string;
  giaVe: number;
  thoiLuong: number;
}

// cụm rạp chiếu
export interface CumRapChieu {
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
  lichChieuPhim: lcFilm[];
}

// hệ thống rạp chiếu
export interface SysCinemaForm {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: string;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
  heThongRapChieu: CinemaGroup[];
}
export interface CinemaGroup {
  cumRapChieu: CumRapChieu[];
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
}
export interface MovieScheduleInfo {
  maLichChieu: string;
  tenHeThongRap: string;
  logo: string;
  tenRap: string;
  tenPhim: string;
  hinhAnh: string;
  ngayChieuGioChieu: string;
  giaVe: number;
}
export interface ListRapinfo {
  maRap: number;
  tenRap: string;
}
export interface CumRapChieuPhim {
  maCumRap: string;
  tenCumRap: string;
  diaChi: string;
  danhSachRap: ListRapinfo[];
}
