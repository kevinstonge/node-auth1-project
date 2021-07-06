import react, { useState } from "react";
import api from "../api/api.js";
const Register = (props) => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    api.post("users/register", formState).then((r) => {
      if (r.status === 201) {
        props.setLoggedIn(true);
      }
    });
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <h2>register</h2>
      <label htmlFor="username">
        username:
        <input
          type="text"
          id="username"
          name="username"
          value={formState.username}
          onChange={(e) =>
            setFormState({ ...formState, username: e.target.value })
          }
        />
      </label>
      <label htmlFor="email">
        email:
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={(e) =>
            setFormState({ ...formState, email: e.target.value })
          }
        />
      </label>
      <label htmlFor="password">
        password:
        <input
          type="password"
          id="password"
          name="password"
          value={formState.password}
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
        />
      </label>
      <button type="submit">submit</button>
    </form>
  );
};

export default Register;
