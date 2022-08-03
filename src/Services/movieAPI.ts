import { lcFilm } from "Interface/cinema";
import { Movie } from "Interface/movie";
import { getMovieShowing } from "Slices/movie";

import axiosClient from "./axiosClient";

const movieAPI = {
  getMovieShowing: () => {
    return axiosClient.get<any, Movie[]>("QuanLyPhim/LayDanhSachPhim");
  },
  getMovieShowingSearch: (searchValue: string) => {
    return axiosClient.get<any, Movie[]>(
      `QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${searchValue}`,
    );
  },
  updateFilm: (data: Movie) => {
    const formData = new FormData();
    let blob = new Blob([data.hinhAnh[0].originFileObj], {
      type: "image/jpg",
    });
    for (let key in data) {
      formData.append(key, data[key]);
    }
    formData.append("maNhom", "GP01");
    formData.append("hinhAnh", blob, data.hinhAnh[0].originFileObj.name);

    return axiosClient.post(`QuanLyPhim/CapNhatPhimUpLoad`, formData);
  },
  addMovie: (movie: Movie) => {
    const formData = new FormData();
    for (let key in movie) {
      formData.append(key, movie[key]);
    }
    formData.append("maNhom", "GP01");
    return axiosClient.post("QuanLyPhim/ThemPhimUploadHinh", formData);
  },
  removeFilm: (maPhim: number) => {
    return axiosClient.delete<any, Movie[]>(
      `QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
    );
  },
  addMovieShowTime: (data: lcFilm) => {
    console.log(data, "data2");
    return axiosClient.post("QuanLyDatVe/TaoLichChieu", data);
  },
};
export default movieAPI;
