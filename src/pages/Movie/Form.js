import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, makeStyles, Container, TextField } from "@material-ui/core";
import axios from "axios";
import { UserContext } from "../../config";

const useStyles = makeStyles(() => ({
  cardContent: {
    flexGrow: 1,
    margin: 20,
  },
}));

export default function FormMovie(props) {
  const idMovie = props.match.params.id;
  const history = useHistory();
  const [user] = useContext(UserContext);
  const styles = useStyles();
  const [form, setForm] = useState({
    title: "",
    description: "",
    year: 2020,
    duration: 120,
    genre: "",
    rating: 0,
    image_url: "",
    review: "",
  });

  useEffect(() => {
    if (idMovie) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/data-movie/${idMovie}`)
        .then((res) => res.data)
        .then((e) => {
          setForm({
            title: e.title,
            description: e.description,
            year: e.year,
            duration: e.duration,
            genre: e.genre,
            rating: e.rating,
            image_url: e.image_url,
            review: e.review,
          });
        })
        .catch((e) => console.log(e));
    }
  }, [idMovie]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!idMovie) {
      //tambah
      const dataBaru = {
        title: form.title,
        description: form.description,
        year: form.year,
        duration: form.duration,
        genre: form.genre,
        rating: form.rating,
        image_url: form.image_url,
        review: form.review,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/data-movie`, dataBaru, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then(() => history.push("/movies/list"))
        .catch((err) => console.log(err));
    } else {
      //edit
      let dataBaru = {
        title: form.title,
        description: form.description,
        year: form.year,
        duration: form.duration,
        genre: form.genre,
        rating: form.rating,
        image_url: form.image_url,
        review: form.review,
      };
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/data-movie/${idMovie}`,
          dataBaru,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        .then(() => history.push("/movies/list"))
        .catch((err) => console.log(err));
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxWidth="md">
      <div className={styles.cardContent}>
        <form
          onSubmit={handleSubmit}
          style={{
            minWidth: 500,
            maxWidth: 400,
            width: "40%",
            margin: "0 auto",
            border: "1px solid #000",
          }}
        >
          <h1 style={{ textAlign: "center" }}>
            {idMovie ? "Edit Movie" : "Add Movie"}
          </h1>
          <div style={{ margin: 20 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="Title"
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              style={{ width: "60%" }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="Year"
              label="Year"
              name="year"
              value={form.year}
              style={{ width: "38%", left: 10 }}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Description"
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Genre"
              label="Genre"
              name="genre"
              value={form.genre}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="Duration"
              label="Duration"
              name="duration"
              value={form.duration}
              style={{ width: "60%" }}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="Rating"
              label="Rating"
              name="rating"
              value={form.rating}
              type="number"
              style={{ width: "38%", left: 10 }}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Image URL"
              label="Image URL"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Review"
              name="review"
              value={form.review}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#00b248", color: "white" }}
            >
              {!form.isEdit ? "Save" : "Edit"}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
