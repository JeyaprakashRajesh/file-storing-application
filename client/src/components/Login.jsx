import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"


function Login({ setSignIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("http://localhost:7000/login", {
            email: email,
            password: password
        })
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.token)
                    navigate("/dashboard");
                } else {
                    window.alert("Invalid Credentials");
                }
            })
            .catch((err) => {
                console.log("error in Login post method: ", err);
            });
    };

    return (
        <div className="authContainer">
            <div className="authContainer-left">
                <span className="authContainer-left-heading">
                    LOGIN
                </span>
                <span className="authContainer-left-subHeading">
                    Login to use the File Storing System
                </span>
                <span className="authContainer-left-subHeading">
                    Not Registered:{" "}
                    <span className="authContainer-left-subHeading" onClick={() => setSignIn(false)}>
                        Signup
                    </span>
                </span>
            </div>
            <div className="authContainer-right">
                <form className="authContainer-right-form" onSubmit={handleSubmit}>
                    <div className="authContainer-right-form-element">
                        <span>Email</span>
                        <input
                            type="email"
                            placeholder="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="authContainer-right-form-element">
                        <span>Password</span>
                        <input
                            type="password"
                            placeholder="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="authContainer-right-form-submit">
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
