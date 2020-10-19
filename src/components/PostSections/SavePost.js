import React from "react";

import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import { toggleSave } from "../../slices/postSlice";

import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  action: {
    marginLeft: "auto",
    fontSize: 28,
    padding: 7,
  },
}));

export default function SavePost({ isSaved, id }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleToggleSave = () => {
    dispatch(toggleSave(id));
  };

  return (
    <IconButton
      aria-label="save"
      className={classes.action}
      onClick={handleToggleSave}
    >
      {isSaved ? (
        <BookmarkIcon fontSize="inherit" />
      ) : (
        <BookmarkBorderOutlinedIcon fontSize="inherit" />
      )}
    </IconButton>
  );
}
