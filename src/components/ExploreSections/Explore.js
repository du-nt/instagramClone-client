import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import GridList from "./GridList";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
}));

export default function Explore() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <GridList />
    </Container>
  );
}
