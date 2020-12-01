import axios from "axios";
import { useState, useEffect } from "react";
export default function UserList() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/users',{withCredentials: true}).then(r => {
            setUsers(r.data.users)
        }).catch(console.log())
    },[])
    return (
        <>
            {users.map((user, index) => <div key={`user-${index}`} className="userBox"><p>{user.username}</p><p>{user.email}</p></div>)}
        </>
    )
}