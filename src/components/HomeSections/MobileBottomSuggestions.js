import React from "react";
import Swiper from "react-id-swiper";

import "swiper/css/swiper.css";
import "./MobileBottomSuggestions.css";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { follow, unFollow } from "../../slices/authSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    border: "1px solid #dbdbdb",
    padding: theme.spacing(3, 3),
    borderRadius: 4,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  suggest: {
    color: "#8e8e8e",
  },
  slide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #dbdbdb",
    borderRadius: 4,
    boxSizing: "border-box",
  },
  btn: {
    margin: theme.spacing(1, 0, 2, 0),
    textTransform: "none",
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: theme.spacing(3, 0, 1.5, 0),
  },
  subtitle: {
    color: "#969696",
  },
  seeAll: {
    cursor: "pointer",
  },
}));

export default function MobileBottomSuggestions({ users }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const handleFollow = (_id) => {
    dispatch(follow(_id));
  };

  const handleUnfollow = (_id) => {
    dispatch(unFollow(_id));
  };

  const params = {
    speed: 800,
    slidesPerView: 2,
    spaceBetween: 10,
    slidesPerGroup: 2,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: ".swiper-button-next.custom",
      prevEl: ".swiper-button-prev.custom",
    },
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="subtitle2" className={classes.suggest}>
          Suggestions For You
        </Typography>
        <Link
          component={NavLink}
          className={classes.seeAll}
          variant="subtitle2"
          color="primary"
          underline="none"
          to="/explore/people/suggested"
        >
          See All
        </Link>
      </div>

      <Swiper {...params}>
        {users.map(({ avatar, userName, _id }, index) => (
          <div className={classes.slide} key={index}>
            <Avatar
              alt="avatar"
              src={avatar}
              className={classes.large}
              component={NavLink}
              to={`/users/${userName}`}
            />
            <Link
              component={NavLink}
              to={`/users/${userName}`}
              variant="h6"
              underline="none"
              color="inherit"
            >
              {userName}
            </Link>
            <Typography className={classes.subtitle} variant="body2">
              Popular
            </Typography>
            {currentUser.following.includes(_id) ? (
              <Button
                variant="outlined"
                className={classes.btn}
                onClick={() => handleUnfollow(_id)}
              >
                Following
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={() => handleFollow(_id)}
              >
                Follow
              </Button>
            )}
          </div>
        ))}
      </Swiper>
    </div>
  );
}
