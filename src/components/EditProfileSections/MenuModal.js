import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

import { toast } from "react-toastify";

import { changePhoto, removePhoto } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(3, 0),
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" align="center">
        {children}
      </Typography>
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
  menuList: {
    padding: 0,
  },
}));

export default function Modal({ open, handleModalClose }) {
  const classes = useStyles();
  const inputFile = React.useRef(null);
  const dispatch = useDispatch();

  const handleClose = () => {
    handleModalClose();
  };

  const handleUpload = () => {
    inputFile.current.click();
  };

  const handleImageUpload = ({ target }) => {
    if (target.files[0]) {
      const data = new FormData();
      data.append("file", target.files[0]);
      handleModalClose();
      dispatch(changePhoto(data, toast));
    }
  };

  const handleRemovePhoto = () => {
    handleModalClose();
    dispatch(removePhoto(toast));
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle id="customized-dialog-title">
          Change Profile Photo
        </DialogTitle>

        <DialogContent dividers>
          <Paper className={classes.root}>
            <MenuList className={classes.menuList}>
              <MenuItem className={classes.menuItem} onClick={handleUpload}>
                <Typography variant="inherit" color="primary">
                  Upload Photo
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                className={classes.menuItem}
                onClick={handleRemovePhoto}
              >
                <Typography variant="inherit" color="secondary">
                  Remove Current Photo
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem className={classes.menuItem} onClick={handleClose}>
                <Typography variant="inherit">Cancel</Typography>
              </MenuItem>
            </MenuList>
          </Paper>
        </DialogContent>
      </Dialog>
      <input
        type="file"
        accept="image/*"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );
}
