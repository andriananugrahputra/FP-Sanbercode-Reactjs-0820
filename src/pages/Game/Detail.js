import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  withStyles,
} from "@material-ui/core";
import axios from "axios";

const useStyles = (theme) => ({
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
});

class DetailGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: [],
      id: props.match.params.id,
    };
  }
  componentDidMount() {
    if (this.state.game.length === 0) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/games/${this.state.id}`)
        .then((res) => this.setState({ game: res.data }))
        .catch((e) => console.log(e));
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.cardGrid} maxWidth="sm">
        <Grid container spacing={4}>
          <Grid item key={this.state.game.id} xs={12}>
            <Card>
              <CardMedia
                children="."
                className={classes.cardMedia}
                image={this.state.game.image_url}
                title={this.state.game.title}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.state.game.name}
                </Typography>
                <Typography style={{ textAlign: "justify" }}>
                  {this.state.game.description}
                </Typography>
              </CardContent>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.cardDetail}>
                  Genre: {this.state.game.genre}
                </Typography>
                <Typography className={classes.cardDetail}>
                  Release: {this.state.game.release}
                </Typography>
                <Typography className={classes.cardDetail}>
                  Platform: {this.state.game.platform}
                </Typography>
                <Typography className={classes.cardDetail}>
                  Single Player: {this.state.game.singlePlayer}
                </Typography>
                <Typography className={classes.cardDetail}>
                  Multi Player: {this.state.game.multiplayer}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(useStyles)(DetailGame);
