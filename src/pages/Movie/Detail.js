import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingBottom: theme.spacing(10),
  },
  cardMedia: {
    paddingTop: "100%",
  },
  cardContent: {
    flexGrow: 1,
  },
  cardDetail: {
    flexGrow: 1,
    fontWeight: "bold",
  },
}));

export default function DetailMovie(props) {
  const id = props.match.params.id;
  const styles = useStyles();

  const [movie, setMovie] = useState([]);
  useEffect(() => {
    if (movie.length === 0) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/data-movie/${id}`)
        .then((res) => setMovie(res.data))
        .catch((e) => console.log(e));
    }
  });

  return (
    <Container className={styles.cardGrid} maxWidth="sm">
      <Grid container spacing={4}>
        <Grid item key={movie.id} xs={12}>
          <Card>
            <CardMedia
              className={styles.cardMedia}
              image={movie.image_url}
              title={movie.title}
              children="."
            />
            <CardContent className={styles.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {movie.title} ({movie.year})
              </Typography>
              <Typography style={{ textAlign: "justify" }}>
                {movie.description}
              </Typography>
            </CardContent>
            <CardContent className={styles.cardContent}>
              <Typography className={styles.cardDetail}>
                Genre: {movie.genre}
              </Typography>
              <Typography className={styles.cardDetail}>
                Release: {movie.year}
              </Typography>
              <Typography className={styles.cardDetail}>
                Rating: {movie.rating}
              </Typography>
              <Typography className={styles.cardDetail}>
                Duration: {movie.duration} minutes
              </Typography>
              <Typography className={styles.cardDetail}>
                Review: {movie.review}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
