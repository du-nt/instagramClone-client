import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
}));

export default function NotYet() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4">This feature is not yet implemented</Typography>
    </div>
  );
}
