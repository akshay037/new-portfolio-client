import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Allows dashboard, message, blogsList only when admin exists in Redux
 * (hydrated from localStorage on load).
 */
export default function ProtectedRoute({ children }) {
  const admin = useSelector((state) => state.admin.admin);
  const location = useLocation();

  if (!admin) {
    return (
      <Navigate
        to="/admin-login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}
