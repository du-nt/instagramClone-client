import React from "react";

import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import { addComment } from "../../slices/postSlice";

const useStyles = makeStyles((theme) => ({
  form: {
    borderTop: "1px solid #dbdbdb",
    display: "flex",
    height: 62,
    boxSizing: "border-box",
  },
}));

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .required("Text is required")
    .max(50, "Text must have max 50 characters"),
});

const CommentCssTextField = withStyles({
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    boxSizing: "border-box",
    flex: 1,
    padding: "5px 5px 5px 25px",
    border: "none",
    "& .MuiInput-underline:before": {
      content: "none",
    },
    "& .MuiInput-underline:after": {
      content: "none",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
    },
  },
})(TextField);

export default function AddComment({ _id }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const initialValues = {
    text: "",
  };

  const {
    isSubmitting,
    values,
    dirty,
    isValid,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addComment(_id, values, resetForm));
    },
  });

  const handleAddComment = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <CommentCssTextField
        id={_id}
        name="text"
        value={values.text}
        onChange={handleChange}
        onKeyDown={handleAddComment}
        multiline
        rowsMax={3}
        placeholder="Add a comment..."
      />
      <Button
        type="submit"
        color="primary"
        disabled={!isValid || !dirty || isSubmitting}
      >
        Post
      </Button>
    </form>
  );
}
