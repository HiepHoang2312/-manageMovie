import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import logo from "asset/images/logo.png";
import { useDispatch } from "react-redux";

import { AppDispatch } from "configStore";
import { Movie } from "Interface/movie";
import { addMovie } from "Slices/movie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
//data: tenPhim,trailer,hinhAnh,ngayKhoiChieu,moTa,biDanh

const AddMovie = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Movie>({
    mode: "onTouched",
  });
  const onSubmit = async (values: Movie) => {
    console.log(values);

    const payload = {
      ...values,
      hinhAnh: values.hinhAnh[0],
      ngayKhoiChieu: dayjs(values.ngayKhoiChieu).format("DD/MM/YYYY"),
    };
    reset();
    await dispatch(addMovie(payload))
      .unwrap()
      .then((result) => {
        if (result.tenPhim) {
          Swal.fire({
            title: `Thêm phim thành công `,
          });
          navigate("/Admin/movie", { replace: true });
        } else {
          Swal.fire({
            title: result,
          });
        }
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <nav className="navbar ">
              <div className="container-fluid">
                <div className="navbar-brand">
                  <img
                    src={logo}
                    alt=""
                    width="30"
                    height="30"
                    className="d-inline-block align-text-top"
                  />
                  Add Movie
                </div>
              </div>
            </nav>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-outline mb-4">
                  <label className="form-label">Tên Phim</label>
                  <input
                    className="form-control"
                    type="text"
                    id="form1Example1"
                    placeholder="Tên Phim"
                    {...register("tenPhim", { required: true })}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-outline mb-4">
                  <label className="form-label">Đánh giá</label>
                  <input
                    className="form-control"
                    type="number"
                    id="form1Example1"
                    placeholder="Đánh giá"
                    {...register("danhGia", {
                      required: true,
                      min: 1,
                      max: 10,
                    })}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-outline mb-4">
                  <label className="form-label">Bí Danh</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Bí Danh"
                    {...register("biDanh", { required: true })}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-outline mb-4">
                  <label className="form-label">Ngày Khởi Chiếu</label>
                  <input
                    className="form-control"
                    type="date"
                    placeholder="Ngày Khởi Chiếu"
                    {...register("ngayKhoiChieu", { required: true })}
                  />
                </div>
              </div>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Mô Tả</label>
              <input
                className="form-control"
                type="text"
                placeholder="Mô Tả"
                {...register("moTa", { required: true })}
              />
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-outline mb-4">
                  <label className="form-label">Trailer</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Trailer"
                    {...register("trailer", { required: true })}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-outline mb-4">
                  <label className="form-label">Hình ảnh</label>
                  <input
                    className="form-control"
                    type="file"
                    /* multiple => 1 lúc lấy nhiều hình*/ {...register(
                      "hinhAnh",
                      { required: true },
                    )}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-danger btn-block">
              Thêm Phim
            </button>
          </form>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
};

export default AddMovie;
