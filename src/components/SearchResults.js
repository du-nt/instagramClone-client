import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  searchResults: {
    position: "absolute",
    top: "125%",
    maxHeight: 320,
    width: "100%",
    // zIndex: 1000,
    boxSizing: "border-box",
    overflow: "auto",
    borderTop: "none",
    borderRadius: "0 0 4px 4px",
  },
  menuList: {
    padding: 0,
  },
  menuItem: {
    padding: theme.spacing(1.5, 3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gray: {
    color: "#5e5e5e",
    fontWeight: 100,
  },
  noResults: {
    color: "#8e8e8e",
    padding: theme.spacing(2),
  },
  avatar: {
    backgroundColor: '#ff5722',
  }
}));

export default function SearchResults({ users, handleDelete }) {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.searchResults}>
      {users.length ? (
        <MenuList className={classes.menuList}>
          {users.map((user, index) => (
            <div key={index}>
              <MenuItem
                className={classes.menuItem}
                component={NavLink}
                to={`/users/${user.userName}`}
                onClick={() => handleDelete()}
              >
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Avatar className={classes.avatar} src={user.avatar} alt="avatar" >
                      {user.displayName.charAt(0).toUpperCase()}
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">{user.userName}</Typography>
                    <Typography variant="body2" className={classes.gray}>
                      {user.displayName}
                    </Typography>
                  </Grid>
                </Grid>
              </MenuItem>
              {index + 1 < users.length && <Divider />}
            </div>
          ))}
        </MenuList>
      ) : (
        <Typography
          variant="body1"
          align="center"
          className={classes.noResults}
        >
          No results found.
        </Typography>
      )}
    </Paper>
  );
}
