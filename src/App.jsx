import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AddJob from "./pages/AddJobs.jsx";
import JobDetails from "./pages/JobDetails.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-job" element={<AddJob />} />
      <Route path="/job/:id" element={<JobDetails />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
