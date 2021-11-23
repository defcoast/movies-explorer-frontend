import './App.css';
import Main from "../main/Main/Main";
import {Route, Switch, useHistory} from "react-router-dom";
import Movies from '../movies/Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import React from "react";
import NotFound from "../NotFound/NotFound";
import {getCurrentUser, getSavedMovies, loginUser, registerUser, updateProfile} from "../../utils/MainApi";
import {CurrentUserContext} from "../../utils/CurrentUserContext";
import ProtectedRoute from "../../utils/ProtectedRoute";



function App() {
    const history = useHistory();

    const [isRegister, setIsRegister] = React.useState(false);

    const [loggedIn, setLoggedIn] = React.useState(false);

    const [registerErrorConnectApiMsg, setRegisterErrorConnectApiMsg] = React.useState('');

    const [loginErrorConnectApiMsg, setLoginErrorConnectApiMsg] = React.useState('');

    const [updateProfileErrorConnectApiMsg, setUpdateProfileErrorConnectApiMsg] = React.useState('');

    const [currentUser, setCurrentUser] = React.useState({});

    /** Список всех сохраненных фильмов. */
    const [savedMoviesList, setSavedMoviesList] = React.useState([]);

    /** Нужно-ли отображать прелоудер. */
    const [needShowPreloader, setNeedShowPreloader] = React.useState(false);

    /** Нужно-ли отображать сообщение "Ничего не найдено". */
    const [needShowNotFoundMsg, setNeedShowNotFoundMsg] = React.useState(false);

    /** Нужно-ли отображать сообщение "Ошибка сервера". */
    const [needShowApiErrorMsg, setNeedShowApiErrorMsg] = React.useState(false);


    /** Подключения к API. Установка прелоудера. */
    React.useEffect(() => {
        async function fetchMoviesAPI() {

            try{
                setNeedShowPreloader(true);
                const data = await getSavedMovies();

                if (data.length > 0) {
                    setSavedMoviesList(data);
                }
                else  {
                    setNeedShowNotFoundMsg(true);
                }

                setNeedShowPreloader(false);
            } catch (err) {
                setNeedShowPreloader(false);
                setNeedShowApiErrorMsg(true);
            }
        }
        fetchMoviesAPI();
    },[]);

    React.useEffect(() => {
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
            }
        }
        checkLoggedUser();
    }, [loggedIn]);


    /** Обработчик отправки формы регистрации. */
   async function handleRegisterSubmit(name, email, password, isRegister) {
        // Отправляем данные в API.
        try {
            const userData = await registerUser(name, email, password);
            if  (userData) {
                setIsRegister(isRegister);
                await handleLoginSubmit(email, password);
                history.push('/movies');
            }
        } catch (err) {
            console.log(err, 'Ошибка регистрации');
            setRegisterErrorConnectApiMsg('Ошибка регистрации');
        }
    }

    /** Обработчик отправки формы авторизации. */
    async function handleLoginSubmit(email, password, loggedIn) {
        // Отправляем данные в API.
        try {
            const userData = await loginUser(email, password);

            if (userData.token) {
                const jwt = userData.token;
                localStorage.setItem('token', jwt);
                await getCurrentUser(jwt)
                history.push('/movies');
                setLoggedIn(loggedIn);
                return userData;
            } else {
                console.log('неверный пароль');
            }
        } catch (err) {
            console.log(err, 'Пользователь не найден');
            setRegisterErrorConnectApiMsg('Ошибка авторизации');

        }
    }

    /** Обработчик отправки формы авторизации. */
    async function handleUpdateProfile(name, email) {
        const jwt = localStorage.getItem('token');
        if (jwt) {
            try {
                const updatedUserData = await updateProfile(name, email, jwt);

                if (updatedUserData) {
                    setCurrentUser(updatedUserData);
                }
            } catch (err) {
                console.log(err, 'Ошибка обновления пользовательских данных');
                setUpdateProfileErrorConnectApiMsg('Ошибка обновления пользовательских данных');
            }
        }
    }

    /** Обработчик удаления сохраненной карточки. */
    function handleRemoveSavedMovieCard(sortedMoviesList) {
        setSavedMoviesList(sortedMoviesList)
    }

  return (
    <div className="App">
        <CurrentUserContext.Provider value={currentUser}>
            <Switch>

                <Route exact path="/" >
                    <Main
                        loggedIn={loggedIn}
                    />
                </Route>

                <ProtectedRoute
                    path='/movies'
                    loggedIn={loggedIn}
                    component={Movies}
                    savedMoviesList={savedMoviesList}
                />

                <ProtectedRoute
                    path='/saved-movies'
                    component={SavedMovies}
                    loggedIn={loggedIn}
                    savedMoviesList={savedMoviesList}
                    needShowPreloader={needShowPreloader}
                    needShowNotFoundMsg={needShowNotFoundMsg}
                    needShowApiErrorMsg={needShowApiErrorMsg}
                    onRemoveSavedMovieCard={handleRemoveSavedMovieCard}
                />

                <ProtectedRoute
                    path='/profile'
                    component={Profile}
                    loggedIn={loggedIn}
                    currentUser={currentUser}
                    onUpdateProfile={handleUpdateProfile}
                    updateProfileErrorConnectApiMsg={updateProfileErrorConnectApiMsg}
                />

                <Route path="/signin">
                    <Login
                        onLogin={handleLoginSubmit}
                        loginErrorConnectApiMsg={loginErrorConnectApiMsg}
                    />
                </Route>

                <Route path="/signup">
                    <Register
                        onRegister={handleRegisterSubmit}
                        registerErrorConnectApiMsg={registerErrorConnectApiMsg}
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
