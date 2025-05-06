import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SetupPage from "./pages/SetupPage";
import TimerPage from "./pages/TimerPage";
import SummaryPage from "./pages/SummaryPage";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      {/* Banner visible on all pages */}
      <Banner />
      
      {/* Main content area */}
      <Routes>
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/" element={<TimerPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
      
      {/* Footer visible on all pages */}
      <Footer />
    </Router>
  );
}

export default App;