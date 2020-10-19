import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import Following from "./Following";
import NoUser from "./NoUser";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1, 0),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: 0,
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" align="center">
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
  },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    height: 312,
  },
  menuItem: {
    padding: theme.spacing(1.5, 3),
  },
  icon: {
    marginRight: theme.spacing(2),
    color: "#3f51b5",
  },
  cancel: {
    width: 24,
    marginRight: theme.spacing(2),
  },
}));

export default function FollowingDialog({
  open,
  following,
  handleFollowingDialogClose,
}) {
  const classes = useStyles();

  const handleClose = () => {
    handleFollowingDialogClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Following
        </DialogTitle>

        <DialogContent dividers className={classes.root}>
          {following.length ? (
            following.map((user) => (
              <Following
                key={user._id}
                user={user}
                handleFollowingDialogClose={handleFollowingDialogClose}
              />
            ))
          ) : (
            <NoUser
              title="People you follow"
              text="Once you follow people, you'll see them here."
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
