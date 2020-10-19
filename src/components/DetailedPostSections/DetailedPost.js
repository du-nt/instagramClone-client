import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import Details from "./Details";
import MoreImages from "./MoreImages";
import LoginModal from "./LoginModal";
import Dead from "./Dead";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getPost } from "../../slices/postSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(0, 10),
  },
  divider: {
    margin: theme.spacing(7, 0),
  },
}));

export default function DetailedPost() {
  const classes = useStyles();
  const { postId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isDead, setIsDead] = useState(false);

  useEffect(() => {
    //   window.scrollTo(0, 0);
    dispatch(getPost(postId, setLoading, setIsDead));
  }, [postId, dispatch]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (isDead) return <Dead />;

  return (
    !loading && (
      <>
        <Container maxWidth="md" className={classes.root}>
          <Details handleModalOpen={handleOpen} />
          <MoreImages />
        </Container>
        {isOpen && <LoginModal open={isOpen} handleModalClose={handleClose} />}
      </>
    )
  );
}
