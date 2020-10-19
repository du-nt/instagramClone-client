import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { follow, unFollow } from "../../slices/authSlice";

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
}));

export default function Follower({ follower, handleFollowersDialogClose }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { userName, displayName, avatar, _id } = follower;
  const handleClick = () => {
    handleFollowersDialogClose();
    history.push(`/users/${userName}`);
  };

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
                className={classes.cursor}
                onClick={handleClick}
              />
            </Grid>
            <Grid item>
              <Typography
                className={classes.cursor}
                variant="subtitle2"
                onClick={handleClick}
              >
                {userName}
              </Typography>
              <Typography variant="body1">{displayName}</Typography>
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
