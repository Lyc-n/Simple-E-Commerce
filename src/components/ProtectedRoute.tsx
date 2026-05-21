import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

type Props = {
    children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-on-surface">
                Loading...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/authentication" replace />;
    }

    return children;
}
