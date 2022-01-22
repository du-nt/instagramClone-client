import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  noPost: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(6),
    color: "#737373",
  },
  photo: {
    fontSize: "2.5rem",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(3),
    border: "3px solid #737373",
    borderRadius: "50%",
  },
  noText: {
    fontWeight: 100,
  },
}));

export default function TaggedPosts() {
  const classes = useStyles();
  return (
    <div className={classes.noPost}>
      <PhotoCameraOutlinedIcon className={classes.photo} />
      <Typography variant="h5" className={classes.noText}>
        No Photos
      </Typography>
    </div>
  );
}
