import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = false; // simulate auth

  if (!isAuthenticated) {
    return (
      <Navigate to="/blog/1" replace />
    );
  }

  return children;
}

export default ProtectedRoute;
