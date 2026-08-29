import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
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
                navigate("/");
            }

        } catch (error) {
            console.error(error);
            setMessage("Something went wrong.");
        }
    };

    useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

            callback: async (response) => {
                try {
                    const result = await fetch(
                        "http://localhost:5000/api/auth/google",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                credential: response.credential,
                            }),
                        }
                    );

                    const data = await result.json();
                  
                    if (result.ok) {
                    localStorage.setItem("token", data.token);
                    navigate("/");
                    }
                    
                } catch (error) {
                    console.error("Google login error:", error);
                }
            },
        });

        window.google.accounts.id.renderButton(
            document.getElementById("google-button"),
            {
                theme: "outline",
                size: "large",
                text: "continue_with",
                width: 300,
            }
        );
    };

    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    };
    }, []);


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

            <div id="google-button"></div>
            <br /><br />

            <p>{message}</p>
            <p>
            Don't have an account?{" "}
            <button onClick={() => navigate("/register")}>
                Register
            </button>
            </p>
        </div>
    );
}

export default Login;