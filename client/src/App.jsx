import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Patterns from "./pages/Patterns";
import Problems from "./pages/Problems";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/patterns/:sheetId" element={<Patterns />} />
            <Route path="/problems/:patternId" element={<Problems />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default App;