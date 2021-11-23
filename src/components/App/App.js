import './App.css';
import Main from "../main/Main/Main";
import {Route, Switch, Redirect, useHistory} from "react-router-dom";
import Movies from '../movies/Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import React from "react";
import NotFound from "../NotFound/NotFound";
import {getCurrentUser, loginUser, registerUser} from "../../utils/MainApi";
import {CurrentUserContext} from "../../utils/CurrentUserContext";



function App() {
    const history = useHistory();

    const [isRegister, setIsRegister] = React.useState(false);

    const [loggedIn, setLoggedIn] = React.useState(false);

    const [registerErrorConnectApiMsg, setRegisterErrorConnectApiMsg] = React.useState('');

    const [loginErrorConnectApiMsg, setLoginErrorConnectApiMsg] = React.useState('');

    const [currentUser, setCurrentUser] = React.useState({});

    React.useEffect(() => {
        async function checkLoggedUser() {
            if (loggedIn) {
                try {
                    const userData = await getCurrentUser;

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
                await handleLoginSubmit(email, password)
                history.push('/movies');
            }
        } catch (err) {
            console.log(err, 'Ошибка регистрации');
            setRegisterErrorConnectApiMsg('Ошибка регистрации');
        }
    }

    /** Обработчик отправки формы авторизации. */
    async function handleLoginSubmit(email, password, logedIn) {
        // Отправляем данные в API.
        try {
            const userData = await loginUser(email, password);

            if (userData.token) {
                localStorage.setItem('token', userData.token);
                setLoggedIn(logedIn);
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

  return (
    <div className="App">
        <CurrentUserContext.Provider value={currentUser}>
            <Switch>
                <Route exact path="/" >
                    <Main

                    />
                </Route>

                <Route path="/movies">
                    <Movies/>
                </Route>

                <Route path="/saved-movies">
                    <SavedMovies />
                </Route>

                <Route path="/profile">
                    <Profile />
                </Route>

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
