import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "@material-ui/core";

import MediaCard from "./MediaCard";
import MenuModal from "./MenuModal";
import ShareDialog from "./ShareDialog";
import LikePost from "./LikePost";
import SavePost from "./SavePost";
import Like from "./Like";
import LikeDialog from "./LikeDialog";
import Comment from "./Comment";

import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import { timeSince } from "../../utils";
import { follow, unFollow } from "../../slices/authSlice";
import { followProfile, unFollowProfile } from "../../slices/userSlice";
import { addCommentOnDetailPost, getPost } from "../../slices/postSlice";

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .required("Text is required")
    .max(50, "Text must have max 50 characters"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 619,
  },
  modal: {
    height: 700,
  },
  cover: {
    display: "flex",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  left: {
    width: "60%",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderLeft: "none",
    borderRadius: "0 4px 4px 0",
    boxSizing: "border-box",
  },
  form: {
    borderTop: "1px solid #dbdbdb",
    display: "flex",
    minHeight: 62,
    boxSizing: "border-box",
  },
  content: {
    flex: 1,
    height: 619,
  },
  content2: {
    padding: theme.spacing(0, 2),
  },
  comments: {
    padding: theme.spacing(0, 2),
    flexGrow: 1,
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: 0,
    },
    border: "1px solid #e0e0e0",
    borderLeft: "none",
    borderRight: "none",
  },
  action: {
    marginLeft: "auto",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  likes: {
    display: "flex",
    alignItems: "center",
  },
  actionBtn: {
    fontSize: 28,
    padding: 7,
    marginRight: 10,
  },
  time: {
    textTransform: "uppercase",
    fontSize: 11,
    margin: theme.spacing(1, 0),
  },
  cursor: {
    cursor: "pointer",
  },
  avatar: {
    textDecoration: "none",
    backgroundColor: '#ff5722'
  }
}));

const CommentCssTextField = withStyles({
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    boxSizing: "border-box",
    flex: 1,
    padding: "5px 5px 5px 25px",
    border: "none",
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:before": {
      content: "none",
    },
    "& .MuiInput-underline:after": {
      content: "none",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
    },
  },
})(TextField);

