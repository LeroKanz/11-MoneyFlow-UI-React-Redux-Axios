import { createSlice } from '@reduxjs/toolkit';

const lookUpSlice = createSlice({
    name: 'lookUps',
    initialState: {
        lookUps: {},
        status: null,
        error: null
    },
    reducers: {        
        getAllLookUps(state, action) {
            state.lookUps = action.payload
        },
    }
});

export const { getAllLookUps } = lookUpSlice.actions;

export default lookUpSlice.reducer;