import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";

import Image from "../../login.png";

const useStyles = makeStyles((theme) => ({
  content: {
    borderRadius: 26,
  },
}));

export default function LoginModal({ open, closeModal }) {
  const classes = useStyles();

  const handleClose = () => {
    closeModal();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog">
        <img src={Image} alt="login-modal" className={classes.content} />
      </Dialog>
    </div>
  );
}
