import React from "react";

import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import { toggleLikeDetailPost } from "../../slices/postSlice";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  actionBtn: {
    fontSize: 28,
    padding: 7,
    marginRight: 10,
  },
}));

export default function LikePost({ isLiked, id, handleModalOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const handleToggleLike = () => {
    const { _id, avatar, userName, displayName } = user;
    const currentUser = { _id, avatar, userName, displayName };
    dispatch(toggleLikeDetailPost(id, currentUser));
  };

  const showModal = () => {
    handleModalOpen();
  };

  return (
    <IconButton
      aria-label="favorites"
      onClick={isAuthenticated ? handleToggleLike : showModal}
      className={classes.actionBtn}
    >
      {isLiked ? (
        <FavoriteIcon color="secondary" fontSize="inherit" />
      ) : (
        <FavoriteBorderOutlinedIcon fontSize="inherit" />
      )}
    </IconButton>
  );
}
