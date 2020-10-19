import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import GridListTile from "@material-ui/core/GridListTile";
import CircularProgress from "@material-ui/core/CircularProgress";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getPosts } from "../../slices/postSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  overlayContainer: {
    position: "relative",
    "&:hover $overlay": {
      visibility: "visible",
      opacity: 1,
    },
  },
  moreIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 5,
    color: "white",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(51, 49, 49, 0.39)",
    zIndex: 4,
    opacity: 0,
    visibility: "hidden",
    transition: "all .4s",
  },
  overlayContent: {
    color: "white",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    fontSize: "2.3rem",
    fontWeight: 500,
    height: "100%",
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  count: {
    marginLeft: 5,
    fontSize: "0.7em",
  },
}));

export default function TitlebarGridList() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts(setPosts, setLoading));
  }, [dispatch]);

  if (loading)
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );

  return (
    <GridList cols={3} spacing={30} cellHeight={300}>
      {posts.map((post, index) => (
        <GridListTile
          className={classes.overlayContainer}
          key={index}
          component={NavLink}
          to={{ pathname: `/p/${post._id}`, state: { background: location } }}
        >
          <img src={post.filePaths[0]} alt="post" />
          <div className={classes.overlay}>
            <div className={classes.overlayContent}>
              <span className={classes.icon}>
                <FavoriteIcon />
                <span className={classes.count}>{post.likesCount}</span>
              </span>
              <span className={classes.icon}>
                <ChatBubbleIcon />
                <span className={classes.count}>{post.commentsCount}</span>
              </span>
            </div>
          </div>
          {post.filePaths.length >= 2 && (
            <div className={classes.moreIcon}>
              <PhotoLibraryIcon />
            </div>
          )}
        </GridListTile>
      ))}
    </GridList>
  );
}
