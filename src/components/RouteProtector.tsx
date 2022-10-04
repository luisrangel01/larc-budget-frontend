import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RouteProtector = ({ children }: any) => {
  const { login } = useSelector((state: any) => state.auth);
  if (!login) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default RouteProtector;
