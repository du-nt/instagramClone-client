import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { Container, Link } from "@material-ui/core";

import ProfileTabs from "./ProfileTabs";
import MenuModal from "./MenuModal";
import UploadMenuModal from "./UploadMenuModal";
import FollowersDialog from "./FollowersDialog";
import FollowingDialog from "./FollowingDialog";
import LoginModal from "./LoginModal";
import Dead from "./Dead";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { changePhoto } from "../../slices/authSlice";
import {
  getProfile,
  followProfile,
  unFollowProfile,
} from "../../slices/userSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    padding: theme.spacing(5, 10),
    marginBottom: theme.spacing(3),
  },
  buttonGroup: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    marginLeft: theme.spacing(3),
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
  allInfo: {
    flex: 1,
    marginLeft: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
  },
  info: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  margin: {
    marginLeft: theme.spacing(3),
    cursor: "pointer",
  },
  notCursor: {
    marginLeft: theme.spacing(3),
  },
  more: {
    marginTop: theme.spacing(1),
  },
  large: {
    width: theme.spacing(23),
    height: theme.spacing(23),
    cursor: "pointer",
    fontSize: '6rem',
    backgroundColor: '#ff5722'
  },
  noCursor: {
    width: theme.spacing(23),
    height: theme.spacing(23),
    fontSize: '6rem',
    backgroundColor: '#ff5722'
  },
  gray: {
    color: "#676767",
    fontWeight: 100,
  },
  isCursor: {
    cursor: "pointer",
  },
  displayName: {
    fontWeight: 500
  }
}));

