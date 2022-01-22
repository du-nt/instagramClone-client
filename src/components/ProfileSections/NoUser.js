import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  icon: {
    padding: theme.spacing(3),
    border: "2px solid #737373",
    borderRadius: "50%",
    fontSize: "3rem",
    marginTop: theme.spacing(3),
    color: '#737373',
    marginBottom: theme.spacing(3),
  },
}));

function NoUser({ title, text }) {
  const classes = useStyles();

  const UserIcon = () => (
    <SvgIcon className={classes.icon} >
      <path
        d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3h3v-2H6V7H4v3H1v2h3v3z"
        stroke="white"
        strokeWidth={1}
      />
    </SvgIcon>
  );

  return (
    <div className={classes.root}>
      <UserIcon />
      <Typography variant="subtitle1" >
        {title}
      </Typography>
      <Typography variant="body2" >
        {text}
      </Typography>
    </div>
  );
}

export default NoUser;
