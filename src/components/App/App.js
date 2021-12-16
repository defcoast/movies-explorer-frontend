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
import {getCurrentUser, getSavedMovies, loginUser, registerUser} from "../../utils/MainApi";
import {CurrentUserContext} from "../../utils/CurrentUserContext";

function App() {
    const history = useHistory();

    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [savedMoviesList, setSavedMoviesList] = useState([]);

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
                    setLoggedIn(true);

                    if (userData) {
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

    // async function updateProfile(name, email) {
    //     const jwt = localStorage.getItem('token');
    //     if (jwt) {
    //         try {
    //             const updatedUserData = await updateProfile(name, email, jwt);
    //             setCurrentUser({name, email});
    //             if (updatedUserData) {
    //                 setSuccessfullyUpdateProfileMsg('Вы успешно изменили данные');
    //             }
    //         } catch (err) {
    //             console.log(err, 'Ошибка обновления пользовательских данных');
    //             setUpdateProfileErrorConnectApiMsg('Ошибка обновления пользовательских данных');
    //         }
    //     }
    // }

  return (
    <div className="App">
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
          <Route exact path="/" >
              <Main />
          </Route>

          <Route path="/movies">
              <Movies
                  savedMoviesList={savedMoviesList}
                  setSavedMoviesList={setSavedMoviesList}
              />
          </Route>

          <Route path="/saved-movies">
              <SavedMovies
                  savedMoviesList={savedMoviesList}
                  setSavedMoviesList={setSavedMoviesList}
              />
          </Route>

          <Route path="/profile">
              <Profile

              />
          </Route>

          <Route path="/signin">
              <Login
                  onLogin={handleLogin}
              />
          </Route>

          <Route path="/signup">
              <Register
                  onRegister={handleRegister}
              />
          </Route>

          <Route path="*">
              <NotFound />
          </Route>
      </Switch>
    </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
