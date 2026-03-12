import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const API_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:9291/api/v1/login'
    : 'https://api.velorm.com/api/v1/login';

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
export const loginDirect = createAsyncThunk(
    'auth/loginDirect',
    async ({ email, password }: { email: string; password: string }) => {
        const response = await fetch(`${API_URL}/authenticate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (data.baseResponse?.status === 1) {
            const user = data.details || data.response;
            if (!user) throw new Error('User data not found in response');
            const token = user._id;
            localStorage.setItem('velorm_user', JSON.stringify(user));
            localStorage.setItem('velorm_token', token);
            return { user, token };
        }
        throw new Error(data.baseResponse?.message || 'Login failed');
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (userData: { name: string; email: string; password?: string; contact: string }) => {
        console.log("updateProfile - Sending Data:", userData);
        const response = await fetch(`${API_URL}/add-user-details`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const responseText = await response.text();
        console.log("updateProfile - Raw Response Text:", responseText);

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error("updateProfile - Failed to parse JSON response", responseText);
            throw new Error('Registration failed: Invalid server response');
        }

        console.log("updateProfile - Parsed Data:", data);
        if (data.baseResponse?.status === 1) {
            const user = data.response;
            if (!user) {
                console.error("updateProfile - Error: User object missing in response", data);
                throw new Error('Registration failed: User details not returned');
            }
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
            .addCase(loginDirect.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginDirect.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginDirect.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Login failed';
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                if (!action.payload) return;
                state.status = 'succeeded';
                state.user = action.payload;
                state.token = action.payload?._id || null;
                state.isAuthenticated = true;
                state.error = null;
                if (typeof window !== 'undefined' && action.payload?._id) {
                    localStorage.setItem('velorm_token', action.payload._id);
                }
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
