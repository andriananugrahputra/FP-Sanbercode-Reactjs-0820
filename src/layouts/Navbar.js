// INCLUDE header, sidebar
import React, { useState, useContext } from "react";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  makeStyles,
  useTheme,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  ChevronLeft,
  ChevronRight,
  AccountCircle,
  Games,
  Theaters,
} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../assets/img/logo.png";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../config";

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    background: "#1d1d1d",
    borderBottom: "solid #ffffff",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const MyMenu = (props) => {
  return (
    <NavLink
      className="MuiButtonBase-root MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button"
      exact
      to={props.href}
      style={{ padding: 10 }}
    >
      {props.text}
    </NavLink>
  );
};

export default function Navbar() {
  const styles = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSide, setOpenSide] = useState(false);
  const openTop = Boolean(anchorEl);
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();

  const handleDrawer = () => {
    setOpenSide(!openSide);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await setUser(null);
    setAnchorEl(null);
    localStorage.setItem("user", JSON.stringify(null));

    history.push("/");
  };

  const handleChangePassword = () => {
    setAnchorEl(null);
    history.push("/change-password");
  };

  const listGames = () => {
    history.push("/games/list");
  };

  const listMovies = () => {
    history.push("/movies/list");
  };

  return (
    <div className={styles.root}>
      <AppBar
        position="fixed"
        className={clsx(styles.appBar, {
          [styles.appBarShift]: openSide,
        })}
      >
        <Toolbar>
          {user && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
              className={clsx(styles.menuButton, openSide && styles.hide)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <img src={logo} height="60" alt="" />
          <div style={{ flexGrow: 1 }} />
          {user ? (
            <div>
              <MyMenu href="/movies" text="Movies" />
              <MyMenu href="/games" text="Games" />
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openTop}
                onClose={handleClose}
              >
                <MenuItem>{user.name}</MenuItem>
                <MenuItem onClick={handleChangePassword}>
                  Change Password
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <MyMenu href="/movies" text="Movies" />
              <MyMenu href="/games" text="Games" />
              <MyMenu href="/register" text="Register" />
              <MyMenu href="/login" text="Login" />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={styles.drawer}
        variant="persistent"
        anchor="left"
        open={openSide}
        styles={{
          paper: styles.drawerPaper,
        }}
      >
        <div className={styles.drawerHeader}>
          <IconButton onClick={handleDrawer}>
            {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key={0} onClick={listMovies}>
            <ListItemIcon>
              <Theaters />
            </ListItemIcon>
            <ListItemText primary={"Data Movies"} />
          </ListItem>
          <ListItem button key={1} onClick={listGames}>
            <ListItemIcon>
              <Games />
            </ListItemIcon>
            <ListItemText primary={"Data Games"} />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(styles.content, {
          [styles.contentShift]: openSide,
        })}
      >
        <div className={styles.drawerHeader} />
      </main>
    </div>
  );
}
