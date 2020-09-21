import React, { useRef, useContext } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";

import { useHistory } from "react-router-dom";
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
    // width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ChangePassword() {
  const styles = useStyles();
  const refPass_Old = useRef();
  const refPass_New = useRef();
  const refPass_Confirm = useRef();
  const history = useHistory();

  const [user] = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (refPass_New.current.value !== refPass_Confirm.current.value) {
      alert("Konfirmasi Password tidak sesuai!");
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/change-password`,
          {
            current_password: refPass_Old.current.value,
            new_password: refPass_New.current.value,
            new_confirm_password: refPass_Confirm.current.value,
          },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        .then((res) => {
          if (res.data === "Password change successfully") {
            alert("Password Berhasil Diganti!");
            history.push("/movies");
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ backgroundColor: "white" }}
    >
      <div className={styles.paper}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password Lama"
            name="pass_old"
            type="password"
            required
            inputRef={refPass_Old}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="pass_new"
            label="Password Baru"
            type="password"
            required
            inputRef={refPass_New}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="pass_new2"
            label="Konfirmasi Password"
            type="password"
            required
            inputRef={refPass_Confirm}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
          >
            Change Password
          </Button>
        </form>
      </div>
    </Container>
  );
}
