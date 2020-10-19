import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.comment}>
      <Typography
        variant="subtitle2"
        className={classes.userName}
        onClick={() => history.push(`/users/${user.userName}`)}
      >
        {user.userName}
      </Typography>
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
