import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import SkillGap from "../pages/SkillGap/SkillGap";
import ResumeAnalyzer from "../pages/ResumeAnalyzer/ResumeAnalyzer";
import CareerPath from "../pages/CareerPath/CareerPath";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import MainLayout from "../components/MainLayout/MainLayout";

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/skill-gap"
          element={
            <ProtectedRoute>
              <MainLayout>
                <SkillGap />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume-analyzer"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ResumeAnalyzer />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/career-path"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CareerPath />
              </MainLayout>
            </ProtectedRoute>
          }
        />
    </Routes>
  );
}

export default AppRoutes;