import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import MainLayout from '../components/MainLayout/MainLayout';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Dashboard from '../pages/Dashboard/Dashboard';
import SkillGap from '../pages/SkillGap/SkillGap';
import ResumeAnalyzer from '../pages/ResumeAnalyzer/ResumeAnalyzer';
import CareerPath from '../pages/CareerPath/CareerPath';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
      <Route path="/skill-gap-analyzer" element={<ProtectedRoute><MainLayout><SkillGap /></MainLayout></ProtectedRoute>} />
      <Route path="/resume-analyzer" element={<ProtectedRoute><MainLayout><ResumeAnalyzer /></MainLayout></ProtectedRoute>} />
      <Route path="/career-path" element={<ProtectedRoute><MainLayout><CareerPath /></MainLayout></ProtectedRoute>} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}