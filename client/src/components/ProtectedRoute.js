// import React, { Fragment } from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate, Route } from 'react-router-dom'

// const ProtectedRoute = ({element: Component, ...rest }) => {
//     const {isAuthenticated, loading, user} = useSelector((state) => state.user);
//   return (
//    <Fragment>
//       {!loading && (
//           <Route
//             {...rest}
//             render={(props) => {
//                 if (!isAuthenticated) { 
//                     return <Navigate to="/login" />;
//                 }
//                 return <Component {...props} />;
//             }}
//         />
//         )}
//    </Fragment>
//   );
// };

// export default ProtectedRoute

import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return redirect("/login");
            }

            if (isAdmin === true && user.role !== "admin") {
              return redirect("/login");
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
