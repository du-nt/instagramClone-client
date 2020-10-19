import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

import MediaCard from "./MediaCard";
import Comment from "./Comment";
import Like from "./Like";
import SavePost from "./SavePost";
import LikePost from "./LikePost";
import MenuModal from "./MenuModal";
import ShareDialog from "./ShareDialog";
import LikeDialog from "./LikeDialog";
import AddComment from "./AddComment";

import { NavLink, useLocation } from "react-router-dom";

import { timeSince } from "../../utils";
import { useDispatch, useSelector } from "react-redux";

import { follow } from "../../slices/authSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 65,
  },
  actionBtn: {
    fontSize: 28,
    padding: 7,
    marginRight: 10,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    cursor: "pointer",
  },
  userName: {
    cursor: "pointer",
    fontSize: theme.spacing(2),
  },
  content: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  time: {
    textTransform: "uppercase",
    fontSize: 11,
    margin: theme.spacing(1, 0),
  },
  cursor: {
    cursor: "pointer",
  },
}));

export default function Post({ post }) {
  const [openActionMenu, setOpenActionMenu] = React.useState(false);
  const [shareModal, setShareModal] = React.useState(false);
  const [likeDialog, setLikeDialog] = React.useState(false);

  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const {
    author,
    _id,
    filePaths,
    title,
    likes,
    isLiked,
    isSaved,
    likesCount,
    commentsCount,
    comments,
    createdAt,
    newComments,
  } = post;

  const caption = {
    user: author,
    text: title,
  };

  const time = timeSince(createdAt);

  const handleOpen = () => {
    setOpenActionMenu(true);
  };

  const handleClose = () => {
    setOpenActionMenu(false);
  };

  const handleShareModalOpen = () => {
    setShareModal(true);
  };

  const handleShareModalClose = () => {
    setShareModal(false);
  };

  const handleLikeDialogOpen = () => {
    setLikeDialog(true);
  };

  const handleLikeDialogClose = () => {
    setLikeDialog(false);
  };

  const handleFollow = () => {
    dispatch(follow(author._id));
  };

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardHeader
          avatar={
            <Avatar
              className={classes.avatar}
              src={author.avatar}
              component={NavLink}
              to={`/users/${author.userName}`}
            />
          }
          title={
            <>
              <Link
                component={NavLink}
                variant="subtitle2"
                color="textPrimary"
                to={`/users/${author.userName}`}
              >
                {author.userName}
              </Link>
              {author._id !== user._id && !user.following.includes(author._id) && (
                <>
                  <span> &#9679; </span>
                  <Link
                    underline="none"
                    variant="subtitle2"
                    className={classes.cursor}
                    onClick={handleFollow}
                  >
                    Follow
                  </Link>
                </>
              )}
            </>
          }
          action={
            <IconButton aria-label="settings" onClick={handleOpen}>
              <MoreHorizIcon />
            </IconButton>
          }
          //   classes={{
          //     content: classes.headerContent,
          //     action: classes.headerAction,
          //   }}
        />
        <CardMedia
          className={classes.media}
          component={() => <MediaCard files={filePaths} />}
        />
        <CardActions disableSpacing>
          <LikePost isLiked={isLiked} id={_id} />
          <IconButton
            aria-label="comment"
            component={NavLink}
            to={`/p/${_id}`}
            className={classes.actionBtn}
          >
            <ChatBubbleOutlineOutlinedIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="share"
            onClick={handleShareModalOpen}
            className={classes.actionBtn}
          >
            <SendOutlinedIcon fontSize="inherit" />
          </IconButton>
          <SavePost isSaved={isSaved} id={_id} />
        </CardActions>
        <CardContent className={classes.content}>
          {likesCount > 0 && (
            <Like
              likesCount={likesCount}
              likes={likes}
              handleLikeDialogOpen={handleLikeDialogOpen}
            />
          )}
          {title && <Comment comment={caption} noIcon={true} />}
          {commentsCount > 2 && (
            <Link
              underline="none"
              variant="body2"
              component={NavLink}
              to={{ pathname: `/p/${_id}`, state: { background: location } }}
            >
              View all {commentsCount} comments
            </Link>
          )}

          {comments?.slice(-2).map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
          {newComments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
          <Typography color="textSecondary" className={classes.time}>
            {time} ago
          </Typography>
        </CardContent>
        <AddComment _id={_id} />
      </Card>
      {openActionMenu && (
        <MenuModal
          id={_id}
          author={author}
          open={openActionMenu}
          handleMenuModalClose={handleClose}
        />
      )}
      {shareModal && (
        <ShareDialog
          open={shareModal}
          handleShareModalClose={handleShareModalClose}
        />
      )}
      {likeDialog && (
        <LikeDialog
          likes={likes}
          open={likeDialog}
          handleLikeDialogClose={handleLikeDialogClose}
        />
      )}
    </>
  );
}
