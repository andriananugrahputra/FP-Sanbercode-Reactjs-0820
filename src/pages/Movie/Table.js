import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, makeStyles, Container, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import axios from "axios";
import DataTable from "react-data-table-component";
import { UserContext } from "../../config";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const useStyles = makeStyles(() => ({
  cardContent: {
    flexGrow: 1,
    padding: 20,
  },
  cardUp: {
    backgroundColor: "white",
    minWidth: 400,
    maxWidth: 540,
    padding: 20,
    marginBottom: 20,
  },
  cardFilter: {
    flexGrow: 1,
    padding: 20,
    minWidth: 500,
    maxWidth: 500,
    margin: "0 auto",
  },
}));

export default function TableMovie() {
  const styles = useStyles();
  const history = useHistory();
  const [user] = useContext(UserContext);

  const refyMin = useRef();
  const refyMax = useRef();
  const refdMin = useRef();
  const refdMax = useRef();
  const refGenre = useRef();

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    if (movies.length === 0) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/data-movie`)
        .then((res) => {
          setMovies(res.data);
          setSearch(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [movies]);

  const handleEdit = (event) => {
    history.push("/movies/edit/" + event.target.offsetParent.id);
  };

  const handleDelete = (event) => {
    const id = event.target.offsetParent.id;

    confirmAlert({
      title: "Are you sure to delete this movie?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`${process.env.REACT_APP_API_URL}/data-movie/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
              })
              .then((e) => (e.data === "success" ? setMovies([]) : ""))
              .catch((e) => console.log(e));
          },
        },
      ],
    });
  };

  const handleFilter = (event) => {
    event.preventDefault();

    const emptySearch = async () => {
      return movies;
    };

    const chekYearMin = async (src) => {
      if (refyMin.current.value) {
        return src.filter((row) => row.year >= refyMin.current.value);
      } else {
        return src;
      }
    };

    const chekYearMax = async (src) => {
      if (refyMax.current.value) {
        return src.filter((row) => row.year <= refyMax.current.value);
      } else {
        return src;
      }
    };

    const chekDurMin = async (src) => {
      if (refdMin.current.value) {
        return src.filter((row) => row.duration >= refdMin.current.value);
      } else {
        return src;
      }
    };

    const chekDurMax = async (src) => {
      if (refdMax.current.value) {
        return src.filter((row) => row.duration <= refdMax.current.value);
      } else {
        return src;
      }
    };

    const chekGenre = async (src) => {
      if (refGenre.current.value) {
        return src.filter((row) => row.genre.match(refGenre.current.value));
      } else {
        return src;
      }
    };

    emptySearch().then((e) =>
      chekYearMin(e)
        .then((e) => chekYearMax(e))
        .then((e) => chekDurMin(e))
        .then((e) => chekDurMax(e))
        .then((e) => chekGenre(e))
        .then((e) => setSearch(e))
    );
  };

  const columns = [
    {
      name: "Thumbnail",
      grow: 0,
      cell: (row) => (
        <img height="84px" width="56px" alt={row.name} src={row.image_url} />
      ),
    },
    {
      name: "Title",
      selector: "title",
      sortable: true,
      center: true,
    },
    {
      name: "Year",
      selector: "year",
      sortable: true,
      center: true,
    },
    {
      name: "Duration",
      selector: "duration",
      sortable: true,
      center: true,
    },
    {
      name: "Genre",
      selector: "genre",
      sortable: true,
      center: true,
    },
    {
      name: "Rating",
      selector: "rating",
      sortable: true,
      center: true,
    },
    {
      name: "Action",
      button: true,
      cell: (el) => (
        <center>
          <Button
            variant="contained"
            id={el.id}
            onClick={(e) => handleEdit(e)}
            style={{ margin: 10 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            id={el.id}
            onClick={(e) => handleDelete(e)}
            style={{ marginBottom: 10 }}
          >
            Delete
          </Button>
        </center>
      ),
    },
  ];

  const handleSearch = (e) => {
    setSearch(
      movies.filter((row) =>
        row.title.toLowerCase().match(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <Container maxWidth="md" style={{ marginBottom: 63 }}>
        <Container maxWidth="md" className={styles.cardUp}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Search"
            fullWidth
            onChange={(e) => handleSearch(e)}
          />
          <Button
            onClick={() => history.push("/movies/create")}
            variant="contained"
            color="primary"
            style={{
              marginRight: 10,
              backgroundColor: "#00b248",
              color: "white",
            }}
          >
            Create Movie
          </Button>
          <Button
            onClick={() => setIsFilter(!isFilter)}
            style={{
              marginRight: 10,
            }}
          >
            {isFilter ? "Filter -" : "Filter +"}
          </Button>
        </Container>
        {isFilter && (
          <form
            onSubmit={handleFilter}
            noValidate
            className={styles.cardFilter}
          >
            <div>
              <strong>Filter</strong>{" "}
            </div>
            <TextField
              variant="outlined"
              margin="normal"
              label="Year Min"
              name="yearMin"
              style={{ width: "48%", marginRight: 20 }}
              inputRef={refyMin}
              type="number"
            />
            <TextField
              variant="outlined"
              margin="normal"
              name="yearMax"
              label="Year Max"
              style={{ width: "48%" }}
              inputRef={refyMax}
              type="number"
            />
            <TextField
              variant="outlined"
              margin="normal"
              label="Duration Min"
              name="durationMin"
              style={{ width: "48%", marginRight: 20 }}
              inputRef={refdMin}
              type="number"
            />
            <TextField
              variant="outlined"
              margin="normal"
              name="durationMax"
              label="Duration Max"
              style={{ width: "48%" }}
              inputRef={refdMax}
              type="number"
            />
            <TextField
              variant="outlined"
              margin="normal"
              name="genre"
              label="Genre"
              fullWidth
              inputRef={refGenre}
            />

            <Button type="submit" variant="contained" color="primary">
              Filter
            </Button>
          </form>
        )}
      </Container>
      <div className={styles.cardContent}>
        <DataTable title="Movie List" columns={columns} data={search} />
      </div>
    </div>
  );
}
