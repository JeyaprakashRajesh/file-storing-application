import { useState } from "react";
import axios from "axios";

function Signup({ setSignIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!name || !email || !password) {
            setErrorMessage("All fields are required.");
            return;
        }

        setLoading(true);
        setErrorMessage("");

        try {
            const res = await axios.post("http://localhost:7000/signup", {
                userName: name,
                email: email,
                password: password 
            });

            if (res.status === 200) {
                setSignIn(true);
            } else {
                setErrorMessage("Unable to Signup: " + res.data.message);
            }
        } catch (err) {
            console.log("Error in Signup post method: ", err);
            setErrorMessage("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="authContainer">
            <div className="authContainer-left">
                <span className="authContainer-left-heading">SIGNUP</span>
                <span className="authContainer-left-subHeading">Signup to file storing system</span>
                <span className="authContainer-left-subHeading">
                    Already Registered:{" "}
                    <span className="authContainer-left-subHeading" onClick={() => setSignIn(true)}>
                        Login
                    </span>
                </span>
            </div>
            <div className="authContainer-right">
                <form className="authContainer-right-form" onSubmit={handleSubmit}>
                    <div className="authContainer-right-form-element">
                        <span>Name</span>
                        <input
                            type="text"
                            placeholder="username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="authContainer-right-form-element">
                        <span>Email</span>
                        <input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="authContainer-right-form-element">
                        <span>Password</span>
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <button type="submit" className="authContainer-right-form-submit" disabled={loading}>
                        {loading ? "Signing Up..." : "SIGNUP"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
