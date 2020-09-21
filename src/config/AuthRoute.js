import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./Context";

function AuthRoute({ component: Component, ...restProps }) {
  const [user] = useContext(UserContext);
  return (
    <Route
      {...restProps}
      render={(props) => {
        return user === null ? (
          <Redirect to={{ pathname: "/login" }} />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
}

function UnAuthRoute({ component: Component, ...restProps }) {
  const [user] = useContext(UserContext);
  return (
    <Route
      {...restProps}
      render={(props) => {
        return user ? (
          <Redirect to={{ pathname: "/movies" }} />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
}

export { UnAuthRoute, AuthRoute };
