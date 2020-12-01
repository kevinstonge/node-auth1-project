import '../styles/App.scss';
import { useState } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import UserList from "./UserList";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Router>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <section>
        {loggedIn && <Redirect to="/" />}
        <Route exact path="/">
          {loggedIn ? 
            <UserList /> :
            <p>please log in</p>
          }
        </Route>
        <Route path="/login">
          <Login setLoggedIn={setLoggedIn} />
        </Route>
      </section>
    </Router>
  );
}

export default App;