export default function Profile() {
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [followersDialog, setFollowersDialog] = useState(false);
  const [followingDialog, setFollowingDialog] = useState(false);
  const [loginDialog, setLoginDialog] = useState(false);
  const [isDead, setIsDead] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { userNameParam } = useParams();
  const inputFile = useRef(null);
  const isMountedRef = useRef(null);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const {
    _id,
    avatar,
    displayName,
    bio,
    website,
    userName,
    postCount,
    followersCount,
    followingCount,
    followers,
    following,
  } = useSelector((state) => state.user);

  const avatarLetter = user?.displayName.charAt(0).toUpperCase();
  const userLetter = displayName && displayName.charAt(0).toUpperCase();
  const isMe = isAuthenticated && user._id === _id;
  const isFollowing = isAuthenticated && user.following.includes(_id);
  const mineAvatar = isAuthenticated && user.avatar;

  const newUser = isAuthenticated && {
    _id: user._id,
    userName: user.userName,
    displayName: user.displayName,
    avatar: user.avatar,
  };

  useEffect(() => {
    isMountedRef.current = true;
    setLoading(true);
    setFollowersDialog(false)
    setFollowingDialog(false)
    dispatch(
      getProfile(userNameParam, setLoading, isMountedRef.current, setIsDead)
    );

    return () => (isMountedRef.current = false);
  }, [userNameParam, dispatch]);

  const handleOpen = () => {
    setOpenActionMenu(true);
  };

  const handleClose = () => {
    setOpenActionMenu(false);
  };

  const handleFollow = () => {
    dispatch(followProfile(_id, newUser));
  };

  const handleUnfollow = () => {
    dispatch(unFollowProfile(_id, newUser));
  };

  const handleModalOpen = () => {
    if (
      mineAvatar ===
      "https://res.cloudinary.com/douy56nkf/image/upload/v1594060920/defaults/txxeacnh3vanuhsemfc8.png"
    ) {
      inputFile.current.click();
    } else {
      setOpen(true);
    }
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleImageUpload = ({ target }) => {
    if (target.files[0]) {
      const data = new FormData();
      data.append("file", target.files[0]);
      dispatch(changePhoto(data, toast));
    }
  };

  const handleFollowersDialogOpen = () => {
    setFollowersDialog(true);
  };

  const handleFollowersDialogClose = () => {
    setFollowersDialog(false);
  };

  const handleFollowingDialogOpen = () => {
    setFollowingDialog(true);
  };

  const handleFollowingDialogClose = () => {
    setFollowingDialog(false);
  };

  const showModal = () => {
    setLoginDialog(true);
  };

  const closeModal = () => {
    setLoginDialog(false);
  };

  if (isDead) return <Dead />;

  return (
    !loading && (
      <Container maxWidth="md">
        <div className={classes.container}>
          <Avatar
            alt="avatar"
            src={isMe ? mineAvatar : avatar}
            className={isMe ? classes.large : classes.noCursor}
            onClick={isMe ? handleModalOpen : null}
          >
            {isMe ? avatarLetter : userLetter}
          </Avatar>
          {isMe && (
            <input
              type="file"
              accept="image/*"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          )}
          <div className={classes.allInfo}>
            <div className={classes.buttonGroup}>
              <Typography variant="h5" className={classes.gray}>
                {userName}
              </Typography>
              {!isAuthenticated ? (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={showModal}
                >
                  Follow
                </Button>
              ) : isMe ? (
                <>
                  <Button
                    variant="outlined"
                    className={classes.button}
                    component={NavLink}
                    to="/accounts/edit"
                  >
                    Edit Profile
                  </Button>

                  <IconButton
                    aria-label="setting"
                    className={classes.icon}
                    onClick={handleOpen}
                  >
                    <SettingsOutlinedIcon />
                  </IconButton>
                </>
              ) : !isFollowing ? (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleFollow}
                >
                  Follow
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={handleUnfollow}
                  >
                    Unfollow
                  </Button>
                  <Button variant="outlined" className={classes.button}>
                    Message
                  </Button>
                </>
              )}
            </div>
            <div className={classes.info}>
              <Typography
                variant="subtitle1"
                onClick={!isAuthenticated ? showModal : null}
                className={!isAuthenticated ? classes.isCursor : null}
              >
                {postCount}
                <span className={classes.gray}>
                  {postCount > 1 ? " posts" : " post"}
                </span>
              </Typography>
              <Typography
                className={
                  !isAuthenticated
                    ? classes.margin
                    : !isMe && !followersCount
                      ? classes.notCursor
                      : classes.margin
                }
                variant="subtitle1"
                onClick={
                  !isAuthenticated
                    ? showModal
                    : !isMe && !followersCount
                      ? null
                      : handleFollowersDialogOpen
                }
              >
                {followersCount}
                <span className={classes.gray}>
                  {followersCount > 1 ? " followers" : " follower"}
                </span>
              </Typography>
              <Typography
                className={
                  !isAuthenticated
                    ? classes.margin
                    : !isMe && !followingCount
                      ? classes.notCursor
                      : classes.margin
                }
                variant="subtitle1"
                onClick={
                  !isAuthenticated
                    ? showModal
                    : !isMe && !followingCount
                      ? null
                      : handleFollowingDialogOpen
                }
              >
                {isMe ? user.followingCount : followingCount}
                <span className={classes.gray}> following</span>
              </Typography>
            </div>
            <div className={classes.more}>
              <Typography className={classes.displayName} variant="subtitle1">{displayName}</Typography>
              {bio && <Typography variant="body1">{bio}</Typography>}
              {website && (
                <Link
                  href={`https://www.${website}`}
                  target="_blank"
                  variant="body1"
                  underline="none"
                >
                  {website}
                </Link>
              )}
            </div>
          </div>
        </div>
        <Divider />
        <ProfileTabs isMe={isMe} handleShowModal={showModal} />
        {openActionMenu && (
          <MenuModal open={openActionMenu} handleMenuModalClose={handleClose} />
        )}
        {open && (
          <UploadMenuModal open={open} handleModalClose={handleModalClose} />
        )}
        {loginDialog && (
          <LoginModal open={loginDialog} closeModal={closeModal} />
        )}
        {
          <FollowersDialog
            open={followersDialog}
            followers={followers}
            handleFollowersDialogClose={handleFollowersDialogClose}
          />
        }
        {
          <FollowingDialog
            open={followingDialog}
            following={following}
            handleFollowingDialogClose={handleFollowingDialogClose}
          />
        }
        {isMe && <ToastContainer />}
      </Container>
    )
  );
}
