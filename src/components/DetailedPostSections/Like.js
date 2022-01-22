import React from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Link } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
    cursor: "pointer",
    backgroundColor: '#ff5722',
    fontSize: '0.95rem'
  },
  likes: {
    display: "flex",
    // alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  cursor: {
    cursor: "pointer",
    fontWeight: 500,
    color: 'inherit',
  },
  userText: {
    color: 'inherit',
    fontWeight: 500
  }
}));

export default function Like({ likesCount, likes, handleLikeDialogOpen }) {
  const classes = useStyles();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

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
            >
              {likes[0].userName.charAt(0).toUpperCase()}
            </Avatar>
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
          >
            {likedToDisplay.userName.charAt(0).toUpperCase()}
          </Avatar>

          <Typography component="div" variant="body2">
            Like by<span> </span>
            <Link
              className={classes.userText}
              underline='none'
              component={NavLink}
              to={`/users/${likedToDisplay.userName}`}
            >
              {likedToDisplay.userName}
            </Link>
            <span> </span>and<span> </span>
            <Typography
              display="inline"
              color="primary"
              className={classes.cursor}
              onClick={() => handleLikeDialogOpen()}
              variant="body2"
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
          >
            {likedToDisplay.userName.charAt(0).toUpperCase()}
          </Avatar>

          <Typography component="div" variant="body2">
            Like by<span> </span>
            <Link
              className={classes.userText}
              underline='none'
              component={NavLink}
              to={`/users/${likedToDisplay.userName}`}
            >
              {likedToDisplay.userName}
            </Link>
            <span> </span>and<span> </span>
            <Typography
              display="inline"
              color="primary"
              className={classes.cursor}
              onClick={() => handleLikeDialogOpen()}
              variant="body2"
            >
              {likesCount - 1} others
            </Typography>
          </Typography>
        </>
      )}
    </div>
  );
}
