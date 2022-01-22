import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { follow, unFollow } from "../../slices/authSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: theme.spacing(1),
    position: "sticky",
    top: theme.spacing(13),
  },
  user: {
    marginBottom: theme.spacing(2.5),
  },
  userName: {
    cursor: "pointer",
  },
  suggestsSection: {
    marginBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  suggest: {
    color: "#787878",
  },
  suggestUser: {
    padding: theme.spacing(0.5, 0),
  },
  gray: {
    color: "#787878",
  },
  noSuggest: {
    color: "#a7a7a7",
    marginTop: theme.spacing(3),
  },
  btn: {
    textTransform: "none",
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    cursor: "pointer",
    textDecoration: "none",
    fontSize: '2rem',
    backgroundColor: '#3f51b5',
  },
  cursor: {
    cursor: "pointer",
  },
  avatar: {
    textDecoration: "none",
    backgroundColor: '#ff5722'
  }
}));

function SuggestItem({ user }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const userLetter = user?.displayName.charAt(0).toUpperCase()

  const handleFollow = () => {
    dispatch(follow(user._id));
  };

  const handleUnfollow = () => {
    dispatch(unFollow(user._id));
  };

  return (
    <div className={classes.suggestUser}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Avatar
                src={user.avatar}
                alt="avatar"
                component={NavLink}
                to={`/users/${user?.userName}`}
                className={classes.avatar}
              >
                {userLetter}
              </Avatar>
            </Grid>
            <Grid item>
              <Link
                component={NavLink}
                variant="subtitle2"
                color="textPrimary"
                to={`/users/${user.userName}`}
              >
                {user.userName}
              </Link>
              <Typography variant="body2" className={classes.gray}>
                {user.displayName.length > 10 ? "Suggested for you" : "Popular"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {currentUser.following.includes(user._id) ? (
            <Button className={classes.btn} onClick={handleUnfollow}>
              Following
            </Button>
          ) : (
            <Button
              className={classes.btn}
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
}

export default function SideSuggestions({ users }) {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.auth.user);
  const avatarLetter =
    currentUser?.displayName.charAt(0).toUpperCase()

  return (
    <div className={classes.root}>
      <div className={classes.user}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <Avatar
              src={currentUser.avatar}
              alt="avatar"
              className={classes.large}
              component={NavLink}
              to={`/users/${currentUser?.userName}`}
            >
              {avatarLetter}
            </Avatar>
          </Grid>
          <Grid item>
            <Link
              variant="h6"
              component={NavLink}
              underline="none"
              color="textPrimary"
              to={`/users/${currentUser?.userName}`}
            >
              {currentUser.userName}
            </Link>
            <Typography variant="body1" color="textPrimary">
              {currentUser.displayName}
            </Typography>
          </Grid>
        </Grid>
      </div>
      {users.length === 0 ? (
        <Typography
          variant="body1"
          align="center"
          className={classes.noSuggest}
        >
          Right now, there's no suggestions for you
        </Typography>
      ) : (
        <>
          <div className={classes.suggestsSection}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography className={classes.suggest} variant="subtitle2">
                  Suggestions For You
                </Typography>
              </Grid>
              <Grid item>
                <Link
                  component={NavLink}
                  to="/explore/people/suggested"
                  underline="none"
                  variant="subtitle2"
                  color="inherit"
                >
                  See All
                </Link>
              </Grid>
            </Grid>
          </div>

          {users.map((user, index) => (
            <SuggestItem key={index} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
