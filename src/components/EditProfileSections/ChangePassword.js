import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";

import { changePassword } from "../../slices/authSlice";

import * as Yup from "yup";
import { useFormik } from "formik";

const initialValues = {
  oldPassword: "",
  newPassword: "",
  newPassword2: "",
};

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, "Password must be at least 6")
    .max(30, "Password too long")
    .required("Password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6")
    .max(30, "Password too long")
    .required("Password is required"),
  newPassword2: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword")], "Password not match"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "74%",
  },
  margin: {
    margin: theme.spacing(2, 0),
    marginTop: theme.spacing(5.25),
    display: "flex",
    alignItems: "center",
  },
  section: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(1, 0),
  },
  hiddenSection: {
    display: "none",
  },
  leftPart: {
    width: "30%",
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "16px",
  },
  rightPart: {
    width: "50%",
    marginLeft: theme.spacing(3),
  },
  showPassWordIcon: {
    position: "relative",
    left: "10px",
    padding: 6,
    // [theme.breakpoints.up("md")]: {
    // 	left: "10px",
    // },
  },
  submit: {
    margin: theme.spacing(2, 0),
    textTransform: "none",
  },
}));

const helperTextStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "100%",
  },
}));

export default function ChangePassword() {
  const dispatch = useDispatch();
  const helperTextClasses = helperTextStyles();
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const classes = useStyles();
  const { userName, avatar } = useSelector((state) => state.auth.user);

  const {
    values,
    errors,
    touched,
    isValid,
    dirty,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setErrors, resetForm }) => {
      dispatch(changePassword(values, toast, { setErrors, resetForm }));
    },
  });

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <div className={classes.root}>
      <div className={classes.margin}>
        <div className={classes.leftPart}>
          <Avatar alt="avatar" src={avatar} />
        </div>
        <div className={classes.rightPart}>
          <Typography variant="h6">{userName}</Typography>
        </div>
      </div>
      <form onSubmit={handleSubmit} >
        <div className={classes.section}>
          <Typography variant="h6" className={classes.leftPart}>
            Old Password
          </Typography>
          <div className={classes.rightPart}>
            <TextField
              error={touched.oldPassword && !!errors.oldPassword}
              variant="outlined"
              size="small"
              autoComplete="off"
              name="oldPassword"
              required
              fullWidth
              id="oldPassword"
              // autoFocus
              type={showOldPassword ? "text" : "password"}
              onBlur={handleBlur}
              margin="normal"
              onChange={handleChange}
              value={values.oldPassword}
              helperText={touched.oldPassword ? errors.oldPassword : null}
              FormHelperTextProps={{ classes: helperTextClasses }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className={classes.showPassWordIcon}
                      onClick={handleClickShowOldPassword}
                    >
                      {showOldPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>

        <div className={classes.section}>
          <Typography variant="h6" className={classes.leftPart}>
            New Password
          </Typography>
          <div className={classes.rightPart}>
            <TextField
              error={touched.newPassword && !!errors.newPassword}
              variant="outlined"
              size="small"
              required
              fullWidth
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              margin="normal"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.newPassword}
              helperText={touched.newPassword ? errors.newPassword : null}
              FormHelperTextProps={{ classes: helperTextClasses }}
            />
          </div>
        </div>

        <div className={classes.section}>
          <Typography variant="h6" className={classes.leftPart}>
            Confirm New Password
          </Typography>
          <div className={classes.rightPart}>
            <TextField
              error={touched.newPassword2 && !!errors.newPassword2}
              variant="outlined"
              size="small"
              required
              fullWidth
              name="newPassword2"
              id="newPassword2"
              type={showNewPassword ? "text" : "password"}
              margin="normal"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.newPassword2}
              helperText={touched.newPassword2 ? errors.newPassword2 : null}
              FormHelperTextProps={{ classes: helperTextClasses }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className={classes.showPassWordIcon}
                      onClick={handleClickShowNewPassword}
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>

        <div className={classes.section}>
          <div className={classes.leftPart} />
          <div className={classes.rightPart}>
            <Button
              disabled={!(isValid && dirty)}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Change Password
            </Button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
