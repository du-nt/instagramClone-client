import React from "react";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { unFollow } from "../../slices/authSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
  },
  menuItem: {
    padding: theme.spacing(1.5, 3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: theme.spacing(2),
    color: "#3f51b5",
  },
  cancel: {
    width: 24,
    marginRight: theme.spacing(2),
  },
  content: {
    padding: "0 !important",
  },
  menuList: {
    padding: 0,
  },
}));

export default function MenuModal({ author, id, open, handleMenuModalClose }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleClose = () => {
    handleMenuModalClose();
  };

  const handleGoToPost = () => {
    handleMenuModalClose();
    history.push(`/p/${id}`);
  };

  const handleUnfollow = () => {
    handleMenuModalClose();
    dispatch(unFollow(author._id));
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
        <DialogContent className={classes.content}>
          <Paper className={classes.root}>
            <MenuList className={classes.menuList}>
              {author._id !== user._id && (
                <MenuItem className={classes.menuItem} onClick={handleClose}>
                  <Typography variant="inherit" color="secondary">
                    Report
                  </Typography>
                </MenuItem>
              )}
              {author._id !== user._id && <Divider />}
              {author._id !== user._id && user.following.includes(author._id) && (
                <MenuItem className={classes.menuItem} onClick={handleUnfollow}>
                  <Typography variant="inherit" color="secondary">
                    Unfollow
                  </Typography>
                </MenuItem>
              )}
              {author._id !== user._id &&
                user.following.includes(author._id) && <Divider />}
              <MenuItem className={classes.menuItem} onClick={handleGoToPost}>
                <Typography variant="inherit">Go to post</Typography>
              </MenuItem>
              <Divider />
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <Typography variant="inherit">Share</Typography>
              </MenuItem>
              <Divider />
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <Typography variant="inherit">Copy Link</Typography>
              </MenuItem>
              <Divider />
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <Typography variant="inherit">Embed</Typography>
              </MenuItem>
              <Divider />
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <Typography variant="inherit">Cancel</Typography>
              </MenuItem>
            </MenuList>
          </Paper>
        </DialogContent>
      </Dialog>
    </div>
  );
}
