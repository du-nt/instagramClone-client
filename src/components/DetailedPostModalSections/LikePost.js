import React from "react";

import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import { toggleLike } from "../../slices/postSlice";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  actionBtn: {
    fontSize: 28,
    padding: 7,
    marginRight: 10,
  },
}));

export default function LikePost({ isLiked, id }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { _id, avatar, userName, displayName } = useSelector(
    (state) => state.auth.user
  );

  const user = { _id, avatar, userName, displayName };
  const setTwoPlaces = true;

  const handleToggleLike = () => {
    dispatch(toggleLike(id, user, setTwoPlaces));
  };

  return (
    <IconButton
      aria-label="favorites"
      onClick={handleToggleLike}
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
