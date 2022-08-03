import {
  Cinema,
  CinemaGroup,
  CumRapChieu,
  CumRapChieuPhim,
  lcFilm,
  SysCinemaForm,
} from "Interface/cinema";

import axiosClient from "./axiosClient";
const cinemaAPI = {
  getCinemaList: () => {
    return axiosClient.get<any, Cinema[]>("QuanLyRap/LayThongTinHeThongRap");
  },
  getMovieSchedule: (maPhim: number) => {
    return axiosClient.get<any, SysCinemaForm>(
      `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
    );
  },
  getClusterCinema: (maHeThongRap: string) => {
    return axiosClient.get<any, CumRapChieuPhim[]>(
      `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
    );
  },
};
export default cinemaAPI;
