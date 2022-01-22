import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    marginTop: 300
  },
}));

export default function NotYet() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography color='textSecondary' variant="h5">This feature is not yet implemented</Typography>
    </div>
  );
}
