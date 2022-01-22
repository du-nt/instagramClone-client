import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import { follow, unFollow } from "../../slices/authSlice";
import { followProfile, unFollowProfile } from "../../slices/userSlice";

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

export default function LikedItem({
  fromProfile,
  like,
  handleLikeDialogClose,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const profileUser = useSelector((state) => state.user);

  const isMe = user._id === profileUser._id;
  const { userName, displayName, avatar, _id } = like;

  const newUser = {
    _id: user._id,
    userName: user.userName,
    displayName: user.displayName,
    avatar: user.avatar,
  };

  const handleFollow = () => {
    fromProfile && !isMe && profileUser._id === _id
      ? dispatch(followProfile(_id, newUser))
      : dispatch(follow(_id));
  };

  const handleUnfollow = () => {
    fromProfile && !isMe && profileUser._id === _id
      ? dispatch(unFollowProfile(_id, newUser))
      : dispatch(unFollow(_id));
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
