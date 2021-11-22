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
import {loginUser, registerUser} from "../../utils/MainApi";

function App() {
    /** Обработчик отправки формы регистрации. */
   async function handleRegisterSubmit(name, email, password) {
        // Отправляем данные в API.
        try {
            const userData = await registerUser(name, email, password);
        } catch (err) {

        }
    }

    /** Обработчик отправки формы авторизации. */
    async function handleLoginSubmit(email, password) {
        // Отправляем данные в API.
        try {
            const userData = await loginUser(email, password);

            if (userData.token) {
                localStorage.setItem('token', userData.token);
                return userData;
            } else {
                console.log('неверный пароль');
            }
        } catch (err) {
            console.log(err, 'Пользователь не найден');
        }
    }

  return (
    <div className="App">
      <Switch>
          <Route exact path="/" >
              <Main />
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
              />
          </Route>

          <Route path="/signup">
              <Register
                  onRegister={handleRegisterSubmit}
              />
          </Route>

          <Route path="*">
              <NotFound />
          </Route>
      </Switch>
    </div>
  );
}

export default App;
