import React from "react";

import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import { toggleSaveDetailPost } from "../../slices/postSlice";

import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  action: {
    marginLeft: "auto",
    fontSize: 28,
    padding: 7,
  },
}));

export default function SavePost({ isSaved, id, handleModalOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleToggleSave = () => {
    dispatch(toggleSaveDetailPost(id));
  };

  const showModal = () => {
    handleModalOpen();
  };

  return (
    <IconButton
      aria-label="save"
      className={classes.action}
      onClick={isAuthenticated ? handleToggleSave : showModal}
    >
      {isSaved ? (
        <BookmarkIcon fontSize="inherit" />
      ) : (
        <BookmarkBorderOutlinedIcon fontSize="inherit" />
      )}
    </IconButton>
  );
}
