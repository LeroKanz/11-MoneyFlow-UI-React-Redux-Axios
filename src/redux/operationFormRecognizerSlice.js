import { createSlice } from '@reduxjs/toolkit';

const operationFormRecognizerSlice = createSlice({
    name: 'operationsFR',
    initialState: {
        total: null,
        status: null,
        error: null
    },
    reducers: {
        addOperationTotal(state, action) {
            state.total = action.payload;
        }        
    }
});

export const { addOperationTotal  } = operationFormRecognizerSlice.actions;

export default operationFormRecognizerSlice.reducer;