export default function DetailedPostModal({ fromProfile }) {
  const history = useHistory();
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [likeDialog, setLikeDialog] = useState(false);
  const classes = useStyles();
  const inputRef = useRef(null);
  const commmentsEndRef = useRef(null);
  const dispatch = useDispatch();

  const post = useSelector((state) => state.post.post);
  const user = useSelector((state) => state.auth.user);
  const profileUser = useSelector((state) => state.user);
  const isMe = user._id === profileUser._id;

  const {
    author,
    filePaths,
    _id,
    isLiked,
    isSaved,
    likes,
    likesCount,
    createdAt,
    title,
  } = post;

  const ownerTitle = { user: author, text: title };

  const currentUser = {
    _id: user._id,
    avatar: user.avatar,
    userName: user.userName,
  };

  const newUser = {
    _id: user._id,
    userName: user.userName,
    displayName: user.displayName,
    avatar: user.avatar,
  };

  const time = timeSince(createdAt);

  const initialValues = {
    text: "",
  };

  const {
    isSubmitting,
    values,
    dirty,
    isValid,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        addCommentOnDetailPost(
          _id,
          values,
          currentUser,
          resetForm,
          scrollToBottom,
          true
        )
      );
    },
  });

  const goBack = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  useEffect(() => {
    dispatch(getPost(postId, setLoading));
  }, [postId, dispatch]);

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

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const handleLikeDialogOpen = () => {
    setLikeDialog(true);
  };

  const handleLikeDialogClose = () => {
    setLikeDialog(false);
  };

  const handleFollow = () => {
    fromProfile && !isMe && profileUser._id === author._id
      ? dispatch(followProfile(author._id, newUser))
      : dispatch(follow(author._id));
  };

  const handleUnfollow = () => {
    fromProfile && !isMe && profileUser._id === author._id
      ? dispatch(unFollowProfile(author._id, newUser))
      : dispatch(unFollow(author._id));
  };

  const scrollToBottom = () =>
    commmentsEndRef.current.scrollIntoView({ behaviour: "smooth" });

  const handleAddComment = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Dialog id="dfd" open onClose={goBack} maxWidth="md" fullWidth>
      {loading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.cover}>
          <div className={classes.left}>
            <CardMedia
              children={<MediaCard files={filePaths} />}
            />
          </div>
          <div className={classes.content}>
            <Card variant="outlined" className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="recipe"
                    className={classes.avatar}
                    src={author.avatar}
                    component={NavLink}
                    to={`/users/${author.userName}`}
                  >
                    {author.userName.charAt(0).toUpperCase()}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings" onClick={handleOpen}>
                    <MoreHorizIcon />
                  </IconButton>
                }
                title={
                  <>
                    <Link
                      component={NavLink}
                      variant="subtitle2"
                      color="textPrimary"
                      to={`/users/${author.userName}`}
                      underline="none"
                    >
                      {author.userName}
                    </Link>
                    {author._id !== user._id && (
                      <>
                        <span> &#9679; </span>
                        {user.following.includes(author._id) ? (
                          <Link
                            underline="none"
                            variant="subtitle2"
                            className={classes.cursor}
                            color="textSecondary"
                            onClick={handleUnfollow}
                          >
                            Following
                          </Link>
                        ) : (
                          <Link
                            underline="none"
                            variant="subtitle2"
                            className={classes.cursor}
                            onClick={handleFollow}
                          >
                            Follow
                          </Link>
                        )}
                      </>
                    )}
                  </>
                }
              />

              <CardContent className={classes.comments}>
                {title && <Comment comment={ownerTitle} noIcon={true} />}
                {post.comments.map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))}
                <div ref={commmentsEndRef} />
              </CardContent>
              <CardActions disableSpacing>
                <LikePost isLiked={isLiked} id={_id} />
                <IconButton
                  aria-label="comment"
                  onClick={handleFocus}
                  className={classes.actionBtn}
                >
                  <ChatBubbleOutlineOutlinedIcon />
                </IconButton>
                <IconButton
                  aria-label="share"
                  onClick={handleShareModalOpen}
                  className={classes.actionBtn}
                >
                  <SendOutlinedIcon />
                </IconButton>
                <SavePost isSaved={isSaved} id={_id} />
              </CardActions>
              <CardContent className={classes.content2}>
                {likesCount > 0 ? (
                  <Like
                    likesCount={likesCount}
                    likes={likes}
                    handleLikeDialogOpen={handleLikeDialogOpen}
                  />
                ) : (
                  <Typography variant="subtitle2" color="textSecondary">
                    Be the first to like this
                  </Typography>
                )}
                <Typography color="textSecondary" className={classes.time}>
                  {time} ago
                </Typography>
              </CardContent>
              <form
                className={classes.form}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                onKeyDown={handleAddComment}
              >
                <CommentCssTextField
                  id={_id}
                  name="text"
                  value={values.text}
                  inputRef={inputRef}
                  onChange={handleChange}
                  multiline
                  rowsMax={3}
                  placeholder="Add a comment..."
                />
                <Button
                  type="submit"
                  color="primary"
                  disabled={!isValid || !dirty || isSubmitting}
                >
                  Post
                </Button>
              </form>
            </Card>
          </div>
          {openActionMenu && (
            <MenuModal
              id={_id}
              author={author}
              open={openActionMenu}
              handleMenuModalClose={handleClose}
              handleUnfollow={handleUnfollow}
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
              fromProfile={fromProfile}
              likes={likes}
              open={likeDialog}
              handleLikeDialogClose={handleLikeDialogClose}
            />
          )}
        </div>
      )}
    </Dialog>
  );
}
