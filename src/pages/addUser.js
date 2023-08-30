import "./addUser.css"
import { useState, useEffect } from "react";

function AddUser(props) {

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [userName, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [street, setStreet] = useState("");
    const [website, setWebsite] = useState("");

    const [error, setError] = useState('');

    useEffect(() => {
        if (props.user) {
            let user = props.user;
            console.log(user);
            setName(user.name)
            setUsername(user.username)
            setEmail(user.email)
            setStreet(user.address.street)
            setPhoneNumber(user.phone)
            setWebsite(user.website)
        }
    }, []);

    function addUser() {

        if (name == "" || userName == "" || phoneNumber == ""
            || email == "" || street == "" || website == ""
        ) {
            setError("Please fill all fields")
        } else {
            setLoading(true)

            let model = {
                "name": name,
                "username": userName,
                "phone": phoneNumber,
                "email": email,
                "street": street,
                "website": website,
            }

            if (props.user) {
                fetch(`https://jsonplaceholder.typicode.com/users/${props.user.id}`, {
                    method: "PATCH",
                    body: JSON.stringify(model)
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setLoading(false)
                        props.setIsOpen(false)
                    })
                    .catch((error) => {
                        setError(error)
                    });
            } else {
                fetch(`https://jsonplaceholder.typicode.com/users`, {
                    method: "POST",
                    body: JSON.stringify(model)
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setLoading(false)
                        props.setIsOpen(false)
                    })
                    .catch((error) => {
                        setError(error)
                    });
            }
        }
    }

    return (
        <>
            <div className="darkBG" onClick={() => props.setIsOpen(false)} />
            <div className="centered">
                <div className="modal">
                    <div className="addUser">
                        {props.user ? (
                            <h2 >
                                Update User
                            </h2>
                        ) : (
                            <h2 >
                                Add new User
                            </h2>
                        )}

                        {error ? (
                            <div className="error" >
                                {error}
                            </div>
                        ) : (<span></span>)}
                        <label>Name :
                            <input type="text" value={name} placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label>Username :
                            <input type="text" value={userName} placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                        </label>
                        <label>PhoneNumber :
                            <input type="text" value={phoneNumber} placeholder="Enter PhoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} />
                        </label>
                        <label >Email :
                            <input type="email" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label >Street :
                            <input type="text" value={street} placeholder="Enter Street" onChange={(e) => setStreet(e.target.value)} />
                        </label>
                        <label >Website :
                            <input type="text" value={website} placeholder="Enter Website" onChange={(e) => setWebsite(e.target.value)} />
                        </label>

                        <button className="button-btn" onClick={addUser}>
                            {loading ? (<span>Processing...</span>) : (
                                props.user ? (<span>Update User</span>) : (<span>Add User</span>)
                            )}
                        </button>
                        <button
                            className="button-cancel"
                            onClick={() => {props.setIsOpen(false)}}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default AddUser;



