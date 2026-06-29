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

        <div style={{ padding: "30px" }}>

            <h1>Choose a DSA Sheet</h1>

            {

                sheets.map((sheet) => (

                    <div
                        key={sheet.id}
                        onClick={() => navigate(`/patterns/${sheet.id}`)}
                        style={{
                            border: "1px solid black",
                            padding: "20px",
                            marginTop: "15px",
                            cursor: "pointer"
                        }}
                    >

                        <h2>{sheet.name}</h2>

                        <p>{sheet.description}</p>

                    </div>

                ))

            }

        </div>

    );

}

export default Home;