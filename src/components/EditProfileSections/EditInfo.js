import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";

import { editUser, changePhoto } from "../../slices/authSlice";

import MenuModal from "./MenuModal";

import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const websiteRegex = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
const validationSchema = Yup.object().shape({
  displayName: Yup.string()
    .required("Name is required")
    .min(8, "Name must have min 8 characters")
    .max(15, "Name must have max 15 characters"),
  userName: Yup.string()
    .required("Username is required")
    .min(8, "Username must have min 8 characters")
    .max(30, "Username must have max 30 characters"),
  website: Yup.string().matches(websiteRegex, "Incorrect website"),
  bio: Yup.string(),
  email: Yup.string().email("Email is not valid").required("Email is required"),
  phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  gender: Yup.string(),
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "74%",
  },
  cursor: {
    cursor: "pointer",
  },
  margin: {
    margin: theme.spacing(2, 0),
    marginTop: theme.spacing(4),
    display: "flex",
    alignItems: "center",
  },
  section: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(2, 0),
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
  btn: {
    textTransform: "none",
  },
}));

const helperTextStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "100%",
    marginTop: 0,
  },
}));

export default function EditInfo() {
  const [open, setOpen] = React.useState(false);
  const {
    userName,
    avatar,
    displayName,
    email,
    website,
    bio,
    phoneNumber,
    gender,
  } = useSelector((state) => state.auth.user);
  const classes = useStyles();
  const helperTextClasses = helperTextStyles();
  const dispatch = useDispatch();
  const inputFile = React.useRef(null);

  const initialValues = {
    displayName,
    userName,
    website: website || "",
    bio: bio || "",
    email,
    phoneNumber: phoneNumber || "",
    gender: gender || "",
  };

  const {
    isSubmitting,
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
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values, { setErrors, resetForm }) => {
      dispatch(editUser(values, toast, { setErrors, resetForm }));
    },
  });

  const handleOpen = () => {
    if (
      avatar ===
      "https://res.cloudinary.com/douy56nkf/image/upload/v1594060920/defaults/txxeacnh3vanuhsemfc8.png"
    ) {
      inputFile.current.click();
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageUpload = ({ target }) => {
    if (target.files[0]) {
      const data = new FormData();
      data.append("file", target.files[0]);
      dispatch(changePhoto(data, toast));
    }
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.margin}>
          <div className={classes.leftPart}>
            <Avatar
              alt="avatar"
              src={avatar}
              className={classes.cursor}
              onClick={handleOpen}
            />
            <input
              type="file"
              accept="image/*"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </div>
          <div className={classes.rightPart}>
            <Typography variant="h6">{userName}</Typography>
            <Typography
              color="primary"
              variant="subtitle1"
              onClick={handleOpen}
              className={classes.cursor}
            >
              Change Profile Photo
            </Typography>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.leftPart}>
              Name
            </Typography>
            <div className={classes.rightPart}>
              <TextField
                fullWidth
                id="1"
                variant="outlined"
                size="small"
                name="displayName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.displayName}
                error={touched.displayName && !!errors.displayName}
                helperText={touched.displayName ? errors.displayName : null}
                FormHelperTextProps={{ classes: helperTextClasses }}
              />
            </div>
          </div>
          <div className={classes.section}>
            <div className={classes.leftPart} />
            <Typography variant="caption" className={classes.rightPart}>
              Help people discover your account by using the name you're known
              by: either your full name, nickname, or business name.
            </Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.leftPart}>
              Username
            </Typography>
            <div className={classes.rightPart}>
              <TextField
                fullWidth
                id="2"
                variant="outlined"
                size="small"
                name="userName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userName}
                error={touched.userName && !!errors.userName}
                helperText={touched.userName ? errors.userName : null}
                FormHelperTextProps={{ classes: helperTextClasses }}
              />
            </div>
          </div>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.leftPart}>
              Website
            </Typography>
            <div className={classes.rightPart}>
              <TextField
                fullWidth
                id="3"
                variant="outlined"
                placeholder="Website"
                size="small"
                name="website"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.website}
                error={touched.website && !!errors.website}
                helperText={touched.website ? errors.website : null}
                FormHelperTextProps={{ classes: helperTextClasses }}
              />
            </div>
          </div>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.leftPart}>
              Bio
            </Typography>
            <div className={classes.rightPart}>
              <TextField
                fullWidth
                id="4"
                variant="outlined"
                multiline
                rowsMax={3}
                rows={3}
                size="small"
                name="bio"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bio}
                error={touched.bio && !!errors.bio}
                helperText={touched.bio ? errors.bio : null}
                FormHelperTextProps={{ classes: helperTextClasses }}
              />
            </div>
          </div>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.leftPart}>
              Email
            </Typography>
            <div className={classes.rightPart}>
              <TextField
                fullWidth
                id="5"
                variant="outlined"
                size="small"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && !!errors.email}
                helperText={touched.email ? errors.email : null}
                FormHelperTextProps={{ classes: helperTextClasses }}
              />
            </div>
          </div>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.leftPart}>
              Phone Number
            </Typography>
            <div className={classes.rightPart}>
              <TextField
                fullWidth
                id="6"
                variant="outlined"
                placeholder="Phone Number"
                size="small"
                name="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                error={touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber ? errors.phoneNumber : null}
                FormHelperTextProps={{ classes: helperTextClasses }}
              />
            </div>
          </div>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.leftPart}>
              Gender
            </Typography>
            <div className={classes.rightPart}>
              <TextField
                fullWidth
                id="7"
                variant="outlined"
                size="small"
                select
                name="gender"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.gender}
                error={touched.gender && !!errors.gender}
                helperText={touched.gender ? errors.gender : null}
                FormHelperTextProps={{ classes: helperTextClasses }}
              >
                <MenuItem value="1">Male</MenuItem>
                <MenuItem value="2">Female</MenuItem>
                <MenuItem value="">Prefer Not To Say</MenuItem>
              </TextField>
            </div>
          </div>
          <div className={classes.section}>
            <div className={classes.leftPart} />
            <div className={classes.rightPart}>
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                disabled={!isValid || !dirty || isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
      {open && <MenuModal open={open} handleModalClose={handleClose} />}
    </>
  );
}
