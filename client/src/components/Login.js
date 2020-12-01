import { useState } from "react";
import axios from "axios";
export default function Login(props) {
    const [formState, setFormState] = useState({ username: "", password: "" })
    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/users/login', formState).then(r => {
            if (r.status === 200 && r.data.message === "logged in!") {
                props.setLoggedIn(true);
            }
        })
    }
    return (
        <form onSubmit={(e)=>login(e)}>
            <label htmlFor="username">username:
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formState.username}
                    onChange={(e) => setFormState({ ...formState, username: e.target.value })}
                />
            </label>
            <label htmlFor="password">password:
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formState.password}
                    onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                />
            </label>
            <button type="submit">log in</button>
        </form>
    )
}