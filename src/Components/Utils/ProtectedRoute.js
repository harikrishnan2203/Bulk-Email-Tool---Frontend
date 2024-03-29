import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Context from "../../Context/Context";

const ProtectedRoute = (props) => {
  let isLoggedIn = localStorage.getItem("Auth-Token");
  const contextData  = useContext(Context) ;
  if (isLoggedIn) {
    return props.children;
  } else {
    contextData.setIsLoggedIn(false)
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;