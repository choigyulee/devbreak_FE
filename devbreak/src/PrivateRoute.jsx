import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import { authState } from "./atoms/authAtoms"; 

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useRecoilValue(authState); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? children : null;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
