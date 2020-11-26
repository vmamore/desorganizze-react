import React from "react";
import { useUser } from "../contexts/UserContext";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({children, ...rest}) {
    const { user } = useUser();
    return (
      <Route
        {...rest}
        render={({location}) =>
        user.authenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
          />
        )
      }
      />
    );
  }