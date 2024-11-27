import { Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const currentUser = useStore((state) => state.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}