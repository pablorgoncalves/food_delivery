import { ComponentType } from "react";
import { Redirect, Route as ReactRoute, RouteProps } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

interface Props extends RouteProps {
  isPrivate?: boolean;
  component: ComponentType;
}

// true e true = ok
// true e false = n ok
// false e true = n ok
// false e false = ok

export const Route = ({
  isPrivate = false,
  component: Component,
  ...rest

}: Props) => {
  const { accessToken, user } = useAuth();

  return (
    <ReactRoute
      {...rest}
      render={() =>
        isPrivate === !!accessToken ? (
          <Component />
        ) : (
          user.admin ?
          <Redirect to={isPrivate ? "/" : "/requestPage"} />
          :
          <Redirect to={isPrivate ? "/" : "/menu"} />
        )
      }
    />
  );
};
