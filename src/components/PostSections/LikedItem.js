import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";

import { follow, unFollow } from "../../slices/authSlice";
import { NavLink } from "react-router-dom";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  likedUser: {
    padding: theme.spacing(0.5, 0),
  },
  btn: {
    textTransform: "none",
  },
  cursor: {
    cursor: "pointer",
  },
  avatar: {
    backgroundColor: "#ff5722",
    textDecoration: "none",
  }
}));

export default function LikedItem({ like, handleLikeDialogClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const { userName, displayName, avatar, _id } = like;

  const handleFollow = () => {
    dispatch(follow(_id));
  };

  const handleUnfollow = () => {
    dispatch(unFollow(_id));
  };

  return (
    <div className={classes.likedUser}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar
                src={avatar}
                alt="avatar"
                className={classes.avatar}
                component={NavLink}
                to={`/users/${userName}`}
              >
                {displayName.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item>
              <Link
                className={classes.cursor}
                variant="subtitle2"
                component={NavLink}
                to={`/users/${userName}`}
                color="inherit"
              >
                {userName}
              </Link>
              <Typography color="textSecondary" variant="body1">{displayName}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {_id !== user._id &&
            (user.following.includes(_id) ? (
              <Button
                className={classes.btn}
                variant="outlined"
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
            ))}
        </Grid>
      </Grid>
    </div>
  );
}
