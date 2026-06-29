import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Patterns from "./pages/Patterns";
import Problems from "./pages/Problems";

function App() {

    return (

        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/patterns/:sheetId" element={<Patterns />} />

            <Route path="/problems/:patternId" element={<Problems />} />

        </Routes>

    );

}

export default App;