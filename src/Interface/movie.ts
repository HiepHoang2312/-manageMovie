export interface Movie {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: File;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: string;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}

export interface MovieTable {
  show: boolean;
  close: VoidFunction;
  filmUpdate?: Movie;
  type: string;
}
