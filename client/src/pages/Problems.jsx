import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function Problems() {

    const { patternId } = useParams();

    const [problems, setProblems] = useState([]);

    useEffect(() => {

        const fetchProblems = async () => {

            try {

                const response = await api.get(`/problems/${patternId}`);

                setProblems(response.data);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchProblems();

    }, [patternId]);

    return (

        <div style={{ padding: "30px" }}>

            <h1>Problems</h1>

            {

                problems.map((problem) => (

                    <div

                        key={problem.id}

                        style={{
                            border: "1px solid black",
                            padding: "20px",
                            marginTop: "15px"
                        }}

                    >

                        <h2>{problem.title}</h2>

                        <p>{problem.difficulty}</p>

                    </div>

                ))

            }

        </div>

    );

}

export default Problems;