import { Suspense, lazy } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import routes from "tempo-routes";

// Lazy load components
const Home = lazy(() => import("./components/home"));
const LoginPage = lazy(() => import("./components/auth/LoginPage"));
const SignupPage = lazy(() => import("./components/auth/SignupPage"));
const AdmissionForm = lazy(() => import("./components/AdmissionForm"));
const StudentDashboard = lazy(() => import("./components/StudentDashboard"));
const CarSimulation = lazy(() => import("./components/CarSimulation"));
const VegetableGame = lazy(() => import("./components/VegetableGame"));

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

          {/* Add this before any catchall route */}
          {import.meta.env.VITE_TEMPO && (
            <Route path="/tempobook/*" element={null} />
          )}
        </Routes>

        {/* Tempo routes */}
        {import.meta.env.VITE_TEMPO && routes && useRoutes(routes)}
      </Suspense>
    </div>
  );
}

export default App;
