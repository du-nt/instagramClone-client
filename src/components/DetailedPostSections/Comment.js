import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { NavLink } from "react-router-dom";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  love: {
    marginLeft: "auto",
    position: "relative",
  },
  iconButton: {
    padding: 4,
  },
  iconButton1: {
    padding: 4,
    position: "absolute",
    top: 0,
    right: theme.spacing(4),
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    boxShadow: "0px 0px 10px 5px #fff",
  },
  icon: {
    width: "0.8em",
    height: "0.8em",
  },
  comment: {
    display: "flex",
    padding: theme.spacing(3, 0, 0, 0),
  },
  info: {
    marginLeft: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  down: {
    marginTop: theme.spacing(1),
  },
  rep: {
    marginLeft: theme.spacing(2),
    cursor: "pointer",
  },
  userName: {
    cursor: "pointer",
  },
  text: {
    marginLeft: theme.spacing(1),
    wordBreak: "break-word",
  },
}));

export default function Comment({ comment, noIcon }) {
  const { user, text } = comment;
  const classes = useStyles();
  const [display, setDisplay] = React.useState(false);

  const handleMouseEnter = () => {
    setDisplay(true);
  };

  const handleMouseLeave = () => {
    setDisplay(false);
  };

  return (
    <div
      className={classes.comment}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      <Avatar
        alt="avatar"
        src={user.avatar}
        component={NavLink}
        to={`/users/${user.userName}`}
      />
      <div className={classes.info}>
        <div>
          <Link
            component={NavLink}
            variant="subtitle2"
            color="textPrimary"
            className={classes.userName}
            to={`/users/${user.userName}`}
          >
            {user.userName}
          </Link>
          <Typography
            component="span"
            variant="body2"
            color="textSecondary"
            className={classes.text}
          >
            {text}
          </Typography>
        </div>
        <div className={classes.down}>
          <Typography variant="caption" color="textSecondary">
            1w
          </Typography>
          {!noIcon && (
            <Typography variant="caption" className={classes.rep}>
              Reply
            </Typography>
          )}
        </div>
      </div>
      {!noIcon && (
        <div className={classes.love}>
          {display && (
            <IconButton aria-label="more" className={classes.iconButton1}>
              <MoreHorizIcon className={classes.icon} />
            </IconButton>
          )}
          <IconButton aria-label="favorite" className={classes.iconButton}>
            <FavoriteBorderOutlinedIcon className={classes.icon} />
          </IconButton>
        </div>
      )}
    </div>
  );
}

Comment.defaultProps = {
  noIcon: false,
};
