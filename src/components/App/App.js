import './App.css';
import Main from "../main/Main/Main";
import {Route, Switch} from "react-router-dom";
import Movies from '../movies/Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import React from "react";
import NotFound from "../NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path="/" >
              <Main />
          </Route>

          <Route path="/movies">
              <Movies />
          </Route>

          <Route path="/saved-movies">
              <SavedMovies />
          </Route>

          <Route path="/profile">
              <Profile />
          </Route>

          <Route path="/signin">
              <Login />
          </Route>

          <Route path="/signup">
              <Register />
          </Route>

          <Route path="*">
              <NotFound />
          </Route>
      </Switch>
    </div>
  );
}

export default App;
