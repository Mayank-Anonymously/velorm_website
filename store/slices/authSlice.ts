import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const API_URL = 'https://api.velorm.com/api/v1/login';

interface User {
    _id: string;
    name?: string;
    email?: string;
    contact: number;
    walletBalance?: number;
    [key: string]: any;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Helper to load state from localStorage
const loadState = (): Partial<AuthState> => {
    if (typeof window === 'undefined') return {};
    try {
        const user = localStorage.getItem('velorm_user');
        const token = localStorage.getItem('velorm_token');
        if (user && token) {
            return { user: JSON.parse(user), token, isAuthenticated: true };
        }
    } catch (e) {
        console.error("Error loading auth state", e);
    }
    return {};
};

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
    ...loadState(),
};

// Async Thunks
export const sendOtp = createAsyncThunk(
    'auth/sendOtp',
    async ({ contact }: { contact: string }) => {
        const response = await fetch(`${API_URL}/otp-by-contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contact }),
        });
        const data = await response.json();
        return data;
    }
);

export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async ({ contact, otp }: { contact: string; otp: string }) => {
        const response = await fetch(`${API_URL}/authenticate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contact, otp }),
        });
        const data = await response.json();
        if (data.baseResponse?.status === 1) {
            // In this specific backend, 'details' contains the user object.
            // There's no explicit JWT token returned in this mock-like response,
            // so we'll use the user ID as a token placeholder if none exists.
            const user = data.details || data.response;
            const token = user._id;
            localStorage.setItem('velorm_user', JSON.stringify(user));
            localStorage.setItem('velorm_token', token);
            return { user, token };
        }
        throw new Error(data.baseResponse?.message || 'Invalid OTP');
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (userData: { name: string; email: string; contact: string }) => {
        const response = await fetch(`${API_URL}/add-user-details`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (data.baseResponse?.status === 1) {
            const user = data.response;
            localStorage.setItem('velorm_user', JSON.stringify(user));
            return user;
        }
        throw new Error(data.baseResponse?.message || 'Failed to update details');
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('velorm_user');
                localStorage.removeItem('velorm_token');
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyOtp.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Verification failed';
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
