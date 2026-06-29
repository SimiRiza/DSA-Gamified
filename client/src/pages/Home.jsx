import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {

    const [sheets, setSheets] = useState([]);

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

        <div>

            <h1>Choose a DSA Sheet</h1>

            {
                sheets.map((sheet) => (

                    <div key={sheet.id}>

                        <h2>{sheet.name}</h2>

                        <p>{sheet.description}</p>

                    </div>

                ))
            }

        </div>

    );

}

export default Home;