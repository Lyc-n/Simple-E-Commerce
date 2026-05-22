import api from '../lib/api';

export type RegisterPayload = {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type LoginPayload = {
    identity: string;
    password: string;
};

export type UpdateProfilePayload = {
    fullName: string;
    phone?: string;
    address?: string;
    bio?: string;
};

export async function registerUser(payload: RegisterPayload) {
    const response = await api.post('/api/auth/register', payload);

    return response.data;
}

export async function loginUser(payload: LoginPayload) {
    const response = await api.post('/api/auth/login', payload);

    return response.data;
}

export async function getMe() {
    const response = await api.get('/api/auth/me');

    return response.data;
}

export async function logoutUser() {
    const response = await api.post('/api/auth/logout');

    return response.data;
}

export async function updateProfile(payload: UpdateProfilePayload) {
    const response = await api.put('/api/auth/profile', payload);

    return response.data;
}
