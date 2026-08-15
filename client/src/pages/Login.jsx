import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            setMessage(data.message);

            if (response.ok) {
                localStorage.setItem("token", data.token);
                console.log("JWT:", data.token);
            }

        } catch (error) {
            console.error(error);
            setMessage("Something went wrong.");
        }
    };

    const handleProfile = async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(
            "http://localhost:5000/api/profile",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.error(error);
        setMessage("Something went wrong while fetching profile.");
    }
    };

    return (
        <div>
            <h1>Login</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin}>
                Login
            </button>

            <p>{message}</p>
            <button onClick={handleProfile}>
            View My Profile
            </button>
        </div>
    );
}

export default Login;