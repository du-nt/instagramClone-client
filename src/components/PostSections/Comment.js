import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { NavLink } from "react-router-dom";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  love: {
    padding: 4,
    marginLeft: "auto",
  },
  icon: {
    width: "0.8em",
    height: "0.8em",
  },
  comment: {
    display: "flex",
    alignItems: "center",
  },
  userName: {
    padding: theme.spacing(0.5, 0),
    cursor: "pointer",
  },
  text: {
    marginLeft: theme.spacing(1),
  },
}));

export default function Comment({ comment, noIcon }) {
  const { user, text } = comment;
  const classes = useStyles();

  return (
    <div className={classes.comment}>
      <Link
        variant="subtitle2"
        className={classes.userName}
        component={NavLink}
        to={`/users/${user.userName}`}
        color='inherit'
      >
        {user.userName}
      </Link>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.text}
      >
        {text}
      </Typography>
      {!noIcon && (
        <IconButton aria-label="favorite comment" className={classes.love}>
          <FavoriteBorderOutlinedIcon className={classes.icon} />
        </IconButton>
      )}
    </div>
  );
}

Comment.defaultProps = {
  noIcon: false,
};
