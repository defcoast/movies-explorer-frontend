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
import AuthProtectedRoute from "../../utils/AuthProtectedRoute";

function App() {
    const history = useHistory();

    const [isRegister, setIsRegister] = React.useState(false);

    const [loggedIn, setLoggedIn] = React.useState(Boolean(localStorage.getItem('token')));

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

    const [successfullyUpdateProfileMsg, setSuccessfullyUpdateProfileMsg] = React.useState('');

    console.log(savedMoviesList)

    /** Подключения к API. Установка прелоудера. */
    React.useEffect(() => {
        async function fetchMoviesAPI() {
            try{
                setNeedShowPreloader(true);
                const data = await getSavedMovies();
                console.log('data app', data)

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
            } else {
                setLoggedIn(false);
            }
        }
        checkLoggedUser();
    }, [loggedIn, isRegister]);


    /** Обработчик отправки формы регистрации. */
   async function handleRegisterSubmit(name, email, password, isRegister) {
        // Отправляем данные в API.
        try {
            const userData = await registerUser(name, email, password);
            if  (userData) {
                setIsRegister(isRegister);
                await handleLoginSubmit(email, password);
                history.push('/movies');

                return userData;
            }
        } catch (err) {
            console.log(err, 'Ошибка регистрации');
            setLoginErrorConnectApiMsg('Ошибка регистрации');
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
                setLoggedIn(loggedIn);
                history.push('/movies');

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
                setCurrentUser({name, email});
                if (updatedUserData) {
                    setSuccessfullyUpdateProfileMsg('Вы успешно изменили данные');
                }
            } catch (err) {
                console.log(err, 'Ошибка обновления пользовательских данных');
                setUpdateProfileErrorConnectApiMsg('Ошибка обновления пользовательских данных');
            }
        }
    }

    /** Обработчик удаления сохраненной карточки. */
    function handleRemoveSavedMovieCard(sortedMoviesList) {
        console.log('sortedMoviesList', sortedMoviesList)
        setSavedMoviesList(sortedMoviesList)
    }

    function handleOnSavedMovie(movie) {
        setSavedMoviesList([...savedMoviesList, movie]);
    }

    function handleOnChangeSearchSubmit(sortedMoviesList) {
        setSavedMoviesList(sortedMoviesList);
    }

    function handleChangeFilter(sortedMoviesList) {
        setSavedMoviesList(sortedMoviesList);
    }

    function handleCloseSession(isLoggedIn) {
        setLoggedIn(isLoggedIn);
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

                <ProtectedRoute
                    path='/movies'
                    loggedIn={loggedIn}
                    component={Movies}
                    savedMoviesList={savedMoviesList}
                    onSaved={handleOnSavedMovie}
                    onRemoveSavedMovieCard={handleRemoveSavedMovieCard}
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
                    onChangeSearchSubmit={handleOnChangeSearchSubmit}
                    onChangeFilter={handleChangeFilter}
                />

                <ProtectedRoute
                    path='/profile'
                    component={Profile}
                    loggedIn={loggedIn}
                    currentUser={currentUser}
                    onUpdateProfile={handleUpdateProfile}
                    updateProfileErrorConnectApiMsg={updateProfileErrorConnectApiMsg}
                    successfullyUpdateProfileMsg={successfullyUpdateProfileMsg}
                    onCloseSession={handleCloseSession}
                />

                <AuthProtectedRoute
                    path="/signin"
                    component={Login}
                    onLogin={handleLoginSubmit}
                    loginErrorConnectApiMsg={loginErrorConnectApiMsg}
                    loggedIn={loggedIn}

                />

                <AuthProtectedRoute
                    path="/signup"
                    component={Register}
                    onRegister={handleRegisterSubmit}
                    registerErrorConnectApiMsg={registerErrorConnectApiMsg}
                    loggedIn={loggedIn}
                />

                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
