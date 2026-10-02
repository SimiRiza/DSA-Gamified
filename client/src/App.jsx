import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Patterns from "./pages/Patterns";
import Problems from "./pages/Problems";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
function App() {
    return (
        <Routes>
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/patterns/:sheetId" element={<Patterns />} />
                <Route path="/problems/:patternId" element={<Problems />} />
            </Route>
        </Routes>
    );
}

export default App;