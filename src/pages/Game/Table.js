import React, { Component, createRef } from "react";
import { Button, Container, TextField, withStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import axios from "axios";
import DataTable from "react-data-table-component";
import { UserContext } from "../../config";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const useStyles = () => ({
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
});

class TableGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      search: [],
      isFilter: false,
      redirect: null,
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCreateGame = this.handleCreateGame.bind(this);
    this.loadData = this.loadData.bind(this);
    this.refRelMin = createRef();
    this.refRelMax = createRef();
    this.refPlatform = createRef();
    this.refGenre = createRef();
  }

  static contextType = UserContext;

  loadData = () => {
    if (this.state.games.length === 0) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/data-game`)
        .then((res) => {
          this.setState({ games: res.data });
          this.setState({ search: res.data });
        })
        .catch((e) => console.log(e));
    }
  };
  componentDidMount() {
    this.loadData();
  }

  handleEdit = (event) => {
    this.setState({ redirect: "/games/edit/" + event.target.offsetParent.id });
  };

  handleDelete = (event) => {
    const user = this.context;
    const id = event.target.offsetParent.id;
    confirmAlert({
      title: "Are you sure to delete this game?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`${process.env.REACT_APP_API_URL}/data-game/${id}`, {
                headers: { Authorization: `Bearer ${user[0].token}` },
              })
              .then((e) => {
                if (e.data === "success") {
                  this.setState({ games: [] });
                  this.loadData();
                }
              })
              .catch((e) => console.log(e));
          },
        },
      ],
    });
  };

  handleFilter = (event) => {
    event.preventDefault();

    const emptySearch = async () => {
      return this.state.games;
    };

    const checkRelMin = async (src) => {
      if (this.refRelMin.current.value) {
        return src.filter((row) => row.release >= this.refRelMin.current.value);
      } else {
        return src;
      }
    };

    const checkRelMax = async (src) => {
      if (this.refRelMax.current.value) {
        return src.filter((row) => row.release <= this.refRelMax.current.value);
      } else {
        return src;
      }
    };

    const checkPlatform = async (src) => {
      if (this.refPlatform.current.value) {
        return src.filter((row) =>
          row.platform.match(this.refPlatform.current.value)
        );
      } else {
        return src;
      }
    };

    const chekGenre = async (src) => {
      if (this.refGenre.current.value) {
        return src.filter((row) =>
          row.genre.match(this.refGenre.current.value)
        );
      } else {
        return src;
      }
    };

    emptySearch().then((e) =>
      checkRelMin(e)
        .then((e) => checkRelMax(e))
        .then((e) => checkPlatform(e))
        .then((e) => chekGenre(e))
        .then((e) => this.setState({ search: e }))
    );
  };

  handleCreateGame = () => {
    this.setState({ redirect: "/games/create" });
  };

  columns = [
    {
      name: "Thumbnail",
      grow: 0,
      cell: (row) => (
        <img height="84px" width="56px" alt={row.name} src={row.image_url} />
      ),
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
      center: true,
    },
    {
      name: "Release",
      selector: "release",
      sortable: true,
      center: true,
    },
    {
      name: "Platform",
      selector: "platform",
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
      name: "Multi Player",
      selector: "multiplayer",
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
            onClick={(e) => this.handleEdit(e)}
            style={{ margin: 10 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            id={el.id}
            onClick={(e) => this.handleDelete(e)}
            style={{ marginBottom: 10 }}
          >
            Delete
          </Button>
        </center>
      ),
    },
  ];

  handleSearch = (e) => {
    this.setState({
      search: this.state.games.filter((row) =>
        row.name.toLowerCase().match(e.target.value.toLowerCase())
      ),
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const { classes } = this.props;
    return (
      <div>
        <Container maxWidth="md" style={{ marginBottom: 63 }}>
          <Container maxWidth="md" className={classes.cardUp}>
            <TextField
              variant="outlined"
              margin="normal"
              label="Search"
              fullWidth
              onChange={(e) => this.handleSearch(e)}
            />
            <Button
              onClick={() => this.handleCreateGame()}
              variant="contained"
              color="primary"
              style={{
                marginRight: 10,
                backgroundColor: "#00b248",
                color: "white",
              }}
            >
              Create Game
            </Button>
            <Button
              onClick={() => this.setState({ isFilter: !this.state.isFilter })}
              style={{
                marginRight: 10,
              }}
            >
              {this.state.isFilter ? "Filter -" : "Filter +"}
            </Button>
          </Container>
          {this.state.isFilter && (
            <form
              onSubmit={this.handleFilter}
              noValidate
              className={classes.cardFilter}
            >
              <div>
                <strong>Filter</strong>{" "}
              </div>
              <TextField
                variant="outlined"
                margin="normal"
                label="Release Min"
                name="releaseMin"
                style={{ width: "48%", marginRight: 20 }}
                inputRef={this.refRelMin}
                type="number"
              />
              <TextField
                variant="outlined"
                margin="normal"
                label="Release Max"
                name="releaseMax"
                style={{ width: "48%" }}
                inputRef={this.refRelMax}
                type="number"
              />
              <TextField
                variant="outlined"
                margin="normal"
                label="Platform"
                name="platform"
                style={{ width: "48%", marginRight: 20 }}
                inputRef={this.refPlatform}
              />
              <TextField
                variant="outlined"
                margin="normal"
                label="Genre"
                name="genre"
                style={{ width: "48%" }}
                inputRef={this.refGenre}
              />

              <Button type="submit" variant="contained" color="primary">
                Filter
              </Button>
            </form>
          )}
        </Container>
        <div className={classes.cardContent}>
          <DataTable
            title="Game List"
            columns={this.columns}
            data={this.state.search}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(TableGame);
