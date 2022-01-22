import React, { useEffect } from "react";

import SideSuggestions from "./SideSuggestions";
import NoFeedSuggestions from "./NoFeedSuggestions";
import Post from "../PostSections/Post";
import BottomSuggestions from "./BottomSuggestions";
import MobileBottomSuggestions from "./MobileBottomSuggestions";
import Upload from "./Upload";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useDispatch, useSelector } from "react-redux";

import { getFeed } from "../../slices/postSlice";
import { getUsers } from "../../slices/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  upload: {
    // height: "320px",
    position: "relative",
    borderRadius: 4,
    width: "100%",
    border: "1px solid #dbdbdb",
    margin: theme.spacing(4, 0),
    padding: theme.spacing(2),
    boxSizing: "border-box",
  },
}));

export default function Home() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [fetching, setFetching] = React.useState(true);

  const posts = useSelector((state) => state.post.feedPost);

  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(750));

  useEffect(() => {
    dispatch(getFeed(setLoading));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers(setUsers, setFetching));
  }, [dispatch]);

  if (loading || fetching)
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );

  return (
    <Container maxWidth="md">
      {posts.length > 0 ? (
        <Grid container justify="space-between" spacing={4}>
          <Grid item xs={matches ? 12 : 8}>
            <div className={classes.upload}>
              <Upload />
            </div>

            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}

            {
              users.length >= 3 ?
                !matches ? <BottomSuggestions users={users.slice(0, 12)} />
                  : <MobileBottomSuggestions users={users.slice(0, 12)} />
                : null
            }
          </Grid>

          {!matches && (
            <Grid item xs={4}>
              <SideSuggestions users={users.slice(0, 5)} />
            </Grid>
          )}
        </Grid>
      ) : (
        <NoFeedSuggestions />
      )}
    </Container>
  );
}
