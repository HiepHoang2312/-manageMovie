import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieAPI from "Services/movieAPI";
import { Movie } from "Interface/movie";
import Swal from "sweetalert2";
import { AppDispatch } from "configStore";
import { useDispatch } from "react-redux";
import { lcFilm } from "Interface/cinema";
import { Navigate, useNavigate } from "react-router-dom";
interface State {
  movies: Movie[];
  isloading: boolean;
  error?: string | null;
}
const initialState: State = {
  movies: [],
  isloading: false,
  error: null,
};

/* const dispatch = useDispatch<AppDispatch>(); */

// thunk actions
export const getMovieShowing = createAsyncThunk(
  "movie/getMovieShowing",
  async () => {
    try {
      const data = await movieAPI.getMovieShowing();
      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const getMovieShowingSearch = createAsyncThunk(
  "movie/getMovieShowingSearch",
  async (searchvalue: string) => {
    try {
      const data = await movieAPI.getMovieShowingSearch(searchvalue);
      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const updateFilm = createAsyncThunk(
  "movie/updateFilm",

  async (data: Movie) => {
    try {
      const result = await movieAPI.updateFilm(data);
      return result;
    } catch (error) {
      throw error;
    }
  },
);
export const addMovie = createAsyncThunk(
  "movie/addMovie",
  async (data: Movie) => {
    try {
      const result = await movieAPI.addMovie(data);
      return result;
    } catch (error) {
      throw error;
    }
  },
);
export const removeFilm = createAsyncThunk(
  "movie/removeFilm",
  async (movieID: number) => {
    try {
      const result = await movieAPI.removeFilm(movieID);
      return result;
    } catch (error) {
      throw error;
    }
  },
);
export const addMovieShowTime = createAsyncThunk(
  "movie/addMovieShowTime",
  async (data: lcFilm) => {
    try {
      const result = await movieAPI.addMovieShowTime(data);
      return result;
    } catch (error) {
      throw error;
    }
  },
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieShowing.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getMovieShowing.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.movies = payload;
    });
    builder.addCase(getMovieShowingSearch.fulfilled, (state, { payload }) => {
      state.movies = payload;
    });
    builder.addCase(getMovieShowing.rejected, (state, { error }) => {
      state.isloading = true;
      state.error = error.message;
    });
    builder.addCase(addMovie.fulfilled, (state, { payload }) => {
      Swal.fire({
        title: "Thêm Phim Thành Công",
      });
    });
    builder.addCase(addMovie.rejected, (state, { error }) => {
      Swal.fire({
        title: error.message,
      });
    });
    builder.addCase(updateFilm.fulfilled, (state, { payload }) => {
      Swal.fire({
        title: "Cập nhật thành công!!!",
      });
    });
    builder.addCase(updateFilm.rejected, (state, { payload }) => {
      Swal.fire({
        title: "Xửa thất bại!!!",
      });
    });
    builder.addCase(removeFilm.fulfilled, (state, { payload }) => {
      Swal.fire({
        icon: "success",
        title: "Xóa thành công!!!",
      });
    });
    builder.addCase(removeFilm.rejected, (state, { error }) => {
      state.isloading = true;
      state.error = error.message;
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    });
  },
});

//export Actions

//export reducer
export default movieSlice.reducer;
