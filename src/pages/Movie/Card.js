import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Grid,
  Typography,
  makeStyles,
  Container,
  Avatar,
} from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingBottom: theme.spacing(10),
  },
  cardMedia: {
    paddingTop: 0,
    width: "100%",
    height: "100%",
  },
  cardBox: {
    maxWidth: 500,
    maxHeight: 550,
    position: "relative",
    textAlign: "center",
  },
  cardTitle: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    margin: "auto",
    left: 0,
  },
  title: {
    textShadow: "1px 1px 0px #212121",
    color: "#ffffff",
    bottom: 0,
  },
}));

export default function CardMovie() {
  const styles = useStyles();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (movies.length === 0) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/data-movie`)
        .then((res) => setMovies(res.data))
        .catch((e) => console.log(e));
    }
  }, [movies]);

  return (
    <Container className={styles.cardGrid} maxWidth="md">
      <Grid container spacing={4} className={styles.grid}>
        {movies.map((movie) => (
          <Grid
            item
            key={movie.id}
            xl={4}
            xs={12}
            sm={6}
            md={4}
            className="card-box"
          >
            <Card className={styles.cardBox}>
              <Avatar
                variant="square"
                src={movie.image_url}
                alt="img"
                className={styles.cardMedia}
              />
              <div className="button-hide">
                <Typography gutterBottom variant="h6" component="h2">
                  {movie.genre}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  {movie.rating}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  style={{ background: "#00b248", marginTop: 10 }}
                >
                  <Link
                    to={"/movies/" + movie.id}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Show Detail
                  </Link>
                </Button>
              </div>
              <div className={styles.cardTitle}>
                <div className={styles.title}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {movie.title} ({movie.year})
                  </Typography>
                </div>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
