import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Container, TextField } from "@material-ui/core";
import axios from "axios";
import { UserContext } from "../../config";

export default class FormGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      name: "",
      release: 2020,
      platform: "",
      genre: "",
      singlePlayer: 1,
      multiplayer: 2,
      image_url: "",
      redirect: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if (this.state.id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/data-game/${this.state.id}`)
        .then((res) => res.data)
        .then((e) => {
          this.setState({
            name: e.name,
            release: e.release,
            platform: e.platform,
            genre: e.genre,
            singlePlayer: e.singlePlayer,
            image_url: e.image_url,
            multiplayer: e.multiplayer,
          });
        })
        .catch((e) => console.log(e));
    }
  }
  static contextType = UserContext;

  handleSubmit = (event) => {
    event.preventDefault();
    const user = this.context;
    if (!this.state.id) {
      //tambah
      const dataBaru = {
        name: this.state.name,
        release: this.state.release,
        platform: this.state.platform,
        genre: this.state.genre,
        singlePlayer: this.state.singlePlayer,
        multiplayer: this.state.multiplayer,
        image_url: this.state.image_url,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/data-game`, dataBaru, {
          headers: { Authorization: `Bearer ${user[0].token}` },
        })
        .then(() => this.setState({ redirect: "/games/list" }))
        .catch((err) => console.log(err));
    } else {
      //edit
      let dataBaru = {
        name: this.state.name,
        release: this.state.release,
        platform: this.state.platform,
        genre: this.state.genre,
        singlePlayer: this.state.singlePlayer,
        image_url: this.state.image_url,
        multiplayer: this.state.multiplayer,
      };
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/data-game/${this.state.id}`,
          dataBaru,
          {
            headers: { Authorization: `Bearer ${user[0].token}` },
          }
        )
        .then((e) => this.setState({ redirect: "/games/list" }))
        .catch((err) => console.log(err));
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Container maxWidth="md">
        <div style={{ flexGrow: 1, margin: 20 }}>
          <form
            onSubmit={this.handleSubmit}
            style={{
              minWidth: 500,
              maxWidth: 400,
              width: "40%",
              margin: "0 auto",
              border: "1px solid #000",
            }}
          >
            <h1 style={{ textAlign: "center" }}>
              {this.state.id ? "Edit Game" : "Add Game"}
            </h1>
            <div style={{ margin: 20 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                label="Name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                style={{ width: "60%" }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                label="Release"
                name="release"
                value={this.state.release}
                style={{ width: "38%", left: 10 }}
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Genre"
                name="genre"
                value={this.state.genre}
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Platform"
                name="platform"
                value={this.state.platform}
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                label="Single Player"
                name="singlePlayer"
                type="number"
                style={{ width: "50%" }}
                value={this.state.singlePlayer}
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                label="Multi Player"
                name="multiplayer"
                type="number"
                style={{ width: "48%", left: 10 }}
                value={this.state.multiplayer}
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Image URL"
                name="image_url"
                value={this.state.image_url}
                onChange={this.handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "#00b248", color: "white" }}
              >
                {!this.state.isEdit ? "Save" : "Edit"}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    );
  }
}
