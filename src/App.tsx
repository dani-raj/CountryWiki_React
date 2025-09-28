import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CountryDetail from "./pages/CountryDetail/CountryDetail";
import VisitedCountries from "./pages/VisitedCountries/VisitedCountries";
import Navbar from "./components/NavBar/NavBar";
import QuizPage from "./components/Quiz/Quiz";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:countryCode" element={<CountryDetail />} />
        <Route path="/visited" element={<VisitedCountries />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </>
  );
}

export default App;
