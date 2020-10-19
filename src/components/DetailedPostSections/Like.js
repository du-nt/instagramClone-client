import React from "react";

import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
    cursor: "pointer",
  },
  likes: {
    display: "flex",
    // alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  cursor: {
    cursor: "pointer",
  },
}));

export default function Like({ likesCount, likes, handleLikeDialogOpen }) {
  const classes = useStyles();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const history = useHistory();

  if (!isAuthenticated)
    return (
      <Typography variant="subtitle2">
        {likesCount} {likesCount > 1 ? "likes" : "like"}
      </Typography>
    );

  const likedToDisplay = likes.find((like) => like.userName !== user.userName);

  return (
    <div className={classes.likes}>
      {likesCount === 1 ? (
        <>
          {likes[0].userName !== user.userName && (
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
            <Typography
              display="inline"
              color="primary"
              className={classes.cursor}
              onClick={() => history.push(`/users/${likedToDisplay.userName}`)}
            >
              {likedToDisplay.userName}
            </Typography>
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
            <Typography
              display="inline"
              color="primary"
              className={classes.cursor}
              onClick={() => history.push(`/users/${likedToDisplay.userName}`)}
            >
              {likedToDisplay.userName}
            </Typography>
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
