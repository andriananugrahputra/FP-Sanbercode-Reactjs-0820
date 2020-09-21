import React, { Component } from "react";
import {
  Avatar,
  Button,
  Card,
  Grid,
  Typography,
  Container,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";

const useStyles = (theme) => ({
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
});

class CardGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }
  componentDidMount() {
    if (this.state.games.length === 0) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/games`)
        .then((res) => this.setState({ games: res.data }))
        .catch((e) => console.log(e));
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4} className={classes.grid}>
          {this.state.games.map((game) => (
            <Grid
              item
              key={game.id}
              xl={4}
              xs={12}
              sm={6}
              md={4}
              className="card-box"
            >
              <Card className={classes.cardBox}>
                <Avatar
                  variant="square"
                  src={game.image_url}
                  alt="img"
                  className={classes.cardMedia}
                />
                <div className="button-hide">
                  <Typography gutterBottom variant="h6" component="h2">
                    {game.genre}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h2">
                    {game.platform}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    style={{ background: "#00b248", marginTop: 10 }}
                  >
                    <Link
                      to={"/games/" + game.id}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Show Detail
                    </Link>
                  </Button>
                </div>
                <div className={classes.cardTitle}>
                  <div className={classes.title}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {game.name} ({game.release})
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
}

export default withStyles(useStyles)(CardGame);
