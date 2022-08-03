import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginValues, RegisterValues, UserValues } from "Interface/login";
import LoginAPI from "Services/LoginAPI";
import Swal from "sweetalert2";
interface State {
  users: UserValues;
  loginValues: LoginValues[];
  isloading: boolean;
  error?: string;
}

const initialState: State = {
  users: null || JSON.parse(localStorage.getItem("user") as string),
  loginValues: [],
  isloading: false,
  error: undefined,
};

export const LoginAction = createAsyncThunk(
  "auth/login",
  async (values: LoginValues) => {
    try {
      const data = await LoginAPI.LoginAction(values);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("typeUser", data.maLoaiNguoiDung);

      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userRegister: RegisterValues, action) => {
    try {
      const results = await LoginAPI.register(userRegister);

      return results;
    } catch (error) {
      throw error;
    }
  },
);

const LoginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(LoginAction.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(LoginAction.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.users = payload;
      if (payload.maLoaiNguoiDung !== "QuanTri") {
        Swal.fire({
          icon: "error",
          title: payload,
        });
      }
    });
    builder.addCase(LoginAction.rejected, (state, { error }) => {
      state.isloading = true;
      state.error = error.message;
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    });
  },
});
export default LoginSlice.reducer;
