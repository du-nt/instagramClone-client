import React, { useState } from "react";

import { DropzoneArea } from "material-ui-dropzone";

import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { addPost } from "../../slices/postSlice";

import * as Yup from "yup";
import { useFormik } from "formik";

const initialValues = {
  title: "",
};

const FILE_SIZE = 3000000;
const SUPPORTED_FORMATS = ["image/*"];

const validationSchema = Yup.object().shape({
  title: Yup.string().max(50, "Caption must have max 50 characters"),
});

const CssTextField = withStyles({
  root: {
    borderRadius: 4,
    backgroundColor: "#f0f2f5",
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

const useStyles = makeStyles((theme) => ({
  item: {
    flexBasis: "auto",
  },
  form: {
    display: "flex",
    marginTop: 10,
  },
  btn: {
    marginLeft: 10,
  },
}));

const helperTextStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "100%",
    marginTop: 0,
  },
}));

export default function DropzoneAreaExample() {
  const dispatch = useDispatch();
  const fileInput = React.useRef();
  const [files, setFiles] = useState([]);
  const classes = useStyles();
  const helperTextClasses = helperTextStyles();

  const handleChangeFile = (images) => {
    setFiles(images);
  };

  const {
    isSubmitting,
    values,
    touched,
    errors,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const deleteFn = fileInput.current.deleteFile;
      const formData = new FormData();

      const onResetFile = async () => {
        for (let i = 0; i <= files.length; i++) {
          await deleteFn(files, 0);
        }
        setFiles([]);
      };

      files.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("title", values.title);
      dispatch(addPost(formData, { resetForm, onResetFile }));
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <DropzoneArea
        ref={fileInput}
        acceptedFiles={SUPPORTED_FORMATS}
        filesLimit={5}
        dropzoneText="Drag and drop a image here or click"
        previewGridClasses={{ item: classes.item }}
        previewGridProps={{ container: { spacing: 3 } }}
        onChange={handleChangeFile}
        maxFileSize={FILE_SIZE}
      />
      <div className={classes.form}>
        <CssTextField
          id="title"
          name="title"
          value={values.title}
          placeholder="Type something"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title && !!errors.title}
          helperText={touched.title ? errors.title : null}
          FormHelperTextProps={{ classes: helperTextClasses }}
        />
        <Button
          className={classes.btn}
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid || !files.length || isSubmitting}
        >
          Post
        </Button>
      </div>
    </form>
  );
}
