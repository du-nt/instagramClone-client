import React from "react";
import { Paper, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

import EditInfo from "./EditInfo";
import ChangePassword from "./ChangePassword";
import LeftMenu from "./LeftMenu";

import { useRouteMatch, Switch, Route } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  contain: {
    height: "80vh",
    display: "flex",
  },
  not: {
    width: "74%",
    display: "flex",
    justifyContent: "center",
    marginTop: 220,
  },
}));
export default function EditProfile() {
  let { path } = useRouteMatch();
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper variant="outlined" className={classes.contain}>
        <LeftMenu />
        <Divider orientation="vertical" />

        <Switch>
          <Route exact path={`${path}/edit`}>
            <EditInfo />
          </Route>
          <Route path={`${path}/password/change`}>
            <ChangePassword />
          </Route>
          <Route path={`${path}/apps`}>
            <Typography color='textSecondary' variant="h5" className={classes.not}>
              This feature is not yet implemented
            </Typography>
          </Route>
          <Route path={`${path}/email`}>
            <Typography color='textSecondary' variant="h5" className={classes.not}>
              This feature is not yet implemented
            </Typography>
          </Route>
        </Switch>
      </Paper>
    </Container>
  );
}
