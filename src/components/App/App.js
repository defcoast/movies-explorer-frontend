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
import {getFilms} from "../../utils/MoviesApi";

function App() {
    /** Массив со всеми карточками фильмов. */
    const [moviesCards, setMoviesCards] = React.useState([]);

    /** Нужно-ли отображать карточки фильмов. */
    const [needShowMoviesCards, setNeedShowMoviesCards] = React.useState(false);

    /** Нужно-ли отображать прелоудер. */
    const [needShowPreloader, setNeedShowPreloader] = React.useState(false);

    /** Нужно-ли выводить сообщение об ошибке". */
    const [needShowErrorMsg, setNeedShowErrorMsg] = React.useState(false);

    /** Получение всех карточке фильмов из API. */
    React.useEffect( () => {
        async function fetchMoviesAPI() {
            if (needShowMoviesCards) {
                try {
                    setNeedShowPreloader(true);
                    const film = await getFilms();
                    setMoviesCards(film);
                    setNeedShowPreloader(false);
                } catch (err) {
                    console.log(err)
                    setNeedShowErrorMsg(true);
                }
            }
        }

        fetchMoviesAPI();

    }, [needShowMoviesCards]);

    function showCards() {
        setNeedShowPreloader(true);
        if (moviesCards) {
            setNeedShowMoviesCards(true);
            setNeedShowPreloader(false);
        }
    }

  return (
    <div className="App">
      <Switch>
          <Route exact path="/" >
              <Main />
          </Route>

          <Route path="/movies">
              <Movies
                  cards={moviesCards}
                  needShowMoviesCards={needShowMoviesCards}
                  needShowPreloader={needShowPreloader}
                  needShowErrorMsg={needShowErrorMsg}
                  onSubmit={showCards}
              />
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
