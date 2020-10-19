import React, { useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CreateIcon from "@material-ui/icons/Create";
import MoreIcon from "@material-ui/icons/MoreVert";
import HomeIcon from "@material-ui/icons/Home";
import SendIcon from "@material-ui/icons/Send";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import ExploreIcon from "@material-ui/icons/Explore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Container } from "@material-ui/core";

import SearchResults from "./SearchResults";

import { logout } from "../slices/authSlice";
import { search } from "../slices/userSlice";

const logoUrl =
  "url(https://logos-download.com/wp-content/uploads/2016/03/Instagram_logo.png)";

const useStyles = makeStyles((theme) => ({
  appbar: {
    color: "#3f51b5",
    backgroundColor: "white",
  },
  logo: {
    width: 118,
    height: 40,
    backgroundImage: logoUrl,
    backgroundRepeat: "no-repeat",
    backgroundSize: "101%",
    backgroundPosition: "0px 6px",
  },
  search: {
    width: "50%",
    margin: theme.spacing(0, "auto"),
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#3f51b5", 0.15),
    "&:hover": {
      backgroundColor: fade("#3f51b5", 0.25),
    },
    [theme.breakpoints.down("md")]: {
      width: "35%",
    },
    [theme.breakpoints.down("750")]: {
      width: "45%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    marginRight: 10,
    position: "absolute",
    right: 0,
    top: 0,
    cursor: "pointer",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 3, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  menuIcon: {
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("750")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  authsButtons: {
    display: "none",
    [theme.breakpoints.up("750")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("750")]: {
      display: "none",
    },
  },
  av: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  list: {
    padding: 0,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const active1 = location.pathname === "/" ? true : false;
  const active2 = location.pathname === "/inbox" ? true : false;
  const active3 = location.pathname === "/explore" ? true : false;
  const active4 = location.pathname === "/activity" ? true : false;

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [searchText, setSearchText] = useState("");
  const [deleteIcon, setDeleteIcon] = useState(false);
  const typingTimeout = useRef(null);
  const wrapperRef = useRef(null);
  const [display, setDisplay] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setDisplay(false);
      setDeleteIcon(false);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (value) {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
      typingTimeout.current = setTimeout(() => {
        dispatch(search(value, setDisplay, setUsers));
      }, 500);
    } else {
      clearTimeout(typingTimeout.current);
      setDisplay(false);
    }
  };

  const handleDelete = () => {
    setSearchText("");
    setDisplay(false);
    setDeleteIcon(false);
  };

  const handleFocus = () => {
    setDeleteIcon(true);
    if (searchText.trim()) {
      setDisplay(true);
    }
  };

  const handleLogOut = () => {
    dispatch(logout(history, handleMenuClose));
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      classes={{ list: classes.list }}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuClose}
        component={NavLink}
        to={`/users/${user?.userName}`}
      >
        <AccountCircleOutlinedIcon
          color="primary"
          className={classes.menuIcon}
        />
        Profile
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        component={NavLink}
        to={`/users/${user?.userName}/saved`}
      >
        <BookmarkBorderOutlinedIcon
          color="primary"
          className={classes.menuIcon}
        />
        Saved
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        component={NavLink}
        to="/accounts/edit"
      >
        <SettingsOutlinedIcon color="primary" className={classes.menuIcon} />
        Settings
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogOut}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      classes={{ list: classes.list }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose} component={NavLink} to="/">
        <IconButton color="primary">
          {active1 ? <HomeIcon /> : <HomeOutlinedIcon />}
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose} component={NavLink} to="/inbox">
        <IconButton color="primary">
          {active2 ? <SendIcon /> : <SendOutlinedIcon />}
        </IconButton>
        <p>Inbox</p>
      </MenuItem>
      <MenuItem
        onClick={handleMobileMenuClose}
        component={NavLink}
        to="/explore"
      >
        <IconButton color="primary">
          {active3 ? <ExploreIcon /> : <ExploreOutlinedIcon />}
        </IconButton>
        <p>Explore</p>
      </MenuItem>
      <MenuItem
        onClick={handleMobileMenuClose}
        component={NavLink}
        to="/activity"
      >
        <IconButton color="primary">
          {active4 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <p>Activity</p>
      </MenuItem>
      <MenuItem onClick={handleMenuOpen}>
        <IconButton>
          <Avatar className={classes.av} alt="avatar" src={user?.avatar} />
        </IconButton>
        <p>My account</p>
      </MenuItem>
    </Menu>
  );

  const mobileGestMenu = (
    <Menu
      classes={{ list: classes.list }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="gestMunu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={handleMobileMenuClose}
        component={NavLink}
        to={{ pathname: "/login", state: { from: location.pathname } }}
      >
        <IconButton color="primary">
          <ExitToAppIcon />
        </IconButton>
        <p>Login</p>
      </MenuItem>
      <MenuItem
        onClick={handleMobileMenuClose}
        component={NavLink}
        to={{ pathname: "/register", state: { from: location.pathname } }}
      >
        <IconButton color="primary">
          <CreateIcon />
        </IconButton>
        <p>Register</p>
      </MenuItem>
    </Menu>
  );

  const AuthButtons = (
    <div className={classes.authsButtons}>
      <Button
        component={NavLink}
        to={{ pathname: "/login", state: { from: location.pathname } }}
        color="primary"
        variant="contained"
        className={classes.button}
      >
        Login
      </Button>
      <Button
        component={NavLink}
        to={{ pathname: "/register", state: { from: location.pathname } }}
        color="primary"
        className={classes.button}
      >
        Register
      </Button>
    </div>
  );

  const sectionDesktop = (
    <div className={classes.sectionDesktop}>
      <IconButton color="inherit" component={NavLink} to="/">
        {active1 ? <HomeIcon /> : <HomeOutlinedIcon />}
      </IconButton>
      <IconButton color="inherit" component={NavLink} to="/inbox">
        {active2 ? <SendIcon /> : <SendOutlinedIcon />}
      </IconButton>
      <IconButton color="inherit" component={NavLink} to="/explore">
        {active3 ? <ExploreIcon /> : <ExploreOutlinedIcon />}
      </IconButton>
      <IconButton color="inherit" component={NavLink} to="/activity">
        {active4 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <IconButton onClick={handleMenuOpen}>
        <Avatar className={classes.av} alt="avatar" src={user?.avatar} />
      </IconButton>
    </div>
  );

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        variant="outlined"
        className={classes.appbar}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <Link to="/" component={NavLink}>
              <div className={classes.logo}></div>
            </Link>

            <div className={classes.search} ref={wrapperRef}>
              <SearchIcon className={classes.searchIcon} />
              <InputBase
                placeholder="Search…"
                autoComplete="off"
                id="search"
                name="search"
                onChange={handleSearch}
                onFocus={handleFocus}
                value={searchText}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
              {deleteIcon && (
                <HighlightOffIcon
                  className={classes.deleteIcon}
                  onClick={handleDelete}
                />
              )}
              {display && (
                <SearchResults users={users} handleDelete={handleDelete} />
              )}
            </div>
            {isAuthenticated ? sectionDesktop : AuthButtons}

            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {isAuthenticated ? renderMobileMenu : mobileGestMenu}
      {renderMenu}
    </>
  );
}
