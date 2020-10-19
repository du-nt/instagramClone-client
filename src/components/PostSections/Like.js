import React from "react";

import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
    cursor: "pointer",
  },
  likes: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  cursor: {
    cursor: "pointer",
  },
}));

export default function Like({ likesCount, likes, handleLikeDialogOpen }) {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.auth.user);

  const likedToDisplay = likes.find(
    (like) => like.userName !== currentUser.userName
  );
  return (
    <div className={classes.likes}>
      {likesCount === 1 ? (
        <>
          {likes[0].userName !== currentUser.userName && (
            <Avatar
              alt="Remy Sharp"
              src={likes[0].avatar}
              className={classes.small}
              onClick={() => handleLikeDialogOpen()}
            />
          )}
          <Typography variant="subtitle2">1 like</Typography>
        </>
      ) : likesCount === 2 ? (
        <>
          <Avatar
            alt="Remy Sharp"
            src={likedToDisplay.avatar}
            className={classes.small}
            onClick={() => handleLikeDialogOpen()}
          />
          <Typography component="h3">
            Like by<span> </span>
            <Link component={NavLink} to={`/users/${likedToDisplay.userName}`}>
              {likedToDisplay.userName}
            </Link>
            <span> </span>and<span> </span>
            <Typography
              display="inline"
              color="primary"
              className={classes.cursor}
              onClick={() => handleLikeDialogOpen()}
            >
              1 other
            </Typography>
          </Typography>
        </>
      ) : (
        <>
          <Avatar
            alt="Remy Sharp"
            src={likedToDisplay.avatar}
            className={classes.small}
            onClick={() => handleLikeDialogOpen()}
          />
          <Typography color="textSecondary" component="h3">
            Like by<span> </span>
            <Link component={NavLink} to={`/users/${likedToDisplay.userName}`}>
              {likedToDisplay.userName}
            </Link>
            <span> </span>and<span> </span>
            <Typography
              display="inline"
              color="primary"
              className={classes.cursor}
              onClick={() => handleLikeDialogOpen()}
            >
              {likesCount - 1} others
            </Typography>
          </Typography>
        </>
      )}
    </div>
  );
}
