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

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchPatterns();

    }, [sheetId]);

    return (

        <div style={{ padding: "30px" }}>

            <h1>Patterns</h1>

            {

                patterns.map((pattern) => (

                    <div

                        key={pattern.id}

                        onClick={() => navigate(`/problems/${pattern.id}`)}

                        style={{
                            border: "1px solid black",
                            padding: "20px",
                            marginTop: "15px",
                            cursor: "pointer"
                        }}

                    >

                        <h2>{pattern.name}</h2>

                    </div>

                ))

            }

        </div>

    );

}

export default Patterns;