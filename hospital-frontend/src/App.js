import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientList from "./PatientList";
import FinancialReport from "./FinancialReport";
import Navbar from "./Navbar"; // Keeping the Navbar import for LandingPage
import LandingPage from "./Landingpage";
import BillStatement from "./BillStatement";
import NewNavbar from "./NewNavbar";

function App() {
  return (
    <Router>
      {/* Use NewNavbar for all pages except LandingPage */}
      <Routes>
        <Route path="/" element={<><NewNavbar /><PatientList /></>} />
        <Route path="/financial-report" element={<><NewNavbar /><FinancialReport /></>} />
        <Route path="/landing-page" element={<><Navbar /><LandingPage /></>} />
        <Route path="/bill-statement" element={<><NewNavbar /><BillStatement /></>} />
      </Routes>
    </Router>
  );
}

export default App;
