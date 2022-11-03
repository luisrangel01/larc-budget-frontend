import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RouteProtector = ({ children }: any) => {
  const { signIn } = useSelector((state: any) => state.auth);
  if (!signIn) {
    return <Navigate to="/sign-in" />;
  }
  return <>{children}</>;
};

export default RouteProtector;
