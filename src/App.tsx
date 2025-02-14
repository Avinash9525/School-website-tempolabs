import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import AdmissionForm from "./components/AdmissionForm";
import StudentDashboard from "./components/StudentDashboard";
import CarSimulation from "./components/CarSimulation";
import VegetableGame from "./components/VegetableGame";

function App() {
  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admission" element={<AdmissionForm />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/simulation" element={<CarSimulation />} />
          <Route path="/game" element={<VegetableGame />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
