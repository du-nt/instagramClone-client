import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
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
import { Link } from "@material-ui/core";

import MediaCard from "./MediaCard.js";
import MenuModal from "./MenuModal";
import ShareDialog from "./ShareDialog";
import LikePost from "./LikePost";
import SavePost from "./SavePost";
import Like from "./Like";
import LikeDialog from "./LikeDialog";
import Comment from "./Comment";

import { NavLink, useLocation } from "react-router-dom";

import { timeSince } from "../../utils";
import { follow, unFollow } from "../../slices/authSlice";
import { addCommentOnDetailPost } from "../../slices/postSlice";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .required("Text is required")
    .max(50, "Text must have max 50 characters"),
});

const useStyles = makeStyles((theme) => ({
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
  toLogin: {
    borderTop: "1px solid #dbdbdb",
    height: 62,
    boxSizing: "border-box",
    textAlign: "center",
    padding: "21px 0",
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

export default function Details({ handleModalOpen }) {
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [likeDialog, setLikeDialog] = useState(false);
  const classes = useStyles();
  const inputRef = useRef(null);
  const commmentsEndRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();

  const post = useSelector((state) => state.post.post);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

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
      const currentUser = {
        _id: user._id,
        avatar: user.avatar,
        userName: user.userName,
      };
      dispatch(
        addCommentOnDetailPost(
          _id,
          values,
          currentUser,
          resetForm,
          scrollToBottom
        )
      );
    },
  });

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
    dispatch(follow(author._id));
  };

  const handleUnfollow = () => {
    dispatch(unFollow(author._id));
  };

  const scrollToBottom = () =>
    commmentsEndRef.current.scrollIntoView({ behaviour: "smooth" });

  const handleAddComment = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const showModal = () => {
    handleModalOpen();
  };

  return (
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
                >
                  {author.userName}
                </Link>
                {!isAuthenticated ? (
                  <>
                    <span> &#9679; </span>
                    <Link
                      underline="none"
                      variant="subtitle2"
                      className={classes.cursor}
                      onClick={showModal}
                    >
                      Follow
                    </Link>
                  </>
                ) : (
                  author._id !== user._id && (
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
                  )
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
            <LikePost
              isLiked={isLiked}
              id={_id}
              handleModalOpen={handleModalOpen}
            />
            <IconButton
              aria-label="comment"
              onClick={isAuthenticated ? handleFocus : showModal}
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
            <SavePost
              isSaved={isSaved}
              id={_id}
              handleModalOpen={handleModalOpen}
            />
          </CardActions>
          <CardContent className={classes.content2}>
            {likesCount > 0 ? (
              <Like
                likesCount={likesCount}
                likes={likes}
                handleLikeDialogOpen={handleLikeDialogOpen}
              />
            ) : (
              isAuthenticated && (
                <Typography variant="subtitle2" color="textSecondary">
                  Be the first to like this
                </Typography>
              )
            )}
            <Typography color="textSecondary" className={classes.time}>
              {time} ago
            </Typography>
          </CardContent>
          {isAuthenticated ? (
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
          ) : (
            <div className={classes.toLogin}>
              <Link
                underline="none"
                variant="body2"
                component={NavLink}
                to={{ pathname: "/login", state: { from: location.pathname } }}
              >
                Log in
              </Link>
              <Typography
                display="inline"
                variant="body2"
                color="textSecondary"
              >
                <span> </span>to like or comment.
              </Typography>
            </div>
          )}
        </Card>
      </div>
      {openActionMenu && (
        <MenuModal
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
    </div>
  );
}
