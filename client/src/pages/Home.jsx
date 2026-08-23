import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Home() {
    const [sheets, setSheets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSheets = async () => {
            try {
                const response = await api.get("/sheets");
                setSheets(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSheets();
    }, []);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f4f6f8",
                padding: "50px"
            }}
        >
            <div style={{ maxWidth: "900px", margin: "auto" }}>

                <h1
                    style={{
                        fontSize: "36px",
                        marginBottom: "8px"
                    }}
                >
                    🎮 DSA Quest
                </h1>

                <p
                    style={{
                        color: "#666",
                        fontSize: "18px",
                        marginBottom: "35px"
                    }}
                >
                    Choose your DSA journey
                </p>

                {sheets.map((sheet) => (
                    <div
                        key={sheet.id}
                        onClick={() => navigate(`/patterns/${sheet.id}`)}
                        style={{
                            background: "white",
                            border: "1px solid #ddd",
                            borderRadius: "12px",
                            padding: "25px",
                            marginBottom: "18px",
                            cursor: "pointer",
                            boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                            transition: "transform 0.2s, box-shadow 0.2s"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow =
                                "0 6px 18px rgba(0,0,0,0.12)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                                "0 3px 10px rgba(0,0,0,0.08)";
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <div>
                                <h2 style={{ margin: "0 0 8px 0" }}>
                                    📚 {sheet.title}
                                </h2>

                                <p
                                    style={{
                                        margin: 0,
                                        color: "#777"
                                    }}
                                >
                                    Start solving problems and master DSA.
                                </p>
                            </div>

                            <span style={{ fontSize: "28px" }}>
                                →
                            </span>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default Home;