import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import TelegramIcon from "@material-ui/icons/Telegram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkIcon from "@material-ui/icons/Link";
import EmailIcon from "@material-ui/icons/Email";
import ForumIcon from "@material-ui/icons/Forum";

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
    padding: 0,
  },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
  root: {
    width: 430,
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

export default function ShareDialog({ open, handleShareModalClose }) {
  const classes = useStyles();

  const handleClose = () => {
    handleShareModalClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Share
        </DialogTitle>

        <DialogContent dividers>
          <Paper className={classes.root}>
            <MenuList>
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <TelegramIcon className={classes.icon} />
                <Typography variant="inherit">Share to Direct</Typography>
              </MenuItem>
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <FacebookIcon className={classes.icon} />
                <Typography variant="inherit">Share to Facebook</Typography>
              </MenuItem>
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <ForumIcon className={classes.icon} />
                <Typography variant="inherit">Share to Messenger</Typography>
              </MenuItem>{" "}
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <TwitterIcon className={classes.icon} />
                <Typography variant="inherit">Share to Twitter</Typography>
              </MenuItem>{" "}
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <EmailIcon className={classes.icon} />
                <Typography variant="inherit">Share via Email</Typography>
              </MenuItem>
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <LinkIcon className={classes.icon} />
                <Typography variant="inherit">Copy Link</Typography>
              </MenuItem>
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <div className={classes.cancel} />
                <Typography variant="inherit">Cancel</Typography>
              </MenuItem>
            </MenuList>
          </Paper>
        </DialogContent>
      </Dialog>
    </div>
  );
}
