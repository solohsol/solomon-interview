import { useState, useEffect } from "react";
import "./users.css"
import AddUser from "./addUser";

function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [updateUser, setUpdateUser] = useState(null);


    function toUpdateUser(user) {
        setUpdateUser(user)
        setIsOpen(true)
    }

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                console.log(data);
            })
            .catch((error) => console.log(error));
    }, []);


    function deleteUser(id) {
        setLoading(true)

        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                setSuccess("User Deleted")
                setLoading(false)
            })
            .catch((error) => {
                setError(error)
            });
    }

    return (
        <div className="main">
            <div className="header">
                <h2>Sytem Users</h2>
                <button onClick={() => setIsOpen(true)} className="add-user-bt">Add User</button>
            </div>
            {error ? (
                <div className="error" >
                    {error}
                </div>
            ) : (<span></span>)}

            {success ? (
                <div className="success">
                    {success}
                </div>
            ) : (<span></span>)}

            {isOpen ? (
                <AddUser setIsOpen={setIsOpen} user={updateUser} />
            ) : (<span></span>)}


            <table id="users">
                <tr>
                    <th>Name</th>
                    <th>username</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Company Name</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>

                {
                    users.map((user, index) => {
                        return (
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.company.name}</td>
                                <td>{user.address.street}</td>
                                <td className="action">
                                    <button className="update" onClick={() => toUpdateUser(user)} >Update</button>
                                    <button className="delete" onClick={() => deleteUser(user.id)} >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )

}

export default Users;