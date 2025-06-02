import { Navigate, useNavigate } from "react-router-dom";
import { getAuthContext } from "../context/authContext";

export const RouteGuard = ({ children }) => {
  const { user, isVerifyingUser } = getAuthContext();

  if (isVerifyingUser) {
    return;
  }
  if (!user) {
    return <Navigate to={"/sign-in"} />;
  }

  return children;
};
