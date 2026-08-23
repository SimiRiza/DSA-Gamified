import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function Problems() {
    const { patternId } = useParams();
    const navigate = useNavigate();

    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await api.get(`/problems/${patternId}`);
                setProblems(response.data);
            } catch (error) {
                console.error(error);
                setError("Failed to load problems.");
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, [patternId]);

    if (loading) {
        return <h2 style={{ padding: "50px" }}>Loading problems...</h2>;
    }

    if (error) {
        return <h2 style={{ padding: "50px" }}>{error}</h2>;
    }

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
                    onClick={() => navigate(-1)}
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

                <h1>🎯 Problems</h1>

                <p
                    style={{
                        color: "#666",
                        marginBottom: "30px"
                    }}
                >
                    Solve these problems to master the pattern.
                </p>

                {problems.map((problem, index) => (

                    <div
                        key={problem.id}
                        style={{
                            background: "white",
                            border: "1px solid #ddd",
                            borderRadius: "12px",
                            padding: "22px 25px",
                            marginBottom: "15px",
                            boxShadow: "0 3px 10px rgba(0,0,0,0.07)"
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

                                <div
                                    style={{
                                        color: "#888",
                                        fontSize: "14px",
                                        marginBottom: "7px"
                                    }}
                                >
                                    Problem {index + 1}
                                </div>

                                <h2
                                    style={{
                                        margin: "0 0 10px 0",
                                        fontSize: "20px"
                                    }}
                                >
                                    {problem.problem_name}
                                </h2>

                                <p
                                    style={{
                                        margin: "0 0 12px 0",
                                        color: "#777"
                                    }}
                                >
                                    {problem.subcategory_name}
                                </p>

                            </div>

                            <span
                                style={{
                                    background: "#e8f5e9",
                                    color: "#2e7d32",
                                    padding: "6px 12px",
                                    borderRadius: "20px",
                                    fontSize: "13px",
                                    fontWeight: "bold"
                                }}
                            >
                                {problem.difficulty}
                            </span>

                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                flexWrap: "wrap",
                                marginTop: "15px"
                            }}
                        >

                            {problem.official_article && (
                                <a
                                    href={problem.official_article}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    📖 Article
                                </a>
                            )}

                            {problem.official_youtube && (
                                <a
                                    href={problem.official_youtube}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    ▶️ YouTube
                                </a>
                            )}

                            {problem.official_leetcode && (
                                <a
                                    href={problem.official_leetcode}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    💻 LeetCode
                                </a>
                            )}

                        </div>

                    </div>

                ))}

            </div>
        </div>
    );
}

export default Problems;