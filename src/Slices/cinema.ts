import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cinemaAPI from "Services/cinemaAPI";
import {
  Cinema,
  CinemaGroup,
  CumRapChieu,
  CumRapChieuPhim,
  lcFilm,
  SysCinemaForm,
} from "Interface/cinema";

interface State {
  cinemas: Cinema[];
  isloading: boolean;
  error?: string | null;
  movieSchedule: SysCinemaForm | null;
  cinemaGroup: CumRapChieuPhim[];
  lcFilm: lcFilm | null;
}
const initialState: State = {
  cinemas: [],
  isloading: false,
  error: null,
  cinemaGroup: [],
  lcFilm: null,
  movieSchedule: null,
};

// thunk actions
export const getCinemaList = createAsyncThunk(
  "cinema/getCinemaList",
  async () => {
    try {
      const data = await cinemaAPI.getCinemaList();

      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const getClusterCinema = createAsyncThunk(
  "cinema/getClusterCinema",
  async (maHeThongRap: string) => {
    try {
      const data = await cinemaAPI.getClusterCinema(maHeThongRap);
      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const getMovieSchedule = createAsyncThunk(
  "movie/getMovieSchedule",
  async (movieID: number) => {
    try {
      const data = await cinemaAPI.getMovieSchedule(movieID);

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);
const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCinemaList.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getCinemaList.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.cinemas = payload;
    });
    builder.addCase(getCinemaList.rejected, (state, { error }) => {
      state.isloading = true;
      state.error = error.message;
    });
    builder.addCase(getMovieSchedule.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.movieSchedule = payload;
    });
    builder.addCase(getClusterCinema.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.cinemaGroup = payload;
    });
  },
});

//export Actions

//export reducer
export default cinemaSlice.reducer;
