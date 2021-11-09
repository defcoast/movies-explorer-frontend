import './App.css';
import Header from '../Header/Header'
import Main from "../main/Main/Main";
import Footer from "../Footer/Footer";
import { Route } from "react-router-dom";
import Movies from '../movies/Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";

function App() {
  return (
    <div className="App">
      <Header />
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
      <Footer />
    </div>
  );
}

export default App;
