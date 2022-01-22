import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import GridListTile from "@material-ui/core/GridListTile";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import Typography from "@material-ui/core/Typography";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
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

export default function TitlebarGridList({ handleShowModal }) {
  const classes = useStyles();
  const location = useLocation();
  const posts = useSelector((state) => state.user.posts);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const showModal = (e) => {
    e.preventDefault();
    handleShowModal();
  };

  return posts.length > 0 ? (
    <GridList cols={3} spacing={30} cellHeight={300}>
      {posts.map((post, index) => (
        <GridListTile
          className={classes.overlayContainer}
          key={index}
          component={NavLink}
          to={{
            pathname: `/p/${post._id}`,
            state: { background: location, fromProfile: true },
          }}
          onClick={!isAuthenticated ? showModal : null}
        >
          <img src={post.filePaths[0]} alt={post._id} />
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
  ) : (
    <div className={classes.noPost}>
      <PhotoCameraOutlinedIcon className={classes.photo} />
      <Typography variant="h5" className={classes.noText}>
        No Posts Yet
      </Typography>
    </div>
  );
}
