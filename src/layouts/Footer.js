import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#1d1d1d",
    borderTop: "solid white",
    position: "absolute",
    width: "100%",
    height: "10vh",
    textAlign: "center",
    padding: "5vh 0 1vh 0",
    bottom: 0,
    right: 0,
    left: 0,
    marginTop: "2%",
    color: "white",
  },
}));

export default function Footer() {
  const style = useStyles();
  return (
    <footer className={style.footer}>
      <Typography variant="body2" align="center">
        {"Copyright © "}GaMo Entertaiment {new Date().getFullYear()}
      </Typography>
      <Typography variant="body2" align="center">
        By using this site you agree to and accept our User Agreement, which can
        be read here.
      </Typography>
    </footer>
  );
}
