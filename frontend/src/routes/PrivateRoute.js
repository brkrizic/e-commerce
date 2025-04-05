import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";

const PrivateRoute = ({ isLoggedIn }) => {
    //const { token } = useSelector((state) => state.auth);
    
    return isLoggedIn ? <Outlet/> : <Navigate to="/login" replace/>;
} 
export default PrivateRoute;

// const PrivateRoute = ({element, ...rest}) => {
//     const { token, loading } = useSelector((state) => state.auth);

//     if(loading) return <p>Loading...</p>;

//     return token ? element : <Navigate to="/login" replace/>;
// } 
// export default PrivateRoute;