import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Context from "../../Context/Context";
import { useJwt } from "react-jwt";

const ProtectedRoute = (props) => {
  const contextData = useContext(Context);
  const token = localStorage.getItem("Auth-Token");

  // Call useJwt hook unconditionally
  const { decodedToken, isLoading, error } = useJwt(token);
  // console.log(decodedToken)
  useEffect(() => {
    if (error) {
      console.error("There was an error decoding token:", error);
      contextData.setIsLoggedIn(false);
    } else if (!isLoading && decodedToken !== null) {
      if (decodedToken.exp * 1000 > Date.now()) {
        // Token is valid, set isLoggedIn to true
        contextData.setIsLoggedIn(true);
      } else {
        // Token is expired or invalid, set isLoggedIn to false
        contextData.setIsLoggedIn(false);
      }
    }
  }, [isLoading, decodedToken, error]);

  if (isLoading) {
    // If still loading, render a loading indicator
    return <div>Loading...</div>;
  }

  if (error) {
    // If there's an error, handle it
    return <div>Error: {error.message}</div>;
  }

  if (!decodedToken) {
    // If decodedToken is null, wait for the token to be available
    return null;
  }

  if (decodedToken.exp * 1000 > Date.now()) {
    // If token is valid, render children
    return props.children;
  }

  // If token is expired, redirect to login page
  contextData.setIsLoggedIn(false);
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
