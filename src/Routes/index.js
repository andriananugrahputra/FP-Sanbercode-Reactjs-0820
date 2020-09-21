import React from "react";
import { Switch, Route } from "react-router-dom";
import { UnAuthRoute, AuthRoute } from "../config";
import {
  CardMovie,
  Login,
  Register,
  TableGame,
  DetailMovie,
  CardGame,
  DetailGame,
  TableMovie,
  FormMovie,
  ChangePassword,
  FormGame,
} from "../pages";

export default function Routes() {
  return (
    <div
      style={{
        overflow: "hidden",
        margin: "auto",
        padding: "5vh 0 20vh 0",
      }}
    >
      <div class="bg-image"></div>
      <Switch>
        {/* HOME */}
        <UnAuthRoute exact path="/" component={CardMovie} />
        {/* MOVIE */}
        <Route exact path="/movies" component={CardMovie} />
        <AuthRoute path="/movies/list" component={TableMovie} />
        <AuthRoute path="/movies/create" component={FormMovie} />
        <AuthRoute path="/movies/edit/:id" component={FormMovie} />
        <Route path="/movies/:id" component={DetailMovie} />
        {/* GAME */}
        <Route exact path="/games" component={CardGame} />
        <AuthRoute path="/games/list" component={TableGame} />
        <AuthRoute path="/games/create" component={FormGame} />
        <AuthRoute path="/games/edit/:id" component={FormGame} />
        <Route path="/games/:id" component={DetailGame} />
        {/* AUTH */}
        <UnAuthRoute path="/login" component={Login} />
        <UnAuthRoute path="/register" component={Register} />
        <AuthRoute path="/change-password" component={ChangePassword} />
      </Switch>
    </div>
  );
}
