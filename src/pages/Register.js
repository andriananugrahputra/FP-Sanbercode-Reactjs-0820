import React, { useRef, useContext } from "react";
import {
  Avatar,
  Button,
  Container,
  makeStyles,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { UserContext } from "../config";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const styles = useStyles();

  const [, setUser] = useContext(UserContext);
  const refName = useRef();
  const refEmail = useRef();
  const refPassword = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = {
      name: refName.current.value,
      email: refEmail.current.value,
      password: refPassword.current.value,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/register`, users)
      .then((res) => {
        var user = res.data.user;
        var token = res.data.token;
        var currentUser = { name: user.name, email: user.email, token };
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ backgroundColor: "white", minHeight: 480 }}
    >
      <div className={styles.paper}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                inputRef={refName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={refEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={refPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Remember me"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to="/login" style={{ textDecoration: "none" }}>
                Already have an account? Login
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
