import React from 'react';

import { getMe, loginUser, logoutUser, registerUser } from '../services/authService';

type User = {
    id: string;
    name: string;
    username: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;

    login: (identity: string, password: string) => Promise<void>;

    register: (payload: {
        name: string;
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) => Promise<void>;

    logout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null);

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function loadUser() {
            try {
                const data = await getMe();

                setUser(data.user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    async function login(identity: string, password: string) {
        const data = await loginUser({
            identity,
            password,
        });

        setUser(data.user);
    }

    async function register(payload: {
        name: string;
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) {
        const data = await registerUser(payload);

        setUser(data.user);
    }

    async function logout() {
        await logoutUser();

        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = React.useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth harus di dalam AuthProvider');
    }

    return context;
}
