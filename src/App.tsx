import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './admin/context/AuthContext';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import UpcomingEventsPage from './pages/UpcomingEventsPage';
import PastEventsPage from './pages/PastEventsPage';
import StartupCommunityPage from './pages/StartupCommunityPage';
import GiveBackProgramPage from './pages/GiveBackProgramPage';
import StartupsPage from './pages/StartupsPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import NewsletterPage from './pages/NewsletterPage';
import WhatsAppGroupPage from './pages/WhatsAppGroupPage';
import MentorPage from './pages/MentorPage';
import VolunteerPage from './pages/VolunteerPage';
import ResourcesPage from './pages/ResourcesPage';
import DynamicPage from './pages/DynamicPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminLogin from './admin/pages/AdminLogin';
import AdminLayout from './admin/components/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminEvents from './admin/pages/AdminEvents';
import AdminStartups from './admin/pages/AdminStartups';
import AdminResources from './admin/pages/AdminResources';
import AdminTeam from './admin/pages/AdminTeam';
import AdminPartners from './admin/pages/AdminPartners';
import AdminPages from './admin/pages/AdminPages';
import AdminSettings from './admin/pages/AdminSettings';
import ProtectedRoute from './admin/components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="events/upcoming" element={<UpcomingEventsPage />} />
              <Route path="events/past" element={<PastEventsPage />} />
              <Route path="startup-community" element={<StartupCommunityPage />} />
              <Route path="startup-community/give-back" element={<GiveBackProgramPage />} />
              <Route path="startup-community/startups" element={<StartupsPage />} />
              <Route path="get-involved" element={<GetInvolvedPage />} />
              <Route path="get-involved/newsletter" element={<NewsletterPage />} />
              <Route path="get-involved/whatsapp" element={<WhatsAppGroupPage />} />
              <Route path="get-involved/mentor" element={<MentorPage />} />
              <Route path="get-involved/volunteer" element={<VolunteerPage />} />
              <Route path="resources" element={<ResourcesPage />} />
              <Route path="page/:slug" element={<DynamicPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="startups" element={<AdminStartups />} />
              <Route path="resources" element={<AdminResources />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="partners" element={<AdminPartners />} />
              <Route path="pages" element={<AdminPages />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;