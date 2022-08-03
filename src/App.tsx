import { lazy, Suspense } from "react";
import "./css/main.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminTemplate from "./Templates/AdminTemplate";
import ProtectedRoute from "Routes/ProtectedRoute";
import Login from "Pages/Login/Login";
import GlobalStyles from "GlobalStyles";
import Register from "Pages/Register/Register";

const Movie = lazy(() => import("./Pages/Movie/Movie"));
const User = lazy(() => import("./Pages/User/User"));
const Cinema = lazy(() => import("./Pages/Cinema/Cinema"));
const MovieSchedule = lazy(() => import("Pages/MovieSchedule/MovieSchedule"));
const AddMovie = lazy(() => import("Pages/AddMovie/AddMovie"));
const ClusterCinema = lazy(() => import("Pages/ClusterCinema/ClusterCinema"));
const ListRap = lazy(() => import("Pages/ListRap/ListRap"));
const AddUser = lazy(() => import("Pages/AddUser/AddUser"));
const UserInfo = lazy(() => import("Pages/UserInfo/UserInfo"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="container">
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4 .center-screen">
              <div className="loadingio-spinner-spinner-hd458l8xbrs ">
                <div className="ldio-engoxtquu0e">
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route
            path="Admin"
            element={
              <ProtectedRoute>
                <AdminTemplate />
              </ProtectedRoute>
            }
          >
            <Route path="Movie" element={<Movie />}></Route>
            <Route path="User" element={<User />}></Route>

            <Route path="Cinema" element={<Cinema />}></Route>
            <Route path="addMovie" element={<AddMovie />}></Route>
            <Route path="addUser" element={<AddUser />}></Route>
            <Route
              path="movie/Movie-Schedule/:maPhim"
              element={<MovieSchedule />}
            ></Route>
            <Route
              path="movie/Movie-Schedule"
              element={<Navigate to={"/admin/Movie"} />}
            ></Route>

            <Route
              path="cinema/clusterCinema/:maHeThongRap"
              element={<ClusterCinema />}
            ></Route>
            <Route path="User/Info/:taiKhoan" element={<UserInfo />}></Route>
            <Route
              path="User/Info"
              element={<Navigate to={"/admin/user"} />}
            ></Route>
            <Route path="cinema/clusterCinema" element={<Cinema />}></Route>

            <Route
              path="cinema/clusterCinema/:maHeThongRap/ListRap/:maCumRap"
              element={<ListRap />}
            ></Route>
            <Route
              path="cinema/clusterCinema/:maHeThongRap/ListRap"
              element={<ListRap />}
            ></Route>
            <Route path="*" element={<Navigate to={""} />}></Route>
          </Route>
          <Route path="*" element={<Navigate to={""} />}></Route>
        </Routes>
        <GlobalStyles></GlobalStyles>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
