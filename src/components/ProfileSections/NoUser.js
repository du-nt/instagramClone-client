import React from "react";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  icon: {
    padding: theme.spacing(3),
    border: "3px solid #000",
    borderRadius: "50%",
    fontSize: "4rem",
    marginTop: theme.spacing(3),
  },
  margin: {
    marginTop: theme.spacing(2),
  },
}));

function NoUser({ title, text }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PersonAddOutlinedIcon className={classes.icon} />
      <Typography variant="h5" className={classes.margin}>
        {title}
      </Typography>
      <Typography variant="subtitle1" className={classes.margin}>
        {text}
      </Typography>
    </div>
  );
}

export default NoUser;
