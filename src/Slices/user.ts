import userAPI from "Services/userAPI";
import { User, UserInFo } from "Interface/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
interface State {
  users: User[];
  isloading: boolean;
  error?: string | null;
  userInFo: UserInFo | null;
}
const initialState: State = {
  users: [],
  isloading: false,
  error: null,
  userInFo: null,
};
export const getUserList = createAsyncThunk("user/getUserList", async () => {
  try {
    const data = await userAPI.getUserList();
    return data;
  } catch (error) {
    throw error;
  }
});
export const getUserListSearch = createAsyncThunk(
  "user/getUserListSearch",
  async (tuKhoa: string) => {
    try {
      const data = await userAPI.getUserListSearch(tuKhoa);

      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const addUser = createAsyncThunk("user/addUser", async (data: User) => {
  try {
    const result = await userAPI.addUser(data);
    return result;
  } catch (error) {
    throw error;
  }
});
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: User) => {
    try {
      const result = await userAPI.updateUser(data);
      return result;
    } catch (error) {
      throw error;
    }
  },
);
export const removeUser = createAsyncThunk(
  "user/removeUser",
  async (TaiKhoan: string, { dispatch }) => {
    try {
      const result = await userAPI.removeUser(TaiKhoan);
      dispatch(getUserList());
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);
export const getInfoUser = createAsyncThunk(
  "user/getInfoUser",
  async (TaiKhoanUser: string) => {
    try {
      const result = await userAPI.getInfoUser(TaiKhoanUser);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserList.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getUserList.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.users = payload;
    });
    builder.addCase(getUserList.rejected, (state, { error }) => {
      state.isloading = true;
      state.error = error.message;
    });
    builder.addCase(getUserListSearch.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getUserListSearch.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.users = payload;
    });
    builder.addCase(getUserListSearch.rejected, (state, { error }) => {
      state.isloading = true;
      state.error = error.message;
    });

    builder.addCase(updateUser.rejected, (state, { error }) => {
      Swal.fire({
        title: `${error.message}`,
      });
    });
    builder.addCase(removeUser.fulfilled, (state, { payload }) => {
      Swal.fire({
        title: `${payload}`,
      });
    });

    builder.addCase(removeUser.rejected, (state, { error }) => {
      Swal.fire({
        title: `${error.message}`,
      });
    });
    builder.addCase(getInfoUser.fulfilled, (state, { payload }) => {
      state.userInFo = payload;
    });
  },
});
export default userSlice.reducer;
