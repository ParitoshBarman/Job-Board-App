import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';

export const applyToJob = createAsyncThunk('applications/apply', async ({ jobId, formData }) => {
    const res = await axios.post(`/apply/${jobId}`, formData);
    return res.data;
});

const applicationSlice = createSlice({
    name: 'applications',
    initialState: {
        message: '',
        loading: false,
        error: null,
    },
    reducers: {
        resetApplication: (state) => {
            state.message = '';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(applyToJob.pending, (state) => {
                state.loading = true;
                state.message = '';
                state.error = null;
            })
            .addCase(applyToJob.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(applyToJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { resetApplication } = applicationSlice.actions;
export default applicationSlice.reducer;