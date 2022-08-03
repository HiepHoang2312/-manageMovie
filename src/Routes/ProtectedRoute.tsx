import { useSelector } from "react-redux";
import { RootState } from "configStore";
import { Navigate } from "react-router-dom";
import { Children } from "react";
interface Props {
  children: JSX.Element;
}
const ProtectedRoute = ({ children }: Props) => {
  //kiểm tra xem user đã đăng nhập hay chưa
  const { users } = useSelector((state: RootState) => state.Login);
  if (!users) {
    //chưa đăng nhập
    return <Navigate to={"/"} />;
  }
  return children;
};

export default ProtectedRoute;
