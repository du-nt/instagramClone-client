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

import { logout } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

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

export default function MenuModal({ open, handleMenuModalClose }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClose = () => {
    handleMenuModalClose();
  };

  const handleGoToChangePassword = () => {
    handleMenuModalClose();
    history.push("/accounts/password/change");
  };

  const handleApps = () => {
    handleMenuModalClose();
    history.push("/accounts/apps");
  };

  const handleLogOut = () => {
    dispatch(logout(history, handleMenuModalClose));
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
        <DialogContent className={classes.content}>
          <Paper className={classes.root}>
            <MenuList className={classes.menuList}>
              <MenuItem
                className={classes.menuItem}
                onClick={handleGoToChangePassword}
              >
                <Typography variant="inherit">Change Password</Typography>
              </MenuItem>
              <Divider />
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <Typography variant="inherit">Nametag</Typography>
              </MenuItem>
              <Divider />
              <MenuItem className={classes.menuItem} onClick={handleApps}>
                <Typography variant="inherit">Apps and Websites</Typography>
              </MenuItem>
              <Divider />
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <Typography variant="inherit">Notifications</Typography>
              </MenuItem>
              <Divider />
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <Typography variant="inherit">Privacy and Security</Typography>
              </MenuItem>
              <Divider />
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <Typography variant="inherit">Login Activity</Typography>
              </MenuItem>
              <Divider />
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <Typography variant="inherit">Emails from Instagram</Typography>
              </MenuItem>
              <Divider />
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <Typography variant="inherit">Report a Problem</Typography>
              </MenuItem>
              <Divider />
              <MenuItem className={classes.menuItem} onClick={handleLogOut}>
                <Typography variant="inherit">Log Out</Typography>
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
