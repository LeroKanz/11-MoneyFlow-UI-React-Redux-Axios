import { createSlice } from '@reduxjs/toolkit';

const operationSlice = createSlice({
    name: 'operations',
    initialState: {
        operations: [],
        status: null,
        error: null
    },
    reducers: {
        addOperation(state, action) {
            state.operations.push(action.payload);
        },        
        removeOperation(state, action) {
            state.operations = state.operations.filter(operation => operation.id !== action.payload.id);
        },
        getAllOperations(state, action) {
            state.operations = action.payload
        },
    }
});

export const { addOperation, removeOperation, getAllOperations } = operationSlice.actions;

export default operationSlice.reducer;