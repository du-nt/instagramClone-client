import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { NavLink, useLocation, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "26%",
  },
  list: {
    paddingLeft: theme.spacing(5),
  },
  selected: {
    borderLeft: "2px solid #000",
    paddingLeft: 38,
  },
}));

export default function SelectedListItem() {
  const classes = useStyles();
  let { url } = useRouteMatch();
  const { pathname } = useLocation();

  const active1 = pathname === "/accounts/edit";
  const active2 = pathname === "/accounts/password/change";
  const active3 = pathname === "/accounts/apps";
  const active4 = pathname === "/accounts/email";

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="menus" disablePadding>
        <ListItem
          button
          alignItems="flex-start"
          className={active1 ? classes.selected : classes.list}
          selected={active1}
          component={NavLink}
          to={`${url}/edit`}
        >
          <ListItemText primary="Edit Profile" />
        </ListItem>
        <ListItem
          button
          className={active2 ? classes.selected : classes.list}
          alignItems="flex-start"
          selected={active2}
          component={NavLink}
          to={`${url}/password/change`}
        >
          <ListItemText primary="Change Password" />
        </ListItem>
        <ListItem
          button
          className={active3 ? classes.selected : classes.list}
          alignItems="flex-start"
          selected={active3}
          component={NavLink}
          to={`${url}/apps`}
        >
          <ListItemText primary="Apps and Websites" />
        </ListItem>
        <ListItem
          button
          className={active4 ? classes.selected : classes.list}
          alignItems="flex-start"
          selected={active4}
          component={NavLink}
          to={`${url}/email`}
        >
          <ListItemText primary="Email and SMS" />
        </ListItem>
      </List>
    </div>
  );
}
