import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import Register from "./components/Auths/Register";
import Login from "./components/Auths/Login";
import ForgotPassword from "./components/Auths/ForgotPassword";
import ResetPassword from "./components/Auths/ResetPassword";
import DetailedPostModal from "./components/DetailedPostModalSections/DetailedPostModal";
import NotFound from "./components/NotFound";

import { getCurrentUser } from "./slices/authSlice";

import { routes, GoHomeIfLogged, CustomizedRoute } from "./routes";

export default function App() {
  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    history.replace();
  }, [history]);

  const background = location?.state?.background;
  const fromProfile = location?.state?.fromProfile;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser(setLoading));
  }, [dispatch]);

  return (
    !loading && (
      <>
        <Switch location={background || location}>
          <GoHomeIfLogged exact path="/login" component={Login} />
          <GoHomeIfLogged exact path="/register" component={Register} />
          <GoHomeIfLogged
            exact
            path="/forgotpassword"
            component={ForgotPassword}
          />
          <GoHomeIfLogged
            exact
            path="/password/reset/:userId/:token"
            component={ResetPassword}
          />
          {routes.map((route, index) => (
            <CustomizedRoute key={index} {...route} />
          ))}
          <Route component={NotFound} />
        </Switch>
        {background && (
          <Route
            path="/p/:postId"
            children={<DetailedPostModal fromProfile={fromProfile} />}
          />
        )}
      </>
    )
  );
}
