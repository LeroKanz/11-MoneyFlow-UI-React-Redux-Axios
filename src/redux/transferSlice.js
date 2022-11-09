import { createSlice } from '@reduxjs/toolkit';

const transferSlice = createSlice({
    name: 'transfers',
    initialState: {
        transfers: [],
        status: null,
        error: null
    },
    reducers: {
        addTransfer(state, action) {
            state.transfers.push(action.payload);
        },        
        removeTransfer(state, action) {
            state.transfers = state.transfers.filter(transfer => transfer.id !== action.payload.id);
        },
        getAllTransfers(state, action) {
            state.transfers = action.payload
        },
    }
});

export const { addTransfer, removeTransfer, getAllTransfers } = transferSlice.actions;

export default transferSlice.reducer;