import React from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ClaimDetailsPage from '../pages/ClaimDetailsPage';
import NotFoundPage from '../pages/NotFoundPage';

function ClaimRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!location.search.includes('claimId')) {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  return <Navigate to="/claims/new" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/claims/:claimId" element={<ClaimDetailsPage />} />
      <Route path="/claims" element={<ClaimRedirect />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
