import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getUsers } from "../slices/userSlice";
import { follow, unFollow } from "../slices/authSlice";

const useStyles = makeStyles((theme) => ({
  text: {
    margin: theme.spacing(3, 0, 1, 0),
    fontWeight: 500
  },
  paper: {
    padding: theme.spacing(2),
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    cursor: "pointer",
    backgroundColor: "#ff5722",
    fontSize: '1.5rem',
    textDecoration: "none",
  },
  btn: {
    textTransform: "none",
  },
  user: {
    margin: theme.spacing(1, 0),
  },
  gray: {
    color: "#a7a7a7",
  },
}));

const SuggestItem = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const userLetter = user.displayName.charAt(0).toUpperCase()

  const handleFollow = () => {
    dispatch(follow(user._id));
  };

  const handleUnfollow = () => {
    dispatch(unFollow(user._id));
  };

  return (
    <div className={classes.user}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item>
              <Avatar
                className={classes.large}
                src={user.avatar}
                alt="avatar"
                component={NavLink}
                to={`/users/${user.userName}`}
              >
                {userLetter}
              </Avatar>
            </Grid>
            <Grid item>
              <Link
                variant="subtitle2"
                component={NavLink}
                to={`/users/${user.userName}`}
                color="inherit"
              >
                {user.userName}
              </Link>
              <Typography variant="body2" className={classes.gray}>
                {user.displayName}
              </Typography>
              <Typography variant="caption" className={classes.gray}>
                {user.displayName.length > 10 ? "Suggested for you" : "Popular"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {currentUser.following.includes(user._id) ? (
            <Button
              className={classes.btn}
              variant="contained"
              onClick={handleUnfollow}
            >
              Following
            </Button>
          ) : (
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              onClick={handleFollow}
            >
              Follow
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default function Suggested() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(setUsers, setLoading));
  }, [dispatch]);

  return (
    !loading && (
      <Container maxWidth="md">
        <Grid container justify="center">
          <Grid item xs={8}>
            <Typography className={classes.text} variant="subtitle1">
              Suggested
            </Typography>
            <Paper elevation={0} className={classes.paper}>
              {users.map((user, index) => (
                <SuggestItem key={index} user={user} />
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  );
}
