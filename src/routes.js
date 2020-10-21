import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/HomeSections/Home.js";
import Profile from "./components/ProfileSections/Profile";
import EditProfile from "./components/EditProfileSections/EditProfile";
import Explore from "./components/ExploreSections/Explore";
import DetailedPost from "./components/DetailedPostSections/DetailedPost";
import SeeAllSuggestions from "./components/SeeAllSuggestions";
import NotYet from "./components/NotYet";

export const CustomizedRoute = ({
  component: Component,
  protect,
  noHeader,
  ...rest
}) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        protect ? (
          isAuthenticated ? (
            <div>
              {!noHeader && <Header />}
              <Component {...props} />
            </div>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
        ) : (
          <div>
            {!noHeader && <Header />}
            <Component {...props} />
          </div>
        )
      }
    />
  );
};

CustomizedRoute.defaultProps = {
  protect: true,
  noHeader: false,
};

export const GoHomeIfLogged = ({
  component: Component,
  hasHeader,
  ...rest
}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isRedirect, setIsRedirect] = React.useState(true);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isRedirect ? (
          <Redirect to="/" />
        ) : (
          <>
            {hasHeader && <Header />}
            <Component {...props} setIsRedirect={setIsRedirect} />
          </>
        )
      }
    />
  );
};

GoHomeIfLogged.defaultProps = {
  hasHeader: false,
};

export const routes = [
  {
    path: "/",
    exact: true,
    component: () => <Home />,
  },
  {
    path: "/accounts",
    component: () => <EditProfile />,
  },
  {
    path: "/explore",
    exact: true,
    component: () => <Explore />,
  },
  {
    path: "/explore/people/suggested",
    component: () => <SeeAllSuggestions />,
  },
  {
    path: "/inbox",
    component: () => <NotYet />,
  },
  {
    path: "/activity",
    component: () => <NotYet />,
  },
  {
    path: "/users/:userNameParam",
    protect: false,
    component: () => <Profile />,
  },
  {
    path: "/p/:postId",
    protect: false,
    component: () => <DetailedPost />,
  },
];
