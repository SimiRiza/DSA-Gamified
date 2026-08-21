import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function Patterns() {
    const { sheetId } = useParams();
    const navigate = useNavigate();

    const [patterns, setPatterns] = useState([]);

    useEffect(() => {
        const fetchPatterns = async () => {
            try {
                const response = await api.get(`/patterns/${sheetId}`);
                setPatterns(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPatterns();
    }, [sheetId]);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f4f6f8",
                padding: "50px"
            }}
        >
            <div style={{ maxWidth: "900px", margin: "auto" }}>

                <button
                    onClick={() => navigate("/")}
                    style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "16px",
                        marginBottom: "25px"
                    }}
                >
                    ← Back
                </button>

                <h1 style={{ marginBottom: "8px" }}>
                    🧩 Choose a Pattern
                </h1>

                <p
                    style={{
                        color: "#666",
                        marginBottom: "30px"
                    }}
                >
                    Pick a pattern and start solving.
                </p>

                {patterns.map((pattern, index) => (
                    <div
                        key={pattern.id}
                        onClick={() =>
                            navigate(`/problems/${pattern.id}`)
                        }
                        style={{
                            background: "white",
                            border: "1px solid #ddd",
                            borderRadius: "12px",
                            padding: "22px 25px",
                            marginBottom: "15px",
                            cursor: "pointer",
                            boxShadow: "0 3px 10px rgba(0,0,0,0.07)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            transition: "transform 0.2s, box-shadow 0.2s"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(-2px)";
                            e.currentTarget.style.boxShadow =
                                "0 6px 15px rgba(0,0,0,0.12)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(0)";
                            e.currentTarget.style.boxShadow =
                                "0 3px 10px rgba(0,0,0,0.07)";
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "18px"
                            }}
                        >
                            <div
                                style={{
                                    width: "42px",
                                    height: "42px",
                                    borderRadius: "10px",
                                    background: "#eef2ff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "bold"
                                }}
                            >
                                {String(index + 1).padStart(2, "0")}
                            </div>

                            <h2
                                style={{
                                    margin: 0,
                                    fontSize: "20px"
                                }}
                            >
                                {pattern.pattern_name}
                            </h2>
                        </div>

                        <span style={{ fontSize: "24px" }}>
                            →
                        </span>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default Patterns;