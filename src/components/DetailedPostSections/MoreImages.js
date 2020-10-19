import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { NavLink, useParams } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { useDispatch, useSelector } from "react-redux";

import { getMorePosts } from "../../slices/postSlice";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(7, 0),
  },
  overlayContainer: {
    position: "relative",
    "&:hover $overlay": {
      visibility: "visible",
      opacity: 1,
    },
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
    fontSize: "0.9em",
  },
  morePost: {
    marginBottom: theme.spacing(2),
  },
  moreIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 5,
    color: "white",
  },
}));

export default function MoreImages() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const [posts, setPosts] = React.useState([]);

  const { author, _id } = useSelector((state) => state.post.post) || {};

  useEffect(() => {
    dispatch(getMorePosts(author._id, _id, setPosts));
  }, [postId, dispatch, _id, author._id]);

  return (
    posts.length > 0 && (
      <>
        <Divider className={classes.divider} />

        <Typography variant="body1" className={classes.morePost}>
          <Typography component="span">More posts from </Typography>
          <Link
            underline="none"
            component={NavLink}
            to={`/users/${author?.userName}`}
          >
            {author?.userName}
          </Link>
        </Typography>
        <GridList
          cols={3}
          spacing={25}
          cellHeight={300}
          className={classes.gridList}
        >
          {posts.map((post, index) => (
            <GridListTile
              className={classes.overlayContainer}
              cols={1}
              rows={1}
              key={index}
              component={NavLink}
              to={`/p/${post._id}`}
            >
              <img src={post.filePaths[0]} alt="img" />
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
      </>
    )
  );
}
