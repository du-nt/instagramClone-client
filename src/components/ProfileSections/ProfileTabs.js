import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppsIcon from "@material-ui/icons/Apps";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import { useSelector } from "react-redux";

import {
  NavLink,
  useRouteMatch,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import GridList from "./GridList";
import SavedPosts from "./SavedPosts";
import TaggedPosts from "./TaggedPosts";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fafafa",
  },
  hidden: {
    display: "none",
  },
}));

export default function ProfileTabs({ isMe, handleShowModal }) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { path, url } = useRouteMatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const showModal = (e) => {
    e.preventDefault();
    handleShowModal();
  };

  return (
    <div className={classes.root}>
      <Tabs centered value={pathname}>
        <Tab
          value={url}
          label="Posts"
          icon={<AppsIcon />}
          component={NavLink}
          to={`${url}`}
        />

        <Tab
          value={`${url}/tagged`}
          label="Tagged"
          icon={<LocalOfferOutlinedIcon />}
          component={NavLink}
          to={`${url}/tagged`}
          onClick={!isAuthenticated ? showModal : null}
        />
        {isMe ? (
          <Tab
            value={`${url}/saved`}
            label="Saved"
            icon={<BookmarkBorderIcon />}
            component={NavLink}
            to={`${url}/saved`}
          />
        ) : (
          <Tab
            disabled
            value={`${url}/saved`}
            classes={{ root: classes.hidden }}
          />
        )}
      </Tabs>

      <Switch>
        <Route path={path} exact>
          <GridList handleShowModal={handleShowModal} />
        </Route>
        <Route path={`${path}/tagged`}>
          <TaggedPosts />
        </Route>
        {isMe && (
          <Route path={`${path}/saved`}>
            <SavedPosts />
          </Route>
        )}
      </Switch>
    </div>
  );
}
