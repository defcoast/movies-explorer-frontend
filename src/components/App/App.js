import './App.css';
import Main from "../main/Main/Main";
import {Route, Switch, useHistory} from "react-router-dom";
import Movies from '../movies/Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import React, {useEffect, useState} from "react";
import NotFound from "../NotFound/NotFound";
import {getCurrentUser, getSavedMovies, loginUser, registerUser, updateProfile} from "../../utils/MainApi";
import {CurrentUserContext} from "../../utils/CurrentUserContext";
import ProtectedRoute from "../../utils/ProtectedRoute";

function App() {
    const history = useHistory();

    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [savedMoviesList, setSavedMoviesList] = useState([]);

    const [successfullyUpdateProfileMsg, setSuccessfullyUpdateProfileMsg] = useState('');
    const [updateProfileErrorConnectApiMsg, setUpdateProfileErrorConnectApiMsg] = useState('');

    const [isLoaded, setIsLoaded] = useState(false);

    const MOVIES_LIST_STORAGE_KEY = 'filtered-movies-list';
    const IS_SHORT_MOVIE_STORAGE_KEY = 'is-short-movies';
    const SEARCH_TEXT__STORAGE_KEY = 'search-text';


    useEffect(() => {
        async function getSavedMoviesList() {
            try {
                const data = await getSavedMovies();
                if (data) {
                    setSavedMoviesList(data);
                }
            } catch (err) {
                console.log(err);
            }
        }

        getSavedMoviesList();
    }, []);


    useEffect(() => {
        async function checkLoggedUser() {
            const jwt = localStorage.getItem('token');

            if (jwt) {
                try {
                    const userData = await getCurrentUser(jwt);

                    if (userData) {
                        setLoggedIn(true);
                        setIsLoaded(true);
                        setCurrentUser(userData);
                    }
                } catch (err) {
                    console.log(err);
                }
            } else {
                setLoggedIn(false);
            }
        }
        checkLoggedUser();
    }, [loggedIn]);

   async function handleRegister(name, email, password) {
        try {
           const userData = await registerUser(name, email, password);

           if (userData) {
               await handleLogin(email, password);
           }
        } catch (err) {
            console.log(err);
        }
    }

    async function handleLogin(email, password) {
        try {
            const data = await loginUser(email, password);

            if (data.token) {
                const jwt = data.token;
                localStorage.setItem('token', jwt);
                setLoggedIn(true);
                history.push('/movies');
            }
        } catch (err) {

        }
    }

    async function handleUpdateProfile(name, email) {
        const jwt = localStorage.getItem('token');
        if (jwt) {
            try {
                const updatedUserData = await updateProfile(name, email, jwt);
                if (updatedUserData) {
                    console.log(updatedUserData)
                    setCurrentUser({name, email});
                    setSuccessfullyUpdateProfileMsg('Вы успешно изменили данные');
                }
            } catch (err) {
                console.log(err, 'Ошибка обновления пользовательских данных');
                setUpdateProfileErrorConnectApiMsg('Ошибка обновления пользовательских данных');
            }
        }
    }

    function logOut() {
        localStorage.removeItem(MOVIES_LIST_STORAGE_KEY);
        localStorage.removeItem(IS_SHORT_MOVIE_STORAGE_KEY);
        localStorage.removeItem(SEARCH_TEXT__STORAGE_KEY);
        localStorage.removeItem('token');
        setLoggedIn(false)
    }

  return (
    <div className="App">
    <CurrentUserContext.Provider value={currentUser ? currentUser : ''}>
      <Switch>
          <Route exact path="/" >
              <Main
                  loggedIn={loggedIn}
              />
          </Route>

          {isLoaded &&
              <ProtectedRoute
                  path="/movies"
                  component={Movies}
                  loggedIn={loggedIn}
                  savedMoviesList={savedMoviesList}
                  setSavedMoviesList={setSavedMoviesList}
                  isLoaded={isLoaded}
              />
          }


          {(savedMoviesList && isLoaded) &&
              <ProtectedRoute
                  path="/saved-movies"
                  component={SavedMovies}
                  loggedIn={loggedIn}
                  savedMoviesList={savedMoviesList}
                  setSavedMoviesList={setSavedMoviesList}
              />
          }

          {(currentUser && isLoaded) &&
              <ProtectedRoute
                  path="/profile"
                  component={Profile}
                  loggedIn={loggedIn}
                  updateProfile={handleUpdateProfile}
                  successfullyUpdateProfileMsg={successfullyUpdateProfileMsg}
                  updateProfileErrorConnectApiMsg={updateProfileErrorConnectApiMsg}
                  logOut={logOut}
              />
          }

          {(currentUser && isLoaded) &&
              <ProtectedRoute
                  path="/signin"
                  component={Login}
                  loggedIn={!loggedIn}
                  onLogin={handleLogin}
              />
          }

          {(currentUser && isLoaded) &&
              <ProtectedRoute
                  path="/signup"
                  component={Register}
                  loggedIn={!loggedIn}
                  onRegister={handleRegister}
              />
          }

          {loggedIn &&
              <Route path="*">
                  <NotFound />
              </Route>
          }

      </Switch>
    </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
