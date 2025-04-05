import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Async thunk for login
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:3001/api/v1/users/login", userData, {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, {rejectWithValue}) => {
    try {
        const response = await axios.post("http://localhost:3001/api/v1/users/logout", null, {
            withCredentials: true
        });
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const checkAuthStatus = createAsyncThunk("auth/checkAuthStatus", async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get("http://localhost:3001/api/v1/users/profile", {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        return rejectWithValue(error.response || "Session expired");
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoggedIn: false,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            // Handle login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle logout
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Handle checkAuthStatus
            .addCase(checkAuthStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.loading = false;
                //console.log(action.payload);
                state.user = action.payload.data.user;
                state.isLoggedIn = true;
            })
            .addCase(checkAuthStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

                    // If session expired, reset user state
                if (action.payload.status === 500) {
                    state.user = null;
                    state.isLoggedIn = false;
                }
            });
    },
});

export default authSlice.reducer